from flask import Blueprint
from flask.json import jsonify
from db import *
from flask.globals import request
from flask_cors import cross_origin
from common import *
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from api.sendMail import * 
import os
import logging
from werkzeug.utils import secure_filename




engine = create_engine('mysql+pymysql://root:%s@localhost/lms' % quote_plus('password'))


portfolio = Blueprint('portfolio', __name__)




@portfolio.route('/',methods=['GET'])
def test():
    return jsonify({"status":"OK"})


'''---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'''


@portfolio.route('/getPortfolioPages', methods=['POST'])
@cross_origin()
def getPortfolioPages():
    conn = connect_mysql()
    cursor = conn.cursor()
    try:
        data = request.json
        pageNo  = data['pageNo']
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['studentEmail']
        print("Email ::::::::::::::::::",email)
        if pageNo == 1:
            print("Helllllo")
            firstPagePath = f"static/portfolio/templates/PortfolioPage1.jpg"
            res = firstPagePath
            
        elif pageNo == 2:
            # Query to get contact details
            contactDetailsSQL = """
            SELECT linkedinLink, city, state, country, email , mobileNumber
            FROM studentRegistrationDetails 
            WHERE email=%s
            """
            cursor.execute(contactDetailsSQL, (email,))
            contactDetails = cursor.fetchone()
            print(contactDetails)

            # Query to get AboutMe data
            aboutMeSql = """
            SELECT AboutMe, studentName, studentProfilePhoto 
            FROM portfolioMaster 
            WHERE studentEmail=%s
            """
            cursor.execute(aboutMeSql, (email,))
            aboutMe = cursor.fetchone()
            
            print(aboutMe)

            if contactDetails and aboutMe:
                res = {
                    "contactDetails": {
                        "linkedinLink": contactDetails['linkedinLink'],
                        "city": contactDetails['city'],
                        "state": contactDetails['state'],
                        "country": contactDetails['country'],
                        "email": contactDetails['email'],
                        "mobileNumber": contactDetails['mobileNumber']
                    },
                    "aboutMe": {
                        "AboutMe": aboutMe['AboutMe'],
                        "studentName": aboutMe['studentName'].title(),
                        "studentProfilePhoto": aboutMe['studentProfilePhoto']
                    }
                }
            else:
                res = "No data found for the provided email."

            conn.commit()
        else:
            res = "Not in the clicked Page number"
                
        
        return jsonify({
                "status": 1,
                "success": True,
                "message": "Retrieved successfully",
                "result": res
            })
      
    except Exception as e:
        print("Error:", e)
        return jsonify({"status": 0, "success": False, "message": "Some error occurred!"})
    
    finally:
        cursor.close()
        conn.close()
        
        
        
        
        
@portfolio.route('/insertAboutMe', methods=['POST'])
@cross_origin()
def insertAboutMe():
    conn = connect_mysql()
    cursor = conn.cursor()
    try:
        data = request.form
        file = request.files.get('file')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        studentUserId = data.get('id')
        email = data.get('studentEmail')
        aboutMe = data.get('aboutMe')
        
        studentName = f"{firstName} {lastName}"
        path = f'{PORTFOLIO_DATA}/templates/{studentUserId}_{studentName}'
        
        if not file or not allowed_file(file.filename):
            return jsonify({"status": 0, "success": False, "message": "Invalid or missing file!"})

        if not os.path.exists(path):
            os.makedirs(path)
        
        filename, file_extension = os.path.splitext(secure_filename(file.filename))
        new_filename = f"{studentUserId}_{studentName}_{filename}{file_extension}"
        file_path = os.path.join(path, new_filename)
        file.save(file_path)
    
        profilePicPath = f"static/portfolio/templates/{studentUserId}_{studentName}/{new_filename}"
        
        check_sql = "SELECT * FROM `portfolioMaster` WHERE `studentEmail` = %s"
        cursor.execute(check_sql, (email,))
        result = cursor.fetchone()

        if result:
            update_sql = """
            UPDATE `portfolioMaster` 
            SET `studentName` = %s, `AboutMe` = %s, `studentProfilePhoto` = %s 
            WHERE `studentEmail` = %s
            """
            cursor.execute(update_sql, (studentName, aboutMe, profilePicPath, email))
            conn.commit()
            return jsonify({
                "status": 1,
                "success": True,
                "message": "Updated successfully",
            })
        else:
            insert_sql = """
            INSERT INTO `portfolioMaster` (`studentName`, `studentEmail`, `AboutMe`, `studentProfilePhoto`) 
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_sql, (studentName, email, aboutMe, profilePicPath))
            conn.commit()
            return jsonify({
                "status": 1,
                "success": True,
                "message": "Inserted successfully",
            })
      
    except Exception as e:
        logging.error("Error occurred: %s", e)
        return jsonify({"status": 0, "success": False, "message": "Some error occurred!"})
    
    finally:
        cursor.close()
        conn.close()

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS