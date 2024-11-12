# signaling_server.py
import json
import asyncio
import uuid
from aiohttp import web
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaPlayer
pcs = {}
meetings = {}

async def index(request):
    content = open('index.html', 'r').read()
    return web.Response(content_type='text/html', text=content)
@cross_origin() 
async def create_meeting(request):
    meeting_id = str(uuid.uuid4())
    meetings[meeting_id] = set()
    meeting_link = f"http://localhost:8080/?meeting_id_lmsmeeting={meeting_id}"
    return web.Response(
        content_type='application/json',
        text=json.dumps({'meeting_id': meeting_id,
                         'meeting_link': meeting_link})
   )
@cross_origin()   
async def join_meeting(request):
    try:
        params = await request.json()
        meeting_id = params['meeting_id']
        offer = RTCSessionDescription(sdp=params['sdp'], type=params['type'])
    except KeyError:
         return web.Response(status=400, text='Missing meeting ID in request')
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
    await pc.setRemoteDescription(offer)
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    return web.Response(
        content_type='application/json',
        text=json.dumps({
            'sdp': pc.localDescription.sdp,
            'type': pc.localDescription.type
        })
   )
# async def on_shutdown(app):
#     coros = [pc.close() for pc in pcs]
#     await asyncio.gather(*coros)
#     pcs.clear()

app = web.Application()
CORS(app, resources={r"/invite":{"origins": "http://localhost:3002"}})
#app.on_shutdown.append(on_shutdown)
app.router.add_get('/', index)
app.router.add_post('/create', create_meeting)
app.router.add_post('/join', join_meeting)
web.run_app(app,host='localhost', port=8080)