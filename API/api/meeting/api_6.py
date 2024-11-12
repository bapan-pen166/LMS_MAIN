from flask import Flask, jsonify, request, Response, render_template
import requests
from flask_cors import CORS, cross_origin
from create_meeting import generate_meeting_invite
from videocall import generate_frame, start_video_feed, stop_video_feed

app = Flask(__name__)
# CORS(app,origins=['http://localhost:3000'])
CORS(app, resources={r"/invite":{"origins": "http://localhost:3000"}})

@app.route('/invite', methods=['GET','POST'])
@cross_origin()
def generate_meeting_invite1():
    if request.method == 'POST':
        data = request.json
        meeting_invite = generate_meeting_invite(data)  # Pass data from request
        return jsonify({"meeting_created": meeting_invite})
    else:
        # Handle GET requests differently (if needed)
        return jsonify({'error': 'Meeting creation requires a POST request'}), 405

# @app.route('/')
# def index():
#     return render_template('index_.html')

@app.route('/video_feed',methods=['GET'])
@cross_origin()
def video_feed():
    resp=start_video_feed()
    print("final resp",resp)
    # print('converted resp', Response(resp, mimetype='multipart/x-mixed-replace; boundary=frame'))
    # return Response(resp, mimetype='multipart/x-mixed-replace; boundary=frame')
    return resp

@app.route('/stop_video', methods=['POST'])
@cross_origin()
def stop_video():
    stop_video_feed()
    return 'Video feed stopped.'

if __name__ == '__main__':
    app.run(port=7000,debug=True)