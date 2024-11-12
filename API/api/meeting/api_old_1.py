from flask import Flask, jsonify, request
import requests
from flask_cors import CORS, cross_origin
from create_meeting import generate_meeting_invite

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



if __name__ == '__main__':
    app.run(port=8000,debug=True)