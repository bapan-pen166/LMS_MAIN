

import uuid
import datetime
from flask import Flask, jsonify,request
import secrets
import requests

app = Flask(__name__)
#@app.route('/', methods=['POST'])
def generate_meeting_invite(data):
    """Generates a dictionary representing a meeting invite structure.

    Returns:
        A dictionary containing meeting details.
    """
    try:
        data = request.json

        if not data:
            return jsonify({"error":"No JSON data"}),400
            
        
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        subject = data.get('subject')
        #check the output
        print(start_date)
        # start_datetime = start_date +" "+ start_time
        # start_date_1 = datetime.datetime.strptime(start_datetime, "%Y-%m-%d %I:%M %p").isoformat() + ".000Z"
        # start_date_1 = (datetime.datetime.strptime(start_datetime, "%Y-%m-%d %I:%M %p").isoformat()+"-05:00")
        # print(start_date_1)
        # end_datetime = end_date +" "+ end_time
        # end_date_1 = (datetime.datetime.strptime(end_datetime, "%Y-%m-%d %I:%M %p").isoformat()+"-05:00")
        # print(end_date_1)
        # print(start_time)
        print(end_date)
        # print(end_time)
        print(subject)

        # print(datetime.datetime.strptime(data.get('start_date'),"%d-%m-%Y"))
        # print(start_time)
        # print(end_date)
        # print(end_time)
        # print(subject)
    
            #start date & end date code receiver
        # if not start_date or not end_date :
        #     return jsonify({"error": "Both start date & end date required"}), 400
            
        # try:
        #     date_format = "%d-%m-%Y"  
        #     start_date = datetime.datetime.strptime(data.get('start_date'), date_format) 
        #     print(start_date)                 
        #     #start_date = datetime.datetime.fromisocalendar(start_date)
        #     end_date = datetime.datetime.fromisocalendar(end_date)
        #     print(end)
        # except ValueError:
        #     return jsonify({"error": "Invalid format"}),400
            
        # if end_date <= start_date:
        #     return jsonify({"error":"please select correct start date/end date must be after start date"}), 400
            
        #     #satrt time & end time code receiver

        # if not start_time or not end_time :
        #     return jsonify({"error": "Both start time & end time required"}), 400
            
        # try:
        #     start_time = datetime.datetime.fromisocalendar(start_time)
        #     end_time = datetime.datetime.fromisocalendar(end_time)
        # except ValueError:
        #     return jsonify({"error": "Invalid format"}),400
            # '''
            # if end_date <= start_date:
            #     return jsonify({"error":"please select correct start date/end date must be after start date"}), 400
            # '''
        meeting_id = str(uuid.uuid4())  # Generate a unique meeting ID
        meeting_password = secrets.randbelow(1000000)
        print(meeting_id)
        print(meeting_password)
        #start_time = start_date + datetime.timedelta()  # Schedule meeting in 15 minutes
        #end_time = start_time + datetime.timedelta()  # 30-minute meeting duration
        #subject = "Meeting Invitation"  # Replace with your desired meeting subject

        # Replace placeholders with your information (e.g., link to your video conferencing service)
        join_url = "https://your-video-conferencing-service.com/meeting/" + meeting_id
        #meeting_password = "your_meeting_password"  # Optional password

        print(join_url)
        # meeting_invite= {"meeting_id": meeting_id,"meeting_password": meeting_password,"title": subject,"start": start_date_1,"end": end_date_1,"start_time": start_time,"end_time": end_time,"meetingLink": join_url,
        #             }
        meeting_invite= {"meeting_id": meeting_id,"meeting_password": meeting_password,"title": subject,"start": start_date,"end": end_date,'start_time':start_time,"end_time":end_time,"meetingLink": join_url,
                    }

        return meeting_invite

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    


    