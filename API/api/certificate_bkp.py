from flask import Blueprint
from flask.json import jsonify
from pymysql import NULL
from db import *
from flask.globals import request
from flask_cors import cross_origin
from common import *
from datetime import datetime

from urllib.parse import quote_plus
from sqlalchemy import create_engine
 
import cv2 as cv
import os



engine = create_engine('mysql+pymysql://root:%s@localhost/lms' % quote_plus('password'))


cert = Blueprint('cert', __name__)


@cert.route('/generateCertificate', methods=['POST'])
@cross_origin()
def getAllUserDetails():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
        data = request.json
        email = data['studentEmail']
        
        
        batchSql = """
        SELECT batch FROM assignmentStudentMaster where email=%s
        """
        cursor.execute(batchSql, email)
        batch = cursor.fetchone()['batch']
        print("------", batch)
        if not batch:
            return jsonify({"status": 0, "success": False, "message": "Batch not found for this email"})
        
        sql = """
        SELECT am.totalMarks, am.assignmentName, am.Id, asm.marks
        FROM assignmentMaster am
        JOIN assignmentStudentMaster asm ON am.Id = asm.assignmentId
        WHERE asm.email = %s AND JSON_CONTAINS(am.batch, %s, '$')
        """
        cursor.execute(sql, (email, '{"batchName": "' + batch + '"}'))
        assignments = cursor.fetchall()
        print(assignments)
        
        sum_total_marks = 0
        sum_obtained_marks = 0

        assignment_data = []
        for assignment in assignments:
            print(assignment)
            total_marks = int(assignment['totalMarks'])  
            obtained_marks = int(assignment['marks']) if assignment['marks'] is not None else 0  
            
            sum_total_marks += total_marks
            sum_obtained_marks += obtained_marks
            
            assignment_data.append({
                "totalMarks": total_marks,
                "assignmentName": assignment['assignmentName'],
                "Id": assignment['Id'],
                "obtainedMarks": obtained_marks
            })
        
        
        assignmentResultPercentage = (sum_obtained_marks / sum_total_marks) * 100 if sum_total_marks > 0 else 0
        testResult = getStudentTestResult(email, batch)
        testResultAvgPercentage = testResult['averageTestMarks']
        attendanceAvg = getStudentAttendanceAverage(email, batch)
        resumeCheck = checkResumeUploaded(email)

        batchEndDateSql = """
        SELECT batchTentiveEndingDate FROM batchMaster where batchName=%s
        """
        cursor.execute(batchEndDateSql, batch)
        batchTentiveEndingDate = cursor.fetchone()['batchTentiveEndingDate']
        batchTentiveEndingDate = datetime.strptime(batchTentiveEndingDate, '%Y-%m-%d %H:%M:%S')


        current_date = datetime.now()
        print(batchTentiveEndingDate)
        print(current_date)
        if current_date >= batchTentiveEndingDate:
            
            if (assignmentResultPercentage >= 1 and testResultAvgPercentage >= 1 and attendanceAvg >= 1 and resumeCheck == True): 
                path = certificateGeneration(email, batchTentiveEndingDate)
                resp = jsonify({
                    "status": 1,
                    "success": True,
                    "sumTotalMarks": sum_total_marks,
                    "sumObtainedMarks": sum_obtained_marks,
                    "assignmentResultPercentage": round(assignmentResultPercentage, 2),  
                    "testResultAvgPercentage" : round(testResultAvgPercentage, 2),
                    "message": "Certificate successfully generated",
                    "path"  : path,
                    "assignment_data" : assignment_data,
                    'testResult' : testResult,
                    "attendanceAvg" : attendanceAvg,
                    "resumeCheck" : resumeCheck
                })
            else:
        
                resp = jsonify({
                    "status": 0,
                    "success": False,
                    "assignmentResultPercentage": round(assignmentResultPercentage, 2),
                    "testResultAvgPercentage" : round(testResultAvgPercentage, 2), 
                    "attendanceAvg" : attendanceAvg,
                    "resumeCheck" : resumeCheck, 
                    "message": "User, Unable to clear the exam!"
                })
        else:
            resp = jsonify({
                    "status": 0,
                    "success": False,
                    "assignmentResultPercentage": round(assignmentResultPercentage, 2),  
                    "testResultAvgPercentage" : round(testResultAvgPercentage, 2),
                    "attendanceAvg" : attendanceAvg,
                    "resumeCheck" : resumeCheck,
                    "message": "Course is still going on"
                })

        
    except Exception as e:
        print(e)
        conn.rollback()
        print('expect')
        resp = jsonify({"status": 0, "success": False, "message": "Failed to get user list"})
        
    finally:
        cursor.close()
        conn.close()
        return resp



def getStudentTestResult(studentEmail, batch):
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        TestListSql = """
            SELECT * FROM tests 
            WHERE JSON_CONTAINS(batchName, JSON_OBJECT('batchName', %s), '$')
        """
        cursor.execute(TestListSql, (batch,))
        testList = cursor.fetchall()

        studentMarksMap = {}

        for test in testList:
            marksSql = """
                SELECT marksObtained FROM studentTestAnswers 
                WHERE testId=%s AND email=%s
            """
            cursor.execute(marksSql, (test['id'], studentEmail))
            marks = cursor.fetchone()

            if marks:
                studentMarksMap[test['id']] = marks['marksObtained']
            else:
                studentMarksMap[test['id']] = 0

        total_test_obtained_marks = 0
        total_test_possible_marks = 0

        for test in testList:

            total_test_obtained_marks += int(studentMarksMap.get(test['id'], 0))
            total_test_possible_marks += int(test.get('totalMarks', 0)) if test.get('totalMarks') else 0

        if total_test_possible_marks > 0:
            average_marks_percentage = round((total_test_obtained_marks / total_test_possible_marks) * 100, 2)
        else:
            average_marks_percentage = 0

        final_result = {
            'studentEmail': studentEmail,
            'batch': batch,
            'averageTestMarks': average_marks_percentage,
            'total_test_possible_marks' : total_test_possible_marks,
            'total_test_obtained_marks' : total_test_obtained_marks
        }

        return final_result

    finally:
        cursor.close()
        conn.close()
        
def getStudentAttendanceAverage(studentEmail, batch):
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
        meetingIdSql = """
            SELECT meetingId
            FROM meetings
            WHERE REPLACE(REPLACE(batch, '[', ''), ']', '') LIKE %s
        """
        
        batchLike = '%"{}"%'.format(batch)
        
        cursor.execute(meetingIdSql, (batchLike))
        meetingIds = cursor.fetchall()
        if not meetingIds:
            return jsonify({'error': 'No meetings found for the given mentor and batch'}), 404

        meetings = [meet['meetingId'] for meet in meetingIds if meet['meetingId'] is not None]

        attendanceData = {'present': 0, 'absent': 0}

        for meetingId in meetings:
            attendanceSql = """
                SELECT StudentName
                FROM attendanceFeedback
                WHERE meetingId = %s
            """
            cursor.execute(attendanceSql, (meetingId,))
            presentStudentsData = cursor.fetchall()

            presentStudents = []
            for res in presentStudentsData:
                studentName = res['StudentName']
                name_parts = studentName.split('_')

                if len(name_parts) > 1:
                    userId = name_parts[-1]

                    userSql = """
                        SELECT email
                        FROM user
                        WHERE id = %s
                    """
                    cursor.execute(userSql, (userId,))
                    user_result = cursor.fetchone()

                    if user_result and user_result['email']:
                        presentStudents.append(user_result['email'])

            if studentEmail in presentStudents:
                attendanceData['present'] += 1
            else:
                attendanceData['absent'] += 1

        attendanceAverage = {
            'email': studentEmail,
            'attendancePercentage': (attendanceData['present'] / (attendanceData['present'] + attendanceData['absent'])) * 100 if (attendanceData['present'] + attendanceData['absent']) > 0 else 0
        }
        return attendanceAverage['attendancePercentage']

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()
        
def checkResumeUploaded(studentEmail):
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

    
        resumeCheckSql = """
            SELECT resumePath, firstName
            FROM studentRegistrationDetails
            WHERE email = %s;
        """
        cursor.execute(resumeCheckSql, (studentEmail,))
        resumeData = cursor.fetchone()

        if resumeData and resumeData['resumePath']:
            resumeUploaded = True
        else:
            resumeUploaded = False

        result = {
            'email': studentEmail,
            'firstName': resumeData['firstName'],
            'resumeUploaded': resumeUploaded
        }

        return result['resumeUploaded']

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()
        
        
def certificateGeneration(email, batchTentiveEndingDate):
    
    conn = connect_mysql()
    cursor = conn.cursor()
    
    
    template_path = 'cert.png'

    font_name_size = 3
    font_course_size = 2
    font_date_size = 2
    font_color = (0, 0, 0)  

    name_y_adjustment = 50
    name_x_adjustment = 30
    course_y_adjustment = 110
    course_x_adjustment = 200
    date_y_adjustment = 90
    date_x_adjustment = -300

    
    batchSql = """
        SELECT id, FirstName, LastName, mx_Course FROM converted_student_data where EmailAddress=%s
        """
    cursor.execute(batchSql, email)
    students = cursor.fetchone()

    if not os.path.exists(CERTIFICATE_PATH):
        os.makedirs(CERTIFICATE_PATH)

    
    studentId = students["id"]
    firstName = students["FirstName"]
    print(firstName)
    lastName = students["LastName"]
    print(lastName)

    courseName = students["mx_Course"]
    print(courseName)
    
    completionDate = f"{batchTentiveEndingDate}"
    completionDate = completionDate.split(' ')[0]

    print(completionDate)


    certi_name = f"{firstName} {lastName}"

    img = cv.imread(template_path)

    font = cv.FONT_HERSHEY_SCRIPT_SIMPLEX
    fontDate = cv.FONT_HERSHEY_COMPLEX_SMALL
    name_size = cv.getTextSize(certi_name, font, font_name_size, 10)[0]
    course_size = cv.getTextSize(courseName, font, font_course_size, 10)[0]
    date_size = cv.getTextSize(completionDate, font, font_date_size, 10)[0]

    name_x = int((img.shape[1] - name_size[0]) / 2 + name_x_adjustment)
    name_y = int((img.shape[0] + name_size[1]) / 2 - name_y_adjustment)
    
    course_x = int((img.shape[1] - course_size[0]) / 2 + course_x_adjustment)
    course_y = int(name_y + course_y_adjustment)
    
    date_x = int((img.shape[1] - date_size[0]) / 2 + date_x_adjustment)
    date_y = int(course_y + date_y_adjustment)

    cv.putText(img, certi_name, (name_x, name_y), font, font_name_size, font_color, 5)
    cv.putText(img, courseName, (course_x, course_y), font, font_course_size, font_color, 4)
    cv.putText(img, completionDate, (date_x, date_y), fontDate, font_date_size, font_color, 3)

    certi_path = f"{CERTIFICATE_PATH}/certi_{studentId}_{firstName}.png"

    cv.imwrite(certi_path, img)
    
    path = f"/static/certificate/certi_{studentId}_{firstName}.png"
    
    return path