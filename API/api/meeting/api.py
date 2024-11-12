from flask import Flask, jsonify, request, Response
import requests
from flask_cors import CORS, cross_origin
from create_meeting import generate_meeting_invite
# from video_audio import toggle_microphone,toggle_video,generate_frames

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

# @app.route('/video', methods=['POST'])
# @cross_origin()
# def toggle_video_route1():
#     if request.content_type != 'application/json':
#         return jsonify({"error": "Unsupported Media Type"}), 415
#     data = request.get_json()
#     if not data or 'state' not in data:
#         return jsonify({"error": "State parameter missing"}), 400
#     state = data['state']
#     success, message = toggle_video(state)
#     return jsonify({"success": success, "message": message}), 200

# API route to start/stop microphone stream
# @app.route('/microphone', methods=['GET','POST'])
# @cross_origin()
# def toggle_microphone_route1():
#     if request.content_type != 'application/json':
#         return jsonify({"error": "Unsupported Media Type"}), 415
#     data = request.get_json()
#     if not data or 'state' not in data:
#         return jsonify({"error": "State parameter missing"}), 400
#     state = data['state']
#     success, message = toggle_microphone(state)
#     return jsonify({"success": success, "message": message}), 200

# Route to serve video feed (optional if needed directly)
@app.route('/video_feed')
@cross_origin()
def video_feed1():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=8000,debug=True)