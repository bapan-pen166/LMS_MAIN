from flask import Blueprint
from flask.json import jsonify
from pymysql import NULL
from db import *
from flask.globals import request
from flask_cors import CORS, cross_origin
import json
from common import *
import numpy as np
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from .send_mail_outlook import send_email
import datetime

engine = create_engine('mysql+pymysql://root:%s@localhost/lms' % quote_plus('password'))


placementDrive = Blueprint('placementDrive', __name__)



# @placementDrive.route('/getAppliedStudentList', methods=['POST'])
# @cross_origin()
# def getAppliedStudentList():
#     conn = connect_mysql()
#     cursor = conn.cursor()
#     try:
#         data = request.json  
#         email = data['email']  
#         getCompanyId = """SELECT id FROM placement WHERE companyEmail=%s"""
#         cursor.execute(getCompanyId, (email)) 
        
#         data = cursor.fetchone()['id']
#         print(data)
        
#         getStudentList = """SELECT * FROM placementStudentMaster WHERE companyId=%s"""
#         cursor.execute(getStudentList, (data))
        
#         getStudentList = cursor.fetchall()
#         return jsonify({"status": 1, "success": True, "data": getStudentList})
        

#     except Exception as e:
#         print(e)
#         return jsonify({"status": 0})

# @placementDrive.route('/getAppliedStudentList', methods=['POST'])
# @cross_origin()
# def getAppliedStudentList():
#     conn = connect_mysql()
#     cursor = conn.cursor()
#     try:
#         data = request.json  
#         email = data['email']  
#         getCompanyId = """SELECT id FROM placement WHERE companyEmail=%s"""
#         cursor.execute(getCompanyId, (email)) 
        
#         data = cursor.fetchone()['id']
        
#         getStudentList = """SELECT * FROM placementStudentMaster WHERE companyId=%s"""
#         cursor.execute(getStudentList, (data))
        
#         studentList = cursor.fetchall()
        
#         for student in studentList:
#             studentEmail = student['email']
            
#             getGraduationDetails = """SELECT universityGrad, passOutYearGrad, graduationInstituteGpaorCgpa 
#                                       FROM studentRegistrationDetails WHERE email=%s"""
#             cursor.execute(getGraduationDetails, (studentEmail,))
#             gradDetails = cursor.fetchone()

#             if gradDetails:
#                 student['universityGrad'] = gradDetails['universityGrad']
#                 student['passOutYearGrad'] = gradDetails['passOutYearGrad']                
#                 student['graduationInstituteGpaorCgpa'] = gradDetails['graduationInstituteGpaorCgpa']
#             else:
#                 student['universityGrad'] = None
#                 student['passOutYearGrad'] = None
#                 student['graduationInstituteGpaorCgpa'] = None
        
#         return jsonify({"status": 1, "success": True, "data": studentList})
        

#     except Exception as e:
#         print(e)
#         return jsonify({"status": 0})

@placementDrive.route('/getAppliedStudentList', methods=['POST'])
@cross_origin()
def getAppliedStudentList():
    conn = connect_mysql()
    cursor = conn.cursor()
    try:
        data = request.json  
        email = data['email']  
        getCompanyId = """SELECT id FROM placement WHERE companyEmail=%s"""
        cursor.execute(getCompanyId, (email)) 
        
        data = cursor.fetchone()['id']
        
        getStudentList = """SELECT * FROM placementStudentMaster WHERE companyId=%s"""
        cursor.execute(getStudentList, (data))
        
        studentList = cursor.fetchall()
        
        for student in studentList:
            studentEmail = student['email']
            
            getGraduationDetails = """SELECT universityGrad, passOutYearGrad, graduationInstituteGpaorCgpa 
                                      FROM studentRegistrationDetails WHERE email=%s"""
            cursor.execute(getGraduationDetails, (studentEmail,))
            gradDetails = cursor.fetchone()
            student['testAvgScore'] = getStudTestAvg(studentEmail)
            student['assignmentAvgScore']= getStudAssignmentAvg(studentEmail)
            
            if gradDetails:
                student['universityGrad'] = gradDetails['universityGrad']
                student['passOutYearGrad'] = gradDetails['passOutYearGrad']                
                student['graduationInstituteGpaorCgpa'] = gradDetails['graduationInstituteGpaorCgpa']
                
            else:
                student['universityGrad'] = None
                student['passOutYearGrad'] = None
                student['graduationInstituteGpaorCgpa'] = None
        
        return jsonify({"status": 1, "success": True, "data": studentList})
        

    except Exception as e:
        print(e)
        return jsonify({"status": 0})

def getStudTestAvg(email):
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        # Get the student's batch
        studentListInBatchSql = """
            SELECT id as studentId, batch, EmailAddress FROM converted_student_data WHERE EmailAddress=%s
        """
        cursor.execute(studentListInBatchSql, (email,))
        studentListInBatch = cursor.fetchall()

        if not studentListInBatch:
            return {"status": 0, "message": "Student not found"}

        studentBatch = studentListInBatch[0]['batch']

        # Get the list of tests assigned to the batch
        testListSql = """
            SELECT * FROM tests 
            WHERE JSON_CONTAINS(batchName, JSON_OBJECT('batchName', %s), '$')
        """
        cursor.execute(testListSql, (studentBatch,))
        testList = cursor.fetchall()

        # Prepare a map of student emails for this batch
        studentEmails = [student['EmailAddress'] for student in studentListInBatch]
        studentMarksMap = {}

        # Fetch student marks for all tests they participated in
        if testList and studentEmails:
            marksSql = """
                SELECT testId, email, marksObtained 
                FROM studentTestAnswers 
                WHERE testId IN (%s) AND email IN (%s)
            """ % (
                ",".join([str(test['id']) for test in testList]),
                ",".join(["%s"] * len(studentEmails))
            )
            cursor.execute(marksSql, studentEmails)
            marksList = cursor.fetchall()

            # Create a mapping of (testId, email) -> marksObtained
            for marks in marksList:
                testId = marks['testId']
                email = marks['email']
                studentMarksMap[(testId, email)] = marks['marksObtained']

        studentMarksData = []

        # Calculate marks for each student
        for student in studentListInBatch:
            studentEmail = student['EmailAddress']
            total_marks_obtained = 0
            total_possible_marks = 0
            test_count = 0

            # Loop through all tests for the batch
            for test in testList:
                testId = test['id']
                possible_marks = int(test['totalMarks']) if test['totalMarks'] else 0

                # Add the possible marks to the total
                total_possible_marks += possible_marks

                # Get the student's obtained marks for this test, if they participated
                student_marks = int(studentMarksMap.get((testId, studentEmail), 0))
                total_marks_obtained += student_marks

                # Increment the test count if the student participated in the test
                if student_marks > 0:
                    test_count += 1

            # Calculate the student's average marks
            if total_possible_marks > 0:
                average_marks = round((total_marks_obtained / total_possible_marks) * 100, 2)
            else:
                average_marks = 0

            # Append the student's test performance data
            studentMarksData.append({
                'studentId': student['studentId'],
                'EmailAddress': studentEmail,
                'totalMarksObtained': total_marks_obtained,
                'totalMarksPossible': total_possible_marks,
                'testCount': test_count,
                'averageTestMarks': average_marks
            })

        # Prepare the final result containing all students' data
        final_result = {
            'students': studentMarksData
        }

        return final_result['students']

    finally:
        cursor.close()
        conn.close()


def getStudAssignmentAvg(email):
    conn = connect_mysql()
    cursor = conn.cursor()

    try:
        # Fetch student information for the given email
        studentSql = """
            SELECT id as studentId, batch, EmailAddress FROM converted_student_data WHERE EmailAddress=%s
        """
        cursor.execute(studentSql, (email,))
        student = cursor.fetchone()

        if not student:
            return {'error': 'Student not found'}

        # Fetch assignments for the student's batch
        assignmentListSql = """
            SELECT * FROM assignmentMaster 
            WHERE JSON_CONTAINS(batch, JSON_OBJECT('batchName', %s), '$')
        """
        cursor.execute(assignmentListSql, (student['batch'],))
        assignmentList = cursor.fetchall()

        # Initialize the result for the student's assignment performance
        final_result = {
            'studentId': student['studentId'],
            'email': student['EmailAddress'],
            'assignments': [],
            'totalMarksObtained': 0,
            'totalMarksPossible': 0,
            'averageAssignmentMarks': 0
        }

        total_obtained_marks = 0
        total_possible_marks = 0
        completed_assignments = 0

        # Loop through each assignment and fetch the student's marks
        for assignment in assignmentList:
            marksSql = """
                SELECT marks FROM assignmentStudentMaster 
                WHERE assignmentId=%s AND email=%s
            """
            cursor.execute(marksSql, (assignment['id'], student['EmailAddress']))
            marks = cursor.fetchone()

            obtained_marks = int(marks['marks']) if marks and marks['marks'] is not None else 0
            possible_marks = int(assignment['totalMarks']) if assignment['totalMarks'] else 0

            total_obtained_marks += obtained_marks
            total_possible_marks += possible_marks

            if possible_marks > 0:
                completed_assignments += 1

            # Append the assignment details for the student
            assignment_data = {
                'assignmentId': assignment['id'],
                'assignmentTitle': assignment['assignmentName'],
                'marksObtained': obtained_marks,
                'totalMarks': possible_marks
            }
            final_result['assignments'].append(assignment_data)

        # Calculate the total and average marks for the student
        final_result['totalMarksObtained'] = total_obtained_marks
        final_result['totalMarksPossible'] = total_possible_marks

        if completed_assignments > 0:
            final_result['averageAssignmentMarks'] = round((total_obtained_marks / total_possible_marks) * 100, 2) if total_possible_marks > 0 else 0
        else:
            final_result['averageAssignmentMarks'] = 0

        return final_result

    finally:
        cursor.close()
        conn.close()


@placementDrive.route('/placementDriveProcess', methods=['POST'])
@cross_origin()
def placementDriveProcess():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
        req =request.json
        print(req)
        id = req['id']
        roundsCleared = req['roundsCleared']
        status = req['status']
       
        updateSql = " UPDATE placementStudentMaster set roundsCleared = %s, status =%s where id = %s"

        data = (roundsCleared,status ,id)

        cursor.execute(updateSql,data)

        resp = jsonify({"status":1, "success":True,  "message": "Placement prive processed successfully", })

    except Exception as e:
        print(e)
        resp = jsonify({"status":0})
    finally:
        cursor.close()
        return resp



@placementDrive.route('/getPlacedSelectedStudent', methods=['POST'])
@cross_origin()
def getPlacedSelectedStudent():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
        req =request.json
        print(req)
        companyEmail = req['email']
        
        getCompanyId = """ SELECT id from placement WHERE companyEmail=%s"""
        cursor.execute(getCompanyId,companyEmail)
        data = cursor.fetchone()['id']
       
        updateSql = "SELECT * FROM placementStudentMaster where companyId = %s AND status=4"
 
        cursor.execute(updateSql,data)
        data = cursor.fetchall()
 
        
        resp = jsonify({"status":1, "success":True,  "result": data, "message": "Selected student fetched!", })

    except Exception as e:
        print(e)
        resp = jsonify({"status":0})
    finally:
        cursor.close()
        return resp


@placementDrive.route('/releaseOfferLetter', methods=['POST'])
@cross_origin()
def releaseOfferLetter():
    conn = connect_mysql()
    cursor = conn.cursor()
    try:
        file = request.files.get('file')
        companyName = request.form.get('companyName')
        studentName = request.form.get('studentName')
        studentId = request.form.get('studentId')
        batchName = request.form.get('batchName')
        print('Hello')

        if file:
            filename, file_extension = os.path.splitext(file.filename)
            new_filename = f"{studentName}_{batchName}_{filename}{file_extension}"
            offerLetter_folder = os.path.join(UPLOAD_OFFER_LETTER_PATH, companyName)
            if not os.path.exists(offerLetter_folder):
                os.makedirs(offerLetter_folder)
            
            file_path = os.path.join(offerLetter_folder, new_filename)
            file.save(file_path)
            
            offerLetterPath = f"offerLetter/{companyName}/{new_filename}"
        else:
            return jsonify({"status": 0, "message": "No file found!"})

            


        updateOfferLetterSql = """
            UPDATE placementStudentMaster
            SET offerLetterPath = %s WHERE id = %s
        """
        cursor.execute(updateOfferLetterSql, (offerLetterPath, studentId))
    
        conn.commit()

        resp = jsonify({"status": 1, "success": True, "message": "Offer Letter uploaded successfully"})
        
       
            
    except Exception as e:
        print(e)
        conn.rollback()
        resp = jsonify({"status": 0, "message": "An error occurred"})

    finally:
        cursor.close()
        conn.close()

    return resp









# @placementDrive.route('/getTotalPlacedStudentListForCurrentYear', methods=['POST'])
# def getTotalPlacedStudentListForCurrentYear():
#     try:
#         conn = connect_mysql()
#         cursor = conn.cursor()


        
#         current_year = datetime.datetime.now().year
#         # print("---------->",current_year)
#         getPlacedStudentList = """
#             SELECT COUNT(DISTINCT email) AS totalNoOfList
#             FROM placementStudentMaster 
#             WHERE YEAR(placedYear) = %s AND status = 4
#         """
        
#         cursor.execute(getPlacedStudentList, (current_year,))

#         placed_count = cursor.fetchone()
#         print(placed_count)

        
#         resp = jsonify({"status":1, "success":True,  "result": placed_count['totalNoOfList'], "message": f"Total placed student in {current_year} fetched!"})

#     except Exception as e:
#         print(e)
#         resp = jsonify({"status":0})
#     finally:
#         cursor.close()
#         return resp

@placementDrive.route('/getTotalPlacedStudentListForCurrentYear', methods=['POST'])
def getTotalPlacedStudentListForCurrentYear():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
 
        # Get the current date
        current_date = datetime.datetime.now()
 
        # Determine the financial year
        if current_date.month >= 4:  # If the current month is April or later
            start_date = datetime.datetime(current_date.year, 4, 1)  # Financial year starts from April of the current year
            end_date = datetime.datetime(current_date.year + 1, 3, 31)  # Financial year ends on March 31 of the next year
        else:
            start_date = datetime.datetime(current_date.year - 1, 4, 1)  # Financial year starts from April of the previous year
            end_date = datetime.datetime(current_date.year, 3, 31)  # Financial year ends on March 31 of the current year
 
        # SQL query to fetch the count of distinct placed students in the current financial year
        getPlacedStudentList = """
            SELECT COUNT(DISTINCT email) AS totalNoOfList
            FROM placementStudentMaster
            WHERE placedYear BETWEEN %s AND %s AND status = 4
        """
 
        cursor.execute(getPlacedStudentList, (start_date, end_date))
 
        placed_count = cursor.fetchone()
        print(placed_count)
 
        resp = jsonify({"status": 1, "success": True, "result": placed_count['totalNoOfList'], "message": f"Total placed students in the financial year {start_date.year}-{end_date.year} fetched!"})
 
    except Exception as e:
        print(e)
        resp = jsonify({"status": 0})
    finally:
        cursor.close()
        return resp

# @placementDrive.route('/getCompanyListCurrentAndTillDate', methods=['POST'])
# def getCompanyListCurrentAndTillDate():
#     try:
#         conn = connect_mysql()
#         cursor = conn.cursor()


        
#         current_year = datetime.datetime.now().year
#         getcompanyCountList = """
#             SELECT COUNT(DISTINCT company_name) AS totalNoOfList
#             FROM placement 
#             WHERE YEAR(date_of_arrival) = %s
#         """
        
#         cursor.execute(getcompanyCountList, (current_year,))

#         companyCount = cursor.fetchone()
        
#         getcompanyCountTillDateList = """
#             SELECT COUNT(DISTINCT company_name) AS totalNoOfList
#             FROM placement
#         """
        
#         cursor.execute(getcompanyCountTillDateList)

#         companyCountTillDate = cursor.fetchone()


        
#         resp = jsonify({"status":1, "success":True,  "companyListCurrentYear": companyCount['totalNoOfList'],"companyCountTillDate" : companyCountTillDate['totalNoOfList'], "message": f"Total number of comoany fetched!"})

#     except Exception as e:
#         print(e)
#         resp = jsonify({"status":0})
#     finally:
#         cursor.close()
#         return resp


@placementDrive.route('/getCompanyListCurrentAndTillDate', methods=['POST'])
def getCompanyListCurrentAndTillDate():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
 
        # Get current date and calculate the current financial year
        current_date = datetime.datetime.now()
        if current_date.month >= 4:  # If the current month is April or later, the financial year starts from the current year
            current_financial_year_start = current_date.year
        else:  # If it's before April, the financial year starts from the previous year
            current_financial_year_start = current_date.year - 1
 
        # Financial year starts from April 1st of the current financial year and ends on March 31st of the next year
        financial_year_start_date = datetime.datetime(current_financial_year_start, 4, 1)
        financial_year_end_date = datetime.datetime(current_financial_year_start + 1, 3, 31)
 
        # Query to get the count of distinct companies for the current financial year
        get_company_count_list = """
            SELECT COUNT(DISTINCT company_name) AS totalNoOfList
            FROM placement 
            WHERE date_of_arrival BETWEEN %s AND %s
        """
        cursor.execute(get_company_count_list, (financial_year_start_date, financial_year_end_date))
        company_count = cursor.fetchone()
 
        # Query to get the count of distinct companies till date
        get_company_count_till_date_list = """
            SELECT COUNT(DISTINCT company_name) AS totalNoOfList
            FROM placement
        """
        cursor.execute(get_company_count_till_date_list)
        company_count_till_date = cursor.fetchone()
 
        # Build the response
        resp = jsonify({
            "status": 1, 
            "success": True,  
            "companyListCurrentYear": company_count['totalNoOfList'],
            "companyCountTillDate": company_count_till_date['totalNoOfList'], 
            "message": "Total number of companies fetched!"
        })
 
    except Exception as e:
        print(e)
        resp = jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()
        return resp


@placementDrive.route('/getTotalStudentPlacedAvgTillDate', methods=['POST'])
def getTotalStudentPlacedAvgTillDate():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        current_date = datetime.datetime.now()

        batchListSql = """
            SELECT batchName
            FROM batchMaster 
            WHERE batchTentiveEndingDate <= %s
        """
        cursor.execute(batchListSql, (current_date,))
        batch = cursor.fetchall()

        if not batch:
            return jsonify({"status": 1, "success": False, "message": "No batches found."})

        batchList = [b['batchName'] for b in batch]

        allEmails = []
        totalStudents = 0

        for batchName in batchList:
            emailSql = """
                SELECT EmailAddress
                FROM converted_student_data
                WHERE batch = %s
            """
            cursor.execute(emailSql, (batchName,))
            emails = cursor.fetchall()

            if not emails:
                continue

            batchEmails = [e['EmailAddress'] for e in emails]
            allEmails.extend(batchEmails)
            totalStudents += len(batchEmails)

        if totalStudents == 0:
            return jsonify({"status": 1, "success": False, "message": "No students found in the batches."})


        placedCount = 0
        for email in allEmails:
            placementStatusSql = """
                SELECT COUNT(DISTINCT email) as count
                FROM placementStudentMaster
                WHERE email = %s AND status = 4
            """
            cursor.execute(placementStatusSql, (email,))
            result = cursor.fetchone()

            if result['count'] > 0:
                placedCount += 1

        
        avgOfPlacedStudent = round((placedCount/totalStudents) * 100,2) 

        resp = jsonify({
            "status": 1,
            "success": True,
            "totalStudents": totalStudents,
            "placedCount": placedCount,
            "avgOfPlacedStudent" : avgOfPlacedStudent 
        })
        

    except Exception as e:
        print(e)
        resp = jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()  
        return resp

@placementDrive.route('/getTotalStudentPlacedAvgCurrentYear', methods=['POST'])
def getTotalStudentPlacedAvgCurrentYear():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        current_year = datetime.datetime.now().year
        
        batchListSql = """
            SELECT batchName
            FROM batchMaster 
            WHERE YEAR(batchTentiveEndingDate) = %s
        """
        cursor.execute(batchListSql, (current_year,))
        batch = cursor.fetchall()
        
        print(batch)
        if not batch:
            return jsonify({"status": 1, "success": False, "message": "No batches found."})

        batchList = [b['batchName'] for b in batch]

        allEmails = []
        totalStudents = 0

        for batchName in batchList:
            emailSql = """
                SELECT EmailAddress
                FROM converted_student_data
                WHERE batch = %s
            """
            cursor.execute(emailSql, (batchName,))
            emails = cursor.fetchall()

            if not emails:
                continue

            batchEmails = [e['EmailAddress'] for e in emails]
            allEmails.extend(batchEmails)
            totalStudents += len(batchEmails)

        if totalStudents == 0:
            return jsonify({"status": 1, "success": False, "message": "No students found in the batches."})


        placedCount = 0
        for email in allEmails:
            placementStatusSql = """
                SELECT COUNT(DISTINCT email) as count
                FROM placementStudentMaster
                WHERE email = %s AND status = 4
            """
            cursor.execute(placementStatusSql, (email,))
            result = cursor.fetchone()

            if result['count'] > 0:
                placedCount += 1

        
        avgOfPlacedStudent = round((placedCount/totalStudents) * 100,2) 

        resp = jsonify({
            "status": 1,
            "success": True,
            "totalStudents": totalStudents,
            "placedCount": placedCount,
            "avgOfPlacedStudent" : avgOfPlacedStudent 
        })
        

    except Exception as e:
        print(e)
        resp = jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()  
        return resp


# @placementDrive.route('/getPlacementRatioByYear', methods=['POST'])
# def getPlacementRatioByYear():
#     try:
#         conn = connect_mysql()
#         cursor = conn.cursor()

#         current_year = datetime.datetime.now().year
#         last_five_years = [current_year - i for i in range(4, -1, -1)]        
#         avgOfPlacedStudentByYear = []

#         for year in last_five_years:
#             batchListSql = """
#                 SELECT batchName
#                 FROM batchMaster 
#                 WHERE YEAR(batchTentiveEndingDate) = %s
#             """
#             cursor.execute(batchListSql, (year,))
#             batch = cursor.fetchall()

#             if not batch:
#                 avgOfPlacedStudentByYear.append(0) 
#                 continue  

#             batchList = [b['batchName'] for b in batch]
#             allEmails = []
#             totalStudents = 0

#             for batchName in batchList:
#                 emailSql = """
#                     SELECT EmailAddress
#                     FROM converted_student_data
#                     WHERE batch = %s
#                 """
#                 cursor.execute(emailSql, (batchName,))
#                 emails = cursor.fetchall()

#                 if not emails:
#                     continue

#                 batchEmails = [e['EmailAddress'] for e in emails]
#                 allEmails.extend(batchEmails)
#                 totalStudents += len(batchEmails)

#             if totalStudents == 0:
#                 avgOfPlacedStudentByYear.append(0)  
#                 continue 

#             placementStatusSql = """
#                 SELECT COUNT(DISTINCT email) as count
#                 FROM placementStudentMaster
#                 WHERE email IN %s AND status = 4
#             """
#             cursor.execute(placementStatusSql, (tuple(set(allEmails)),))  
#             result = cursor.fetchone()
#             placedCount = result['count'] if result else 0

#             avgOfPlacedStudent = round((placedCount / totalStudents) * 100, 2) if totalStudents > 0 else 0
#             avgOfPlacedStudentByYear.append(avgOfPlacedStudent)

#         return jsonify({
#             "status": 1,
#             "success": True,
#             "yearList" : last_five_years,
#             "avgOfPlacedStudent": avgOfPlacedStudentByYear 
#         })

#     except Exception as e:
#         print(e)
#         return jsonify({"status": 0, "message": str(e)})
#     finally:
#         cursor.close()
#         conn.close()


@placementDrive.route('/getPlacementRatioByYear', methods=['POST'])
def getPlacementRatioByYear():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        # Get current date
        current_date = datetime.datetime.now()

        # Calculate financial years and return only the start year in ascending order (e.g., "2020", "2021", etc.)
        def get_financial_years(n):
            years = []
            for i in range(n-1, -1, -1):  # Reverse loop to get ascending order
                if current_date.month >= 4:
                    start_year = current_date.year - i
                else:
                    start_year = current_date.year - i - 1
                years.append(str(start_year))  # Append only the start year as a string
            return years

        last_five_years = get_financial_years(5)  # Get financial years in ascending order
        avgOfPlacedStudentByYear = []

        for fy in last_five_years:
            start_year = int(fy)  # Convert the year back to an integer

            # Define the start and end date of the financial year
            start_date = datetime.datetime(start_year, 4, 1)
            end_date = datetime.datetime(start_year + 1, 3, 31)

            # Get the list of batches with batchTentiveEndingDate in the financial year
            batchListSql = """
                SELECT batchName
                FROM batchMaster 
                WHERE batchTentiveEndingDate BETWEEN %s AND %s
            """
            cursor.execute(batchListSql, (start_date, end_date))
            batch = cursor.fetchall()

            if not batch:
                avgOfPlacedStudentByYear.append(0)
                continue

            batchList = [b['batchName'] for b in batch]
            allEmails = []
            totalStudents = 0

            for batchName in batchList:
                emailSql = """
                    SELECT EmailAddress
                    FROM converted_student_data
                    WHERE batch = %s
                """
                cursor.execute(emailSql, (batchName,))
                emails = cursor.fetchall()

                if not emails:
                    continue

                batchEmails = [e['EmailAddress'] for e in emails]
                allEmails.extend(batchEmails)
                totalStudents += len(batchEmails)

            if totalStudents == 0:
                avgOfPlacedStudentByYear.append(0)
                continue

            # Get the count of placed students within those emails for the financial year
            placementStatusSql = """
                SELECT COUNT(DISTINCT email) as count
                FROM placementStudentMaster
                WHERE email IN %s AND status = 4
            """
            cursor.execute(placementStatusSql, (tuple(set(allEmails)),))
            result = cursor.fetchone()
            placedCount = result['count'] if result else 0

            avgOfPlacedStudent = round((placedCount / totalStudents) * 100, 2) if totalStudents > 0 else 0
            avgOfPlacedStudentByYear.append(avgOfPlacedStudent)

        return jsonify({
            "status": 1,
            "success": True,
            "yearList": last_five_years,  # Ascending order of years
            "avgOfPlacedStudent": avgOfPlacedStudentByYear
        })

    except Exception as e:
        print(e)
        return jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()

@placementDrive.route('/getPlacementRatioByGrades', methods=['POST'])
def getPlacementRatioByGrades():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        year = datetime.datetime.now().year
        avgAttendanceAndTestByStudent = []

        # Grade and placement counters
        gradeCounters = {
            'E': {'placed': 0, 'not_placed': 0},
            'D': {'placed': 0, 'not_placed': 0},
            'C': {'placed': 0, 'not_placed': 0},
            'B': {'placed': 0, 'not_placed': 0},
            'A': {'placed': 0, 'not_placed': 0},
            'A+': {'placed': 0, 'not_placed': 0}
        }

        allEmails = []

        # Fetch batches for the given year
        batchListSql = """
            SELECT batchName
            FROM batchMaster 
            WHERE YEAR(batchTentiveEndingDate) = %s
        """
        cursor.execute(batchListSql, (year,))
        batches = cursor.fetchall()

        if not batches:
            return jsonify({'error': 'No batches found for the given year'}), 404

        batchList = [b['batchName'] for b in batches]

        # Iterate over each batch
        for batch in batchList:
            # Fetch emails of students in the batch
            emailSql = """
                SELECT EmailAddress
                FROM converted_student_data
                WHERE batch = %s
            """
            cursor.execute(emailSql, (batch,))
            emails = cursor.fetchall()

            if not emails:
                avgAttendanceAndTestByStudent.append({
                    'batch': batch,
                    'students': []
                })
                continue

            batchEmails = [e['EmailAddress'] for e in emails]
            allEmails.extend(batchEmails)

            # Fetch meeting IDs related to this batch
            meetingIdSql = """
                SELECT meetingId
                FROM meetings
                WHERE REPLACE(REPLACE(batch, '[', ''), ']', '') LIKE %s
            """
            batchLike = '%"{}"%'.format(batch)
            cursor.execute(meetingIdSql, (batchLike,))
            meetingIds = cursor.fetchall()

            meetingIds = [meet['meetingId'] for meet in meetingIds if meet['meetingId'] is not None]

            # Fetch test data related to the batch
            testListSql = """
                SELECT * FROM tests 
                WHERE JSON_CONTAINS(batchName, JSON_OBJECT('batchName', %s), '$')
            """
            cursor.execute(testListSql, (batch,))
            testList = cursor.fetchall()

            # Calculate attendance, test, and assignment averages for each student in the batch
            studentPerformanceList = []
            for studentEmail in batchEmails:
                # Calculate attendance
                attendanceData = {'present': 0, 'absent': 0}

                for meetingId in meetingIds:
                    attendanceSql = """
                        SELECT u.email
                        FROM attendanceFeedback a
                        JOIN user u ON u.id = SUBSTRING_INDEX(a.StudentName, '_', -1)
                        WHERE a.meetingId = %s AND u.email = %s
                    """
                    cursor.execute(attendanceSql, (meetingId, studentEmail))
                    presentStudent = cursor.fetchone()

                    if presentStudent:
                        attendanceData['present'] += 1
                    else:
                        attendanceData['absent'] += 1

                totalClasses = attendanceData['present'] + attendanceData['absent']
                attendancePercentage = (attendanceData['present'] / totalClasses) * 100 if totalClasses > 0 else 0

                # Calculate test averages for the student
                studentMarksMap = {}
                total_test_obtained_marks = 0
                total_test_possible_marks = 0

                for test in testList:
                    marksSql = """
                        SELECT marksObtained FROM studentTestAnswers 
                        WHERE testId = %s AND email = %s
                    """
                    cursor.execute(marksSql, (test['id'], studentEmail))
                    marks = cursor.fetchone()

                    obtained_marks = marks['marksObtained'] if marks else 0
                    studentMarksMap[test['id']] = obtained_marks

                    total_test_obtained_marks += int(obtained_marks)
                    total_test_possible_marks += int(test.get('totalMarks', 0)) if test.get('totalMarks') else 0

                average_test_marks_percentage = (total_test_obtained_marks / total_test_possible_marks) * 100 \
                    if total_test_possible_marks > 0 else 0

                # Calculate assignment averages for the student
                sql = """
                    SELECT am.totalMarks, am.assignmentName, am.Id, asm.marks
                    FROM assignmentMaster am
                    JOIN assignmentStudentMaster asm ON am.Id = asm.assignmentId
                    WHERE asm.email = %s AND JSON_CONTAINS(am.batch, %s, '$')
                """
                cursor.execute(sql, (studentEmail, '{"batchName": "' + batch + '"}'))
                assignments = cursor.fetchall()

                sum_total_marks = 0
                sum_obtained_marks = 0
                for assignment in assignments:
                    total_marks = int(assignment['totalMarks'])  
                    obtained_marks = int(assignment['marks']) if assignment['marks'] is not None else 0  
                    
                    sum_total_marks += total_marks
                    sum_obtained_marks += obtained_marks

                assignmentResultPercentage = (sum_obtained_marks / sum_total_marks) * 100 if sum_total_marks > 0 else 0

                # Calculate overall performance
                overallPerformance = round(
                    (assignmentResultPercentage + average_test_marks_percentage + attendancePercentage) / 3, 2
                )

                # Assign grade based on overall performance
                grade = ''
                if overallPerformance <= 35:
                    grade =  "E"
                elif overallPerformance <= 45:
                    grade = "D"
                elif overallPerformance <= 55:
                    grade = "C"
                elif overallPerformance <= 65:
                    grade = "B"
                elif overallPerformance < 80:
                    grade = "A"
                else:
                    grade = "A+"

                # Append student performance data
                studentPerformanceList.append({
                    'email': studentEmail,
                    'attendancePercentage': round(attendancePercentage, 2),
                    'averageTestMarksPercentage': round(average_test_marks_percentage, 2),
                    'assignmentResultPercentage': round(assignmentResultPercentage, 2),
                    'overallPerformance': overallPerformance,
                    'grade': grade
                })

            # Append batch performance data with student details
            avgAttendanceAndTestByStudent.append({
                'batch': batch,
                'students': studentPerformanceList
            })

        # Now count the placed students based on the allEmails list
        placementStatusSql = """
            SELECT email, COUNT(DISTINCT email) as count
            FROM placementStudentMaster
            WHERE email IN %s AND status = 4
            GROUP BY email
        """
        cursor.execute(placementStatusSql, (tuple(set(allEmails)),))  
        placedStudents = cursor.fetchall()

        placedEmails = {student['email'] for student in placedStudents}

        # Count students placed and not placed by grade
        for batch in avgAttendanceAndTestByStudent:
            for student in batch['students']:
                grade = student['grade']
                email = student['email']

                if email in placedEmails:
                    gradeCounters[grade]['placed'] += 1
                else:
                    gradeCounters[grade]['not_placed'] += 1

        # Return the performance data for all batches and students along with grade counts
        return jsonify({
            'data': avgAttendanceAndTestByStudent,
            'gradeCounts': gradeCounters
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@placementDrive.route('/getPlacementCountByYear', methods=['POST'])
def getPlacementCountByYear():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        current_date = datetime.datetime.now()

        def get_financial_years(n):
            years = []
            for i in range(n-1, -1, -1):  
                if current_date.month >= 4:
                    start_year = current_date.year - i
                else:
                    start_year = current_date.year - i - 1
                years.append(str(start_year))  # Append only the start year as a string
            return years

        last_five_years = get_financial_years(5)  # Get financial years in ascending order
        placed_list = []
        not_placed_list = []

        for fy in last_five_years:
            start_year = int(fy)  # Convert the year back to an integer

            start_date = datetime.datetime(start_year, 4, 1)
            end_date = datetime.datetime(start_year + 1, 3, 31)

            batchListSql = """
                SELECT batchName
                FROM batchMaster 
                WHERE batchTentiveEndingDate BETWEEN %s AND %s
            """
            cursor.execute(batchListSql, (start_date, end_date))
            batch = cursor.fetchall()

            if not batch:
                placed_list.append(0)
                not_placed_list.append(0)
                continue

            batchList = [b['batchName'] for b in batch]
            allEmails = []
            totalStudents = 0

            for batchName in batchList:
                emailSql = """
                    SELECT EmailAddress
                    FROM converted_student_data
                    WHERE batch = %s
                """
                cursor.execute(emailSql, (batchName,))
                emails = cursor.fetchall()

                if not emails:
                    continue

                batchEmails = [e['EmailAddress'] for e in emails]
                allEmails.extend(batchEmails)
                totalStudents += len(batchEmails)

            if totalStudents == 0:
                placed_list.append(0)
                not_placed_list.append(0)
                continue

            placementStatusSql = """
                SELECT COUNT(DISTINCT email) as count
                FROM placementStudentMaster
                WHERE email IN %s AND status = 4
            """
            cursor.execute(placementStatusSql, (tuple(set(allEmails)),))
            result = cursor.fetchone()
            placedCount = result['count'] if result else 0

            notPlacedCount = totalStudents - placedCount

            placed_list.append(placedCount)
            not_placed_list.append(notPlacedCount)

        return jsonify({
            "status": 1,
            "success": True,
            "yearList": last_five_years,  
            "placed": placed_list,
            "notPlaced": not_placed_list
        })

    except Exception as e:
        print(e)
        return jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()


@placementDrive.route('/getPlacementCountByCompany', methods=['POST'])
def getPlacementCountByCompany():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        getAllCompanies = """
            SELECT DISTINCT company_name
            FROM placement
        """
        cursor.execute(getAllCompanies)
        allCompanies = cursor.fetchall()
        companyNames = [row['company_name'] for row in allCompanies]

        getCountByCompany = """
            SELECT companyName, COUNT(id) AS totalNoOfList
            FROM placementStudentMaster 
            WHERE status = 4
            GROUP BY companyName
        """
        
        cursor.execute(getCountByCompany)
        companyCount = cursor.fetchall()

        companyPlacementDict = {row['companyName']: row['totalNoOfList'] for row in companyCount}

        finalResult = {company: companyPlacementDict.get(company, 0) for company in companyNames}

        resp = jsonify({"status": 1, "success": True, "result": finalResult})

    except Exception as e:
        print(e)
        resp = jsonify({"status": 0, "message": str(e)})

    finally:
        cursor.close()
        conn.close()

    return resp



@placementDrive.route('/getPlacementAvgByCourse', methods=['POST'])
def getPlacementAvgByCourse():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()

        courseList = []
        totalStudentCountInCourse = []
        avgStudentPlacedInCourse = []

        # Step 1: Get the list of courses
        getCourseName = """
            SELECT courseName
            FROM courseMaster
        """
        cursor.execute(getCourseName)
        courseNameResults = cursor.fetchall()

        for course in courseNameResults:
            courseName = course['courseName']
            
            # Step 2: Get the list of batches for the current course
            getBatchListInEachCourse = """
                SELECT batchName
                FROM batchMaster 
                WHERE courseType = %s
            """
            cursor.execute(getBatchListInEachCourse, (courseName,))
            batches = cursor.fetchall()

            totalStudents = 0
            placedStudents = 0

            for batch in batches:
                batchName = batch['batchName']
                
                # Step 3: Get the list of students from each batch
                getStudentEmailsInBatch = """
                    SELECT EmailAddress
                    FROM converted_student_data
                    WHERE batch = %s
                """
                cursor.execute(getStudentEmailsInBatch, (batchName,))
                students = cursor.fetchall()
                
                if students:
                    studentEmails = [student['EmailAddress'] for student in students]
                    totalStudents += len(studentEmails)

                    # Step 4: Get the count of placed students (status = 4) for each batch
                    getPlacedStudents = """
                        SELECT COUNT(DISTINCT email) AS placedCount
                        FROM placementStudentMaster
                        WHERE email IN %s AND status = 4
                    """
                    cursor.execute(getPlacedStudents, (tuple(studentEmails),))
                    placedResult = cursor.fetchone()
                    placedStudents += placedResult['placedCount'] if placedResult else 0

            # Step 5: Skip courses with zero students
            if totalStudents > 0:
                # Calculate the placement percentage (or average)
                placementPercentage = (placedStudents / totalStudents) * 100
                # Append data to lists
                courseList.append(courseName)
                totalStudentCountInCourse.append(totalStudents)
                avgStudentPlacedInCourse.append(round(placementPercentage, 2))

        return jsonify({
            "status": 1,
            "success": True,
            "courseList": courseList,
            "TotalStudentCountINCourse": totalStudentCountInCourse,
            "AvgStudentPlacedInCourse": avgStudentPlacedInCourse
        })

    except Exception as e:
        print(e)
        return jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()


        
@placementDrive.route('/getAvgPlacedByFinancialYear', methods=['POST'])
def getAvgPlacedByFinancialYear():
    try:
        conn = connect_mysql()
        cursor = conn.cursor()
 
        # Get current date
        current_date = datetime.datetime.now()
 
        # Function to get financial years excluding the current one
        def get_financial_years_except_current():
            years = []
            # Determine the current financial year based on the month
            if current_date.month >= 4:
                current_financial_year = current_date.year
            else:
                current_financial_year = current_date.year - 1
            # Fetch financial years from the database, adjusting for financial year (April to March)
            sql = """
                SELECT DISTINCT 
                    CASE 
                        WHEN MONTH(batchTentiveEndingDate) >= 4 THEN YEAR(batchTentiveEndingDate)
                        ELSE YEAR(batchTentiveEndingDate) - 1
                    END AS financialYear
                FROM batchMaster 
                WHERE (
                    (MONTH(batchTentiveEndingDate) >= 4 AND YEAR(batchTentiveEndingDate) < %s)
                    OR (MONTH(batchTentiveEndingDate) < 4 AND YEAR(batchTentiveEndingDate) <= %s)
                )
            """
            cursor.execute(sql, (current_financial_year, current_financial_year))
            result = cursor.fetchall()
 
            for row in result:
                # Financial year 2022-2023 is represented as 2022
                years.append(row['financialYear'])
            return years
 
        # Get all financial years excluding the current one
        financial_years = get_financial_years_except_current()
 
        totalPlacedByYear = []
        totalPlacedStudents = 0
        totalYearsWithPlacedStudents = 0  # Count how many years had placed students
 
        for fy in financial_years:
            # Financial year starts on April 1st of the given year and ends on March 31st of the next year
            start_date = datetime.datetime(fy, 4, 1)
            end_date = datetime.datetime(fy + 1, 3, 31)
 
            # Fetch the list of placed students for this financial year
            placementSql = """
                SELECT COUNT(DISTINCT email) as placedCount
                FROM placementStudentMaster 
                WHERE status = 4 AND batchName IN (
                    SELECT batchName FROM batchMaster WHERE batchTentiveEndingDate BETWEEN %s AND %s
                )
            """
            cursor.execute(placementSql, (start_date, end_date))
            result = cursor.fetchone()
            placedCount = result['placedCount'] if result else 0
 
            # Only include years where there were placed students
            if placedCount > 0:
                totalPlacedByYear.append({
                    "year": f"{fy}-{fy+1}",  # Represent the financial year as "2022-2023"
                    "placedCount": placedCount
                })
                totalPlacedStudents += placedCount
                totalYearsWithPlacedStudents += 1
 
        # Calculate the average placed students (avoid division by zero)
        avgPlacedStudents = round(totalPlacedStudents / totalYearsWithPlacedStudents, 2) if totalYearsWithPlacedStudents > 0 else 0
 
        return jsonify({
            "status": 1,
            "success": True,
            "placedByYear": totalPlacedByYear,
            "averagePlaced": avgPlacedStudents
        })
 
    except Exception as e:
        print(e)
        return jsonify({"status": 0, "message": str(e)})
    finally:
        cursor.close()
        conn.close()