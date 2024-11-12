from flask import Flask, jsonify
from meeting_id import id, passcode
from flask_cors import CORS, cross_origin
#from function_call import id,passcode,schedulemeeting

app = Flask(__name__)

@app.route('/meetingid',methods=['GET'])
@cross_origin()
def create_meeting():
    return jsonify({'meetingId': id, 'passcode': passcode})
'''
@app.route('/schedule', methods=['POST'])
def schedule_meeting():
    return jsonify({"message": "Meeting scheduled!", "meeting_id": id})
'''
if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)
    # app.run(host="0.0.0.0", port=5000, debug=True)