import uuid
from flask import jsonify, request
import secrets
from datetime import datetime
from db import connect_mysql
from ..send_mail_outlook import send_email
import time 
import json
 

conn = connect_mysql()
cursor = conn.cursor()
 


def generate_meeting_invite(data):
    """Generates a dictionary representing a meeting invite structure.

    Returns:
        A dictionary containing meeting details.
    """
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No JSON data"}), 400

        start_date = data.get('start_date')
        end_date = data.get('end_date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        subject = data.get('subject')
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

        # start date & end date code receiver
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
        meeting_password = secrets.randbelow(10000)
        print(meeting_id)
        print(meeting_password)
        # start_time = start_date + datetime.timedelta()  # Schedule meeting in 15 minutes
        # end_time = start_time + datetime.timedelta()  # 30-minute meeting duration
        # subject = "Meeting Invitation"  # Replace with your desired meeting subject

        # Replace placeholders with your information (e.g., link to your video conferencing service)
        join_url = f"http://localhost:3002/video-call/join?room_id={meeting_id}&password={meeting_password}"
        # meeting_password = "your_meeting_password"  # Optional password

        # Adding meeting ID, meeting Password, start-end date, start-end time, title, User ID and Username in the
        # Database

        print(join_url)
        # meeting_invite= {"meeting_id": meeting_id,"meeting_password": meeting_password,"title": subject,"start": start_date_1,"end": end_date_1,"start_time": start_time,"end_time": end_time,"meetingLink": join_url,
        #             }
        meeting_invite = {"meeting_id": meeting_id, "meeting_password": meeting_password, "title": subject,
                          "start": start_date, "end": end_date, 'start_time': start_time, "end_time": end_time,
                          "meetingLink": join_url,
                          }

        return meeting_invite

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# def create_meeting_link_and_email(start_date, end_date, start_time, end_time, subject, batchList, mentorList):
#     meeting_id = str(uuid.uuid4())

#     join_url = f"https://103.172.92.252:3010/join/{meeting_id}"

#     input_format = "%Y-%m-%d %H:%M:%S"

#     start_time_24hr = datetime.strptime(start_time, "%I:%M %p").strftime("%H:%M:%S")
#     end_time_24hr = datetime.strptime(end_time, "%I:%M %p").strftime("%H:%M:%S")

#     start_date_time = f"{start_date} {start_time_24hr}"
#     end_date_time = f"{end_date} {end_time_24hr}"

#     # start_date_time = f'{start_date} {start_time}'
#     start_date_time = datetime.strptime(start_date_time, input_format)
#     # end_date_time = f'{end_date} {end_time}'
#     end_date_time = datetime.strptime(end_date_time, input_format)

#     stmt = ("INSERT INTO meetings (`meetingID`, `meetingLink`, `startDateTime`, `endDateTime`,"
#             " `topic`) VALUES (%s, %s, %s, %s, %s)")

#     data = meeting_id, join_url, f'{start_date_time.strftime("%Y-%m-%d %H:%M:%S")}', f'{end_date_time.strftime("%Y-%m-%d %H:%M:%S")}', subject
#     cursor.execute(stmt, data)

#     for batch in batchList:
#         # query = """
#         # SELECT bm.mentorName, srd.firstName, srd.lastName, srd.email 
#         # FROM batchMaster bm 
#         # JOIN studentRegistrationDetails srd 
#         # ON bm.batchName = srd.batch 
#         # WHERE bm.batchName = %s;
#         # """
#         query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE batch = %s"""
#         cursor.execute(query, (batch))

#         results = cursor.fetchall()

#         for row in results:
#             body = f"""
#             Hello {row['firstName'] + ' ' + row['lastName']},
#             This email is in concern to inform you that Mentor/s: row['mentorName'] have scheduled a meeting for {subject} on {start_date} at {start_time}.
#             You are requested to join the class on time.
            
#             The link to join the class -> {f"https://103.172.92.252:3010/join?room={meeting_id}&name={row['firstName'] + '%20' + row['lastName']}"}
            
#             Thank You
            
#             Pentation Analytics!
#             """
#             send_email(f'Class scheduled for {subject}', body,
#                        to_email= row['EmailAddress'])
#             time.sleep(5)

#     # return jsonify({
#     #     "start_date": start_date,
#     #     "end_date": end_date,
#     #     "start_time": start_time,
#     #     "end_time": end_time,
#     #     "subject": subject,
#     #     "batchList": batchList,
#     #     "mentorList": mentorList,
#     #     "meetingLink": join_url,
#     #     "meetingId": meeting_id
#     # })
#     return jsonify({
#     "start": start_date,
#     "end": end_date,
#     "start_time": start_time,
#     "end_time": end_time,
#     "title": subject,
#     "meeting_link": join_url,
#     "meeting_id": meeting_id
# })

# def create_meeting_link_and_email(start_date, end_date, start_time, end_time, subject, batchList, mentorList):
#     meeting_id = str(uuid.uuid4())

#     join_url = f"https://103.172.92.252:3010/join/{meeting_id}"

#     stmt = ("INSERT INTO meetings (`meetingID`, `meetingLink`, `startDate`, `endDate`,"
#             " `topic`, `startTime`, `endTime`) VALUES (%s, %s, %s, %s, %s, %s, %s)")

#     data = meeting_id, join_url, f'{start_date}', f'{end_date}', subject, start_time, end_time
#     cursor.execute(stmt, data)

#     for batch in batchList:
#         # query = """
#         # SELECT bm.mentorName, srd.firstName, srd.lastName, srd.email
#         # FROM batchmaster bm
#         # JOIN studentregistrationdetails srd
#         # ON bm.batchName = srd.batch
#         # WHERE bm.batchName = %s;
#         # """

#         query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE batch = %s"""
#         cursor.execute(query, (batch))

#         results = cursor.fetchall()

#         for row in results:
#             body = f"""
#             Hello {row['firstName'] + ' ' + row['lastName']},
#             This email is in concern to inform you that Mentor/s:  have scheduled a meeting for {subject} on {start_date} at {start_time}.
#             You are requested to join the class on time.
            
#             The link to join the class -> {f"https://103.172.92.252:3010/join?room={meeting_id}&name={row['firstName'] + '%20' + row['lastName']}"}
            
#             Thank You
            
#             Pentation Analytics!
#             """
#             send_email(f'Class scheduled for {subject}', body, to_email=row['EmailAddress'])
#             time.sleep(5)

#     return jsonify({
#         "start": start_date,
#         "end": end_date,
#         "start_time": start_time,
#         "end_time": end_time,
#         "title": subject,
#         "meeting_link": join_url,
#         "meeting_id": meeting_id
#     })

# def create_meeting_link_and_email(start_date, end_date, start_time, end_time, subject, batchList, mentorList,studentList,individualEmailList):
#     meeting_id = str(uuid.uuid4())[:5]+'-'+''.join(batchList)
#     meeting_id_batch = ''.join(batchList)
#     meeting_id_batch.replace(' ', '%20')

#     join_url = f"https://103.172.92.252:3010/join/{meeting_id}-{meeting_id_batch}"

#     stmt = "INSERT INTO meetings (meetingID, meetingLink, startDate, endDate, topic, startTime, endTime, batch, studentList, individualEmailList) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
#     data = (meeting_id, join_url, f'{start_date}', f'{end_date}', subject, start_time, end_time, json.dumps(batchList), json.dumps(studentList), json.dumps(individualEmailList))
#     cursor.execute(stmt, (data))
    
#     email_ids = [item.get("emailId") for item in mentorList]
#     names = [item.get("name") for item in mentorList]

#     for index, mentor in enumerate(email_ids):
               
#                 body = '''
#                         <style>
#                         body {
#                                     font-famil': Arial, sans-serif;
#                                     color: #333;
#                                     line-height: 1.6;
#                                     margin: 20px;
#                                 }
#                                 .container {
#                                     max-width: 600px;
#                                     margin: auto;
#                                     padding: 20px;
#                                     border: 1px solid #ddd;
#                                     border-radius: 8px;
#                                 }
#                                 .header {
#                                     margin-bottom: 20px;
#                                 }
#                                 .header h1 {
#                                     margin: 0;
#                                     font-size: 1.2em;
#                                     color: #007BFF;
#                                 }
#                                 .content p {
#                                     margin: 0 0 10px;
#                                 }
#                                 .footer {
#                                     margin-top: 20px;
#                                     font-size: 0.9em;
#                                     color: #555;
#                                 }
#                                 .footer p {
#                                     margin: 0;
#                                 }
#                                 .footer .contact {
#                                     margin-top: 10px;
#                                 }
#                                 #join-button {
#                                     background: dodgerblue;
#                                     border-radius: 5px;
#                                     margin-left: 5px;
#                                     padding: 0 5px;
#                                     color: white;
#                                     cursor: pointer;
#                                     text-decoration: none;
#                                 }
#                         </style>
#                         ''' + f'''
#                         <div class="container">
#                                 <div class="header">
#                                     <h1>Meeting Invitation</h1>
#                                 </div>
#                                 <div class="content">
#                                     <p>Dear <strong>{names[index] or ''}</strong>,</p>
#                                     <p>Please find below the meeting link for {start_time} on {start_date}.</p>
#                                     <p><strong>Agenda:</strong> {subject}</p>
#                                     <p><strong>Batch:</strong> {''.join(batchList)}</p>
#                                     <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={names[index] or ''}">Join Here</a></p>
#                                     <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
#                                 </div>
#                                 <div class="footer">
#                                     <p>Thanks and Regards,</p>
#                                     <br>
#                                     <p>Pentation Analytics</p>
#                                 </div>
#                             </div>
#                             '''
#                 send_email(f'Class scheduled for {subject}', body, to_email=mentor)
#                 time.sleep(1)



#     if batchList:
#         for batch in batchList:
          
#             query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE batch = %s"""
#             cursor.execute(query, (batch))

            

#             results = cursor.fetchall()

#             for row in results:

#                 body = '''
#         <style>
#         body {
#                     font-famil': Arial, sans-serif;
#                     color: #333;
#                     line-height: 1.6;
#                     margin: 20px;
#                 }
#                 .container {
#                     max-width: 600px;
#                     margin: auto;
#                     padding: 20px;
#                     border: 1px solid #ddd;
#                     border-radius: 8px;
#                 }
#                 .header {
#                     margin-bottom: 20px;
#                 }
#                 .header h1 {
#                     margin: 0;
#                     font-size: 1.2em;
#                     color: #007BFF;
#                 }
#                 .content p {
#                     margin: 0 0 10px;
#                 }
#                 .footer {
#                     margin-top: 20px;
#                     font-size: 0.9em;
#                     color: #555;
#                 }
#                 .footer p {
#                     margin: 0;
#                 }
#                 .footer .contact {
#                     margin-top: 10px;
#                 }
#                 #join-button {
#                     background: dodgerblue;
#                     border-radius: 5px;
#                     margin-left: 5px;
#                     padding: 0 5px;
#                     color: white;
#                     cursor: pointer;
#                     text-decoration: none;
#                 }
#         </style>
#         ''' + f'''
#         <div class="container">
#                 <div class="header">
#                     <h1>Meeting Invitation</h1>
#                 </div>
#                 <div class="content">
#                     <p>Dear <strong>{row['firstName'] or '' + ' ' + row['lastName'] or ''}</strong>,</p>
#                     <p>Please find below the meeting link for {start_time} on {start_date}.</p>
#                     <p><strong>Agenda:</strong> {subject}</p>
#                     <p><strong>Mentors:</strong> {'/'.join(names)}</p>
#                     <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row['firstName'] or '' + '%20' + row['lastName'] or ''}">Join Here</a></p>
#                     <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
#                 </div>
#                 <div class="footer">
#                     <p>Thanks and Regards,</p>
#                     <br>
#                     <p>Pentation Analytics</p>
#                 </div>
#             </div>
#             '''
                
            
#                 send_email(f'Class scheduled for {subject}', body, to_email=row['EmailAddress'])
#                 time.sleep(1)

#         resp =  jsonify({
#             "start": start_date,
#             "end": end_date,
#             "start_time": start_time,
#             "end_time": end_time,
#             "title": subject,
#             "meeting_link": join_url,
#             "meeting_id": meeting_id
#         })

    
#     if studentList:
#         for student in studentList:
            
#             query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE EmailAddress = %s"""
#             cursor.execute(query, (student['emailID']))

#             email_ids = [item.get("emailId") for item in mentorList]
#             names = [item.get("name") for item in mentorList]

#             results = cursor.fetchall()
#             print(results)
#             for row in results:

#                 body = '''
#     <style>
#     body {
#                 font-famil': Arial, sans-serif;
#                 color: #333;
#                 line-height: 1.6;
#                 margin: 20px;
#             }
#             .container {
#                 max-width: 600px;
#                 margin: auto;
#                 padding: 20px;
#                 border: 1px solid #ddd;
#                 border-radius: 8px;
#             }
#             .header {
#                 margin-bottom: 20px;
#             }
#             .header h1 {
#                 margin: 0;
#                 font-size: 1.2em;
#                 color: #007BFF;
#             }
#             .content p {
#                 margin: 0 0 10px;
#             }
#             .footer {
#                 margin-top: 20px;
#                 font-size: 0.9em;
#                 color: #555;
#             }
#             .footer p {
#                 margin: 0;
#             }
#             .footer .contact {
#                 margin-top: 10px;
#             }
#             #join-button {
#                 background: dodgerblue;
#                 border-radius: 5px;
#                 margin-left: 5px;
#                 padding: 0 5px;
#                 color: white;
#                 cursor: pointer;
#                 text-decoration: none;
#             }
#     </style>
#     ''' + f'''
#     <div class="container">
#             <div class="header">
#                 <h1>Meeting Invitation</h1>
#             </div>
#             <div class="content">
#                 <p>Dear <strong>{row['firstName'] or '' + ' ' + row['lastName'] or ''}</strong>,</p>
#                 <p>Please find below the meeting link for {start_time} on {start_date}.</p>
#                 <p><strong>Agenda:</strong> {subject}</p>
#                 <p><strong>Mentors:</strong> {'/'.join(names)}</p>
#                 <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row['firstName'] or '' + '%20' + row['lastName'] or ''}">Join Here</a></p>
#                 <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
#             </div>
#             <div class="footer">
#                 <p>Thanks and Regards,</p>
#                 <br>
#                 <p>Pentation Analytics</p>
#             </div>
#         </div>
#         '''
#                 send_email(f'Class scheduled for {subject}', body, to_email=row['EmailAddress'])
#                 time.sleep(1)

            

   
        
#         resp = jsonify({
#             "start": start_date,
#             "end": end_date,
#             "start_time": start_time,
#             "end_time": end_time,
#             "title": subject,
#             "meeting_link": join_url,
#             "meeting_id": meeting_id
#         })

#     if individualEmailList:
#         email_ids = [item.get("emailId") for item in mentorList]
#         names = [item.get("name") for item in mentorList]
   
#         for row in individualEmailList:

#             body = '''
#     <style>
#     body {
#                 font-famil': Arial, sans-serif;
#                 color: #333;
#                 line-height: 1.6;
#                 margin: 20px;
#             }
#             .container {
#                 max-width: 600px;
#                 margin: auto;
#                 padding: 20px;
#                 border: 1px solid #ddd;
#                 border-radius: 8px;
#             }
#             .header {
#                 margin-bottom: 20px;
#             }
#             .header h1 {
#                 margin: 0;
#                 font-size: 1.2em;
#                 color: #007BFF;
#             }
#             .content p {
#                 margin: 0 0 10px;
#             }
#             .footer {
#                 margin-top: 20px;
#                 font-size: 0.9em;
#                 color: #555;
#             }
#             .footer p {
#                 margin: 0;
#             }
#             .footer .contact {
#                 margin-top: 10px;
#             }
#             #join-button {
#                 background: dodgerblue;
#                 border-radius: 5px;
#                 margin-left: 5px;
#                 padding: 0 5px;
#                 color: white;
#                 cursor: pointer;
#                 text-decoration: none;
#             }
#     </style>
#     ''' + f'''
#     <div class="container">
#             <div class="header">
#                 <h1>Meeting Invitation</h1>
#             </div>
#             <div class="content">
#                 <p>Dear <strong>User</strong>,</p>
#                 <p>Please find below the meeting link for {start_time} on {start_date}.</p>
#                 <p><strong>Agenda:</strong> {subject}</p>
#                 <p><strong>Mentors:</strong> {'/'.join(names)}</p>
#                 <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row.split('@')[0] or ''}">Join Here</a></p>
#                 <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
#             </div>
#             <div class="footer">
#                 <p>Thanks and Regards,</p>
#                 <br>
#                 <p>Pentation Analytics</p>
#             </div>
#         </div>
#         '''
#             send_email(f'Class scheduled for {subject}', body, to_email=row)
#             time.sleep(1)

       
#         return jsonify({
#             "start": start_date,
#             "end": end_date,
#             "start_time": start_time,
#             "end_time": end_time,
#             "title": subject,
#             "meeting_link": join_url,
#             "meeting_id": meeting_id
#         })


#     return resp


def create_meeting_link_and_email(start_date, end_date, start_time, end_time, subject, batchList, mentorList,studentList,individualEmailList,first_start_date, last_end_date, flag, courseId):
    meeting_id = str(uuid.uuid4())[:5]+'-'+''.join(batchList)
    meeting_id_batch = ''.join(batchList)
    meeting_id_batch.replace(' ', '%20')
    
    join_url = f"https://13.200.24.255/:3010/join/{meeting_id}-{meeting_id_batch}"
 
    email_ids = [item.get("emailId") for item in mentorList]
 
    stmt = "INSERT INTO meetings (meetingID, meetingLink, startDate, endDate, topic, startTime, endTime, batch, studentList, individualEmailList, mentorList, courseId) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,  %s)"
    data = (meeting_id, join_url, f'{start_date}', f'{end_date}', subject, start_time, end_time, json.dumps(batchList), json.dumps(studentList), json.dumps(individualEmailList), json.dumps(email_ids), courseId)
    cursor.execute(stmt, data)
    
    print("----------------->",email_ids)
    names = [item.get("name") for item in mentorList]
    print(flag)
    print("first_start_date", first_start_date)
    print("last_end_date", last_end_date)
    
    if flag == 1:
        print("In FLAGGGGGGGGGGGGgg")
        for index, mentor in enumerate(email_ids):
                
            body = '''
                    <style>
                    body {
                                font-famil': Arial, sans-serif;
                                color: #333;
                                line-height: 1.6;
                                margin: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                            }
                            .header {
                                margin-bottom: 20px;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 1.2em;
                                color: #007BFF;
                            }
                            .content p {
                                margin: 0 0 10px;
                            }
                            .footer {
                                margin-top: 20px;
                                font-size: 0.9em;
                                color: #555;
                            }
                            .footer p {
                                margin: 0;
                            }
                            .footer .contact {
                                margin-top: 10px;
                            }
                            #join-button {
                                background: dodgerblue;
                                border-radius: 5px;
                                margin-left: 5px;
                                padding: 0 5px;
                                color: white;
                                cursor: pointer;
                                text-decoration: none;
                            }
                    </style>
                    ''' + f'''
                    <div class="container">
                            <div class="header">
                                <h1>Meeting Invitation</h1>
                            </div>
                            <div class="content">
                                <p>Dear <strong>{names[index] or ''}</strong>,</p>
                                <p>Please find below the meeting link for {start_time} to {end_time} from {first_start_date} to {last_end_date}.</p>
                                <p><strong>Agenda:</strong> {subject}</p>
                                <p><strong>Batch:</strong> {''.join(batchList)}</p>
                                <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={names[index] or ''}">Join Here</a></p>
                                <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
                            </div>
                            <div class="footer">
                                <p>Thanks and Regards,</p>
                                <br>
                                <p>Pentation Analytics</p>
                            </div>
                        </div>
                        '''
            send_email(f'Class scheduled for {subject}', body, to_email=mentor)
            time.sleep(1)



        if batchList:
            for batch in batchList:
            
                query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE batch = %s"""
                cursor.execute(query, (batch))

                

                results = cursor.fetchall()

                for row in results:

                    body = '''
            <style>
            body {
                        font-famil': Arial, sans-serif;
                        color: #333;
                        line-height: 1.6;
                        margin: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .header {
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 1.2em;
                        color: #007BFF;
                    }
                    .content p {
                        margin: 0 0 10px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 0.9em;
                        color: #555;
                    }
                    .footer p {
                        margin: 0;
                    }
                    .footer .contact {
                        margin-top: 10px;
                    }
                    #join-button {
                        background: dodgerblue;
                        border-radius: 5px;
                        margin-left: 5px;
                        padding: 0 5px;
                        color: white;
                        cursor: pointer;
                        text-decoration: none;
                    }
            </style>
            ''' + f'''
            <div class="container">
                    <div class="header">
                        <h1>Meeting Invitation</h1>
                    </div>
                    <div class="content">
                        <p>Dear <strong>{row['firstName'] or '' + ' ' + row['lastName'] or ''}</strong>,</p>
                        <p>Please find below the meeting link for {start_time} to {end_time} from {first_start_date} to {last_end_date}.</p>
                        <p><strong>Agenda:</strong> {subject}</p>
                        <p><strong>Mentors:</strong> {'/'.join(names)}</p>
                        <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row['firstName'] or '' + '%20' + row['lastName'] or ''}">Join Here</a></p>
                        <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
                    </div>
                    <div class="footer">
                        <p>Thanks and Regards,</p>
                        <br>
                        <p>Pentation Analytics</p>
                    </div>
                </div>
                '''
                    
                
                    send_email(f'Class scheduled for {subject}', body, to_email=row['EmailAddress'])
                    time.sleep(1)
    
        
            resp =  jsonify({
                "start": start_date,
                "end": end_date,
                "start_time": start_time,
                "end_time": end_time,
                "title": subject,
                "meeting_link": join_url,
                "meeting_id": meeting_id,
                "message"  : "All meeting created successfully"
            })

    
        if studentList:
            for student in studentList:
                
                query = """SELECT firstName, lastName, EmailAddress FROM converted_student_data WHERE EmailAddress = %s"""
                cursor.execute(query, (student['emailID']))

                email_ids = [item.get("emailId") for item in mentorList]
                names = [item.get("name") for item in mentorList]

                results = cursor.fetchall()
                print(results)
                for row in results:

                    body = '''
        <style>
        body {
                    font-famil': Arial, sans-serif;
                    color: #333;
                    line-height: 1.6;
                    margin: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 1.2em;
                    color: #007BFF;
                }
                .content p {
                    margin: 0 0 10px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #555;
                }
                .footer p {
                    margin: 0;
                }
                .footer .contact {
                    margin-top: 10px;
                }
                #join-button {
                    background: dodgerblue;
                    border-radius: 5px;
                    margin-left: 5px;
                    padding: 0 5px;
                    color: white;
                    cursor: pointer;
                    text-decoration: none;
                }
        </style>
        ''' + f'''
        <div class="container">
                <div class="header">
                    <h1>Meeting Invitation</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>{row['firstName'] or '' + ' ' + row['lastName'] or ''}</strong>,</p>
                    <p>Please find below the meeting link for {start_time} to {end_time} from {first_start_date} to {last_end_date}.</p>
                    <p><strong>Agenda:</strong> {subject}</p>
                    <p><strong>Mentors:</strong> {'/'.join(names)}</p>
                    <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row['firstName'] or '' + '%20' + row['lastName'] or ''}">Join Here</a></p>
                    <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
                </div>
                <div class="footer">
                    <p>Thanks and Regards,</p>
                    <br>
                    <p>Pentation Analytics</p>
                </div>
            </div>
            '''
                    send_email(f'Class scheduled for {subject}', body, to_email=row['EmailAddress'])
                    time.sleep(1)

                

    
            
            resp = jsonify({
                "start": start_date,
                "end": end_date,
                "start_time": start_time,
                "end_time": end_time,
                "title": subject,
                "meeting_link": join_url,
                "meeting_id": meeting_id
            })

        if individualEmailList:
            email_ids = [item.get("emailId") for item in mentorList]
            names = [item.get("name") for item in mentorList]
    
            for row in individualEmailList:

                body = '''
        <style>
        body {
                    font-famil': Arial, sans-serif;
                    color: #333;
                    line-height: 1.6;
                    margin: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 1.2em;
                    color: #007BFF;
                }
                .content p {
                    margin: 0 0 10px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #555;
                }
                .footer p {
                    margin: 0;
                }
                .footer .contact {
                    margin-top: 10px;
                }
                #join-button {
                    background: dodgerblue;
                    border-radius: 5px;
                    margin-left: 5px;
                    padding: 0 5px;
                    color: white;
                    cursor: pointer;
                    text-decoration: none;
                }
        </style>
        ''' + f'''
        <div class="container">
                <div class="header">
                    <h1>Meeting Invitation</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>User</strong>,</p>
                    <p>Please find below the meeting link for {start_time} to {end_time} from {first_start_date} to {last_end_date}.</p>
                    <p><strong>Agenda:</strong> {subject}</p>
                    <p><strong>Mentors:</strong> {'/'.join(names)}</p>
                    <p><strong>Meeting Link:</strong><a id="join-button" href="{join_url}?username={row.split('@')[0] or ''}">Join Here</a></p>
                    <p>Please let us know if you have any questions or if any further clarifications are needed.</p>
                </div>
                <div class="footer">
                    <p>Thanks and Regards,</p>
                    <br>
                    <p>Pentation Analytics</p>
                </div>
            </div>
            '''
                send_email(f'Class scheduled for {subject}', body, to_email=row)
                time.sleep(1)

        
            return jsonify({
                "start": start_date,
                "end": end_date,
                "start_time": start_time,
                "end_time": end_time,
                "title": subject,
                "meeting_link": join_url,
                "meeting_id": meeting_id
            })
            
        return resp       
    else:
        print("Not the last iteration")




def get_meeting_link():
    try:
        cursor.execute("SELECT * FROM meetings")
        meetings = cursor.fetchall()
    
        return jsonify(meetings)
    except Exception as e:
        return jsonify({"error": str(e)})
    



def get_meeting_for_stud(email):
    try:
        cursor.execute("SELECT batch FROM converted_student_data WHERE EmailAddress = %s", (email))
        batch = cursor.fetchone()

        cursor.execute("SELECT * FROM meetings")
        meetings = cursor.fetchall()

        # meeting = [meet if batch['batch'] in meet['batch'] else continue for meet in meetings]
        meeting = []

        for meet in meetings:
            if batch['batch'] in meet['batch']:
                meeting.append(meet)

        return jsonify({"data": meeting or None})

    except Exception as e:
        return jsonify({"error": str(e)})


def getMeetingForMentor(email):
    try:
        
        cursor.execute("SELECT * FROM meetings WHERE mentorList LIKE %s", (f"%{email}%",))
        meetings = cursor.fetchall()


        return jsonify(meetings)

    except Exception as e:
        return jsonify({"error": str(e)})
 

def getMeetingBatchListMentor(email,startDate):
    try:
       
        cursor.execute("SELECT id, batch FROM meetings WHERE mentorList LIKE %s AND startDate=%s", (f"%{email}%", startDate) )

        meetings = cursor.fetchall()
 
        for meeting in meetings:
            if isinstance(meeting['batch'], str):
                try:
                    
                    batch_list = json.loads(meeting['batch'])
                    
                    meeting['batch'] = ', '.join(batch_list)
                except json.JSONDecodeError:
                    
                    pass
 
        return jsonify(meetings)
    
    except Exception as e:
        return jsonify({"error": str(e)})
 



# def rescheduleMeetingForMentor(id,startDate,startTime,endTime):
#     try:
#         print('executed')
#         print(id,startDate,startTime,endTime)
#         sql = """
#         UPDATE meetings
#         SET startDate = %s, endDate = %s, startTime=%s, endTime=%s
#         WHERE id = %s
#         """
#         cursor.execute(sql,(startDate, startDate, startTime,endTime, id))
 
 
#         return jsonify({"message" : f"Meeting : {id} Resheduled!"})
 
#     except Exception as e:
#         return jsonify({"error": str(e)})


def rescheduleMeetingForMentor(id,startDate,startTime,endTime):
    try:
        
        print("--->",id)
        meetingSql = "SELECT * FROM meetings WHERE id=%s"
        cursor.execute(meetingSql, (id,))
        meetings = cursor.fetchone()
        print("meetings------>", meetings)

        previousDate = meetings['startDate']
        topic = meetings['topic']
        
        sql = """
        UPDATE meetings
        SET startDate = %s, endDate = %s, startTime=%s, endTime=%s
        WHERE id = %s
        """
        cursor.execute(sql,(startDate, startDate, startTime,endTime, id))
        
    #meetings [{'id': 102, 'meetingID': 'eda2c-demo1', 'meetingLink': 'https://103.172.92.252:3010/join/eda2c-demo1-demo1', 'startDate': '2024-09-26', 'endDate': '2024-09-26', 'topic': 'meeting Afpha', 'startTime': '11:00 PM', 'endTime': '11:30 PM', 'batch': '["demo1"]', 'studentList': '[]', 'individualEmailList': '[]', 'mentorList': '["rishu.raj@pentationanalytics.com"]'}]


        
        body = '''
        <style>
        body {
                    font-famil': Arial, sans-serif;
                    color: #333;
                    line-height: 1.6;
                    margin: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 1.2em;
                    color: #007BFF;
                }
                .content p {
                    margin: 0 0 10px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #555;
                }
                .footer p {
                    margin: 0;
                }
                .footer .contact {
                    margin-top: 10px;
                }
                #join-button {
                    background: dodgerblue;
                    border-radius: 5px;
                    margin-left: 5px;
                    padding: 0 5px;
                    color: white;
                    cursor: pointer;
                    text-decoration: none;
                }
        </style>
        ''' + f'''
        <div class="container">
                <div class="header">
                    <h1>Class Rescheduled!</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>Admin</strong>,</p>
                    <p>The class has been rescheduled by <strong>mentor</strong> :XYZ </p>
                    <p>Please find below the rescheduled meeting details. </p>
                    <p>Previous class date : {previousDate} </p>
                    <p>Rescheduled class date {startDate} , Time - {startTime} to {endTime}.</p>
                    <p><strong>Agenda:</strong> {topic}</p>
                    
                    
                </div>
                <div class="footer">
                    <p>Thanks and Regards,</p>
                    <br>
                    <p>Pentation Analytics</p>
                </div>
            </div>
            '''
        send_email(f'Class re-scheduled for {startDate}', body, to_email='rishu.raj@pentationanalytics.com')
        time.sleep(1)
 
        return jsonify({"message" : f"Meeting : {id} Resheduled!"})
 
    except Exception as e:
        return jsonify({"error": str(e)})
 
