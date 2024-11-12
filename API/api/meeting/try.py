import json
from aiohttp import web
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaPlayer
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, Response, render_template

app = Flask(__name__)
#app = web.Application()
CORS(app, resources={r"/invite":{"origins": "http://localhost:3002"}})
pcs = {}
meetings = {}

@app.route('/join', methods=['POST'])
@cross_origin()
async def join_meeting(request):
    try:
        params = await request.json()
        meeting_id = params['meeting_id']
        offer = RTCSessionDescription(sdp=params['sdp'], type=params['type'])
    except KeyError:
        return web.Response(status=400, text='Missing meeting ID or SDP in request')

    if meeting_id not in meetings:
        return web.Response(status=404, text='Meeting not found')

    pc = RTCPeerConnection()
    pcs[pc] = meeting_id
    meetings[meeting_id].add(pc)

    @pc.on('iceconnectionstatechange')
    async def on_iceconnectionstatechange():
        if pc.iceConnectionState == 'failed':
            await pc.close()
            meetings[meeting_id].discard(pc)
            pcs.pop(pc, None)

    @pc.on('track')
    def on_track(track):
        for other_pc in meetings[meeting_id]:
            if other_pc != pc:
                other_pc.addTrack(track)

    # Set remote description (offer)
    await pc.setRemoteDescription(offer)

    # Create answer
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    # Return answer SDP to client
    return web.Response(
        content_type='application/json',
        text=json.dumps({
            'sdp': pc.localDescription.sdp,
            'type': pc.localDescription.type
        })
    )

# Setup aiohttp application


# Route for joining a meeting
#app.router.add_post('/join', join_meeting)

if __name__ == '__main__':
    app.run(debug=True,port='9000')
