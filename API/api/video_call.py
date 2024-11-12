from flask import render_template, request, session, Blueprint, jsonify
from .meeting import video_call as VC
import datetime
import os

import pytz
from flask_cors import cross_origin
from db import connect_mysql
conn = connect_mysql()
cursor = conn.cursor()


video_call = Blueprint('video_call', __name__)


@video_call.route('/')
def home():
    return 'This is the home page for the video call.'


@video_call.route('/join')
def join():
    display_name = request.args.get('display_name')
    mute_audio = request.args.get('mute_audio')  # 1 or 0
    mute_video = request.args.get('mute_video')  # 1 or 0
    room_id = request.args.get('room_id')
    session[room_id] = {"name": display_name,
                        "mute_audio": mute_audio, "mute_video": mute_video}
    return render_template('join.html', room_id=room_id, display_name=session[room_id]["name"],
                           mute_audio=session[room_id]["mute_audio"], mute_video=session[room_id]["mute_video"])


# @video_call.route('/create-meeting', methods=['POST'])
# def create_meeting():
#     if request.method == 'POST':
#         response = VC.generate_meeting_invite({
#             'start_date': request.form.get('start_date'),
#             'end_date': request.form.get('end_date'),
#             'start_time': request.form.get('start_time'),
#             'end_time': request.form.get('end_time'),
#             'subject': request.form.get('subject')
#         })

#         return response
#     else:
#         return {'Error': 'Something went wrong!'}

# def create_meeting():
#     if request.method == 'POST':
#         mentorList=request.json.get('mentorList')
#          # Check if mentorList is blank or None
#         if mentorList is None or (isinstance(mentorList, list) and not mentorList):
#             return jsonify({'status': 0, 'success': False, 'message': 'mentorList cannot be empty'}), 400

#         response = VC.create_meeting_link_and_email(
#             start_date=request.json.get('start_date'),
#             end_date=request.json.get('end_date'),
#             start_time=request.json.get('start_time'),
#             end_time=request.json.get('end_time'),
#             subject=request.json.get('subject'),
#             batchList=request.json.get('batchList'),
#             mentorList=request.json.get('mentorList'),
#             studentList = request.json.get('studentList'),
#             individualEmailList = request.json.get('individualEmailList')
#         )

#         return response
#     else:
#         return {'Error': 'Something went wrong!'}

# @video_call.route('/create-meeting', methods=['POST'])
# def create_meeting():
#     if request.method == 'POST':
#         print("Hello")
#         meetings = request.json.get('meetings')
#         batchList = request.json.get('batchList')
#         mentorList = request.json.get('mentorList')
#         studentList = request.json.get('studentList')
#         individualEmailList = request.json.get('individualEmailList')
#         if not meetings or not isinstance(meetings, list) or not meetings:
#             return jsonify({'status': 0, 'success': False, 'message': 'meetings cannot be empty'}), 400
        
#         if not mentorList or not isinstance(mentorList, list) or not mentorList:
#             return jsonify({'status': 0, 'success': False, 'message': 'mentorList cannot be empty'}), 400
        
        
#         first_start_date = meetings[0].get('startDate')
#         last_end_date = meetings[-1].get('endDate')
        
#         for i, meeting in enumerate(meetings):
#             title = meeting.get('title')
#             start_date = meeting.get('startDate')
#             end_date = meeting.get('endDate')
#             start_time = meeting.get('startTime')
#             end_time = meeting.get('endTime')
            
#             if not title or not start_date or not end_date:
#                 return jsonify({'status': 0, 'success': False, 'message': 'Each meeting must have a title, start date, and end date'}), 400
            
#             is_last_iteration = (i == len(meetings) - 1)
#             flag_value = 1 if is_last_iteration else 0
            
#             response = VC.create_meeting_link_and_email(
#                 start_date=start_date,
#                 end_date=end_date,
#                 start_time= start_time,
#                 end_time= end_time,
#                 subject=title,
#                 batchList=batchList,
#                 mentorList=mentorList,
#                 studentList=studentList,
#                 individualEmailList=individualEmailList,
#                 first_start_date = first_start_date,
#                 last_end_date = last_end_date,
#                 flag= flag_value
#             )

#         return response

#     else:
#         return jsonify({'Error': 'Something went wrong!'}), 405
        
@video_call.route('/create-meeting', methods=['POST'])
def create_meeting():
    if request.method == 'POST':
        print("Hello")
        meetings = request.json.get('meetings')
        batchList = request.json.get('batchList')
        mentorList = request.json.get('mentorList')
        studentList = request.json.get('studentList')
        individualEmailList = request.json.get('individualEmailList')
        if not meetings or not isinstance(meetings, list) or not meetings:
            return jsonify({'status': 0, 'success': False, 'message': 'meetings cannot be empty'}), 400
        
        if not mentorList or not isinstance(mentorList, list) or not mentorList:
            return jsonify({'status': 0, 'success': False, 'message': 'mentorList cannot be empty'}), 400
          
        
        first_start_date = meetings[0].get('startDate')
        last_end_date = meetings[-1].get('endDate')
        
        for i, meeting in enumerate(meetings):
            title = meeting.get('title')
            start_date = meeting.get('startDate')
            end_date = meeting.get('endDate')
            start_time = meeting.get('startTime')
            end_time = meeting.get('endTime')
            
            if not title or not start_date or not end_date:
                return jsonify({'status': 0, 'success': False, 'message': 'Each meeting must have a title, start date, and end date'}), 400
            
            is_last_iteration = (i == len(meetings) - 1)
            flag_value = 1 if is_last_iteration else 0
            
            
            
            for batch in batchList:
                stmt = "SELECT courseType FROM batchMaster WHERE batchName = %s"  
                cursor.execute(stmt, (batch,))
                courseType = cursor.fetchone()['courseType']
                
                courseId_query = "SELECT code FROM courseMaster WHERE courseName = %s"  
                cursor.execute(courseId_query, (courseType,))
                courseId_result = cursor.fetchone()
                
                if not courseId_result:
                    return jsonify({'status': 0, 'success': False, 'message': f'courseId not found for batch: {batch}'}), 400
                
                courseId = courseId_result['code']
            
            
            response = VC.create_meeting_link_and_email(
                start_date=start_date,
                end_date=end_date,
                start_time= start_time,
                end_time= end_time,
                subject=title,
                batchList=batchList,
                mentorList=mentorList,
                studentList=studentList,
                individualEmailList=individualEmailList,
                first_start_date = first_start_date,
                last_end_date = last_end_date,
                flag= flag_value,
                courseId = courseId
            )

        return response

    else:
        return jsonify({'Error': 'Something went wrong!'}), 405



# Get meetings for students
@video_call.route('/get_meetings', methods=['GET'])
def get_meetings():
    response = VC.get_meeting_link()
    return response

@video_call.route('/get_meetings_for_stud', methods=['POST'])
def get_meetings_for_stud():
    if request.method == 'POST':
        email = request.json.get('email')
        response = VC.get_meeting_for_stud(email)
        return response
    else:
        return {'Error': 'Something went wrong!'}

@video_call.route('/getMeetingForMentor', methods=['POST'])
def getMeetingForMentor():
    if request.method == 'POST':
        email = request.json.get('mentorEmail')
        response = VC.getMeetingForMentor(email)
        return response
    else:
        return {'Error': 'Something went wrong!'}

@video_call.route('/saveRecording', methods=['POST'])
@cross_origin()
def save_recording():
    try:
        utc_time = datetime.datetime.now(datetime.timezone.utc)
        ist = pytz.timezone('Asia/Kolkata')
        ist_time = utc_time.astimezone(ist)
        formatted_time = ist_time.strftime('%d-%m-%Y %H:%M')

        file = request.files['video']
        room_name = request.form.get('room_name')
        if file:
            filename = f'{room_name} {formatted_time}.mp4'
            file.save(os.path.join('all_recordings', filename))
            return jsonify({'message': 'File uploaded successfully!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'status': 0})


@video_call.route('/getMeetingBatchListMentor', methods=['POST'])
def getMeetingBatchListMentor():
    if request.method == 'POST':
        
        email = request.json.get('mentorEmail')
        startDate = request.json.get('startDate')
        print(email)
        print(startDate)
        response = VC.getMeetingBatchListMentor(email,startDate)
        return response
    else:
        return {'Error': 'Something went wrong!'}


@video_call.route('/rescheduleMeetingForMentor', methods=['POST'])
def rescheduleMeetingForMentor():
    if request.method == 'POST':
        id = request.json.get('id')
        startDate = request.json.get('startDate')
        startTime = request.json.get('startTime')
        endTime = request.json.get('endTime')
 
        response = VC.rescheduleMeetingForMentor(id,startDate,startTime,endTime)
        return response
    else:
        return {'Error': 'Something went wrong!'}


@video_call.route('/getMeetingDateListMentor', methods=['POST'])
def getMeetingDateListMentor():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
        email = request.json.get('mentorEmail')
        query = """
        SELECT * FROM (
            SELECT *, ROW_NUMBER() OVER (PARTITION BY startDate ORDER BY id) AS row_num
            FROM meetings
            WHERE mentorList LIKE %s
        ) AS meetings_with_row_num
        WHERE row_num = 1
        """
        
        cursor.execute(query, (f"%{email}%"))
        meetings = cursor.fetchall()


        return jsonify(meetings)

    except Exception as e:
        return jsonify({"error": str(e)})



# delete meeting
@video_call.route('/deleteMeeting', methods=['POST'])

def deleteMeeting():

    try:

        data = request.get_json()
        meetingId = data.get('meetingId')
        userId = data.get('id')

        if meetingId is None or userId is None:

            return jsonify({"error": "meetingId and id are required"}), 400

        cursor.execute("DELETE FROM meetings WHERE meetingId = %s AND id = %s", (meetingId, userId))

        return jsonify({"status":1, "succuss" : True, "message": "Meeting deleted successfully"}), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500