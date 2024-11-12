import time
import pandas as pd
import os
from datetime import datetime
from db import *
# from interaction import *
# from dbrenewaltool import *
import subprocess

BASE_PATH = os.path.dirname(os.path.abspath(__file__))
# BASE_PATH, tail = os.path.split(PATH)
print(BASE_PATH)
# print(tail)
UPLOAD_FOLDER = BASE_PATH + '/static/uploads/'
DOWNLOAD_PATH = BASE_PATH + '/static/downloads/'
GRAPH_PATH = BASE_PATH + '/static/graphs/'
TEMPLATE_DOC = BASE_PATH +'/static/template/'
UPLOAD_DOC_PATH = BASE_PATH + '/static/uploadDocument/'
UPLOAD_COURSE_PATH = BASE_PATH + '/static/courseDetails/'
UPLOAD_SUBMODULE_CONTENT_PATH = BASE_PATH + '/static/subModuleContents/'
UPLOAD_STUD_RESUME_PATH =  BASE_PATH + '/static/studentResume'

UPLOAD_ASSIGNMENT_PATH = BASE_PATH + '/static/assignmentUploads'
ALL_TESTS = BASE_PATH + '/static/allTests/'
UPLOAD_STUD_ASSIGNMENT_PATH = BASE_PATH + '/static/studentAssignmentUploads'
UPLOAD_OFFER_LETTER_PATH = BASE_PATH + '/static/offerLetter'
UPLOAD_STUD_RESUME_PROFILE_PATH =  BASE_PATH + '/static/studentResumeProfile'
CERTIFICATE_PATH =  BASE_PATH + '/static/certificate'
UPLOAD_STUD_PROFILE_PIC = BASE_PATH + '/static/studentProfilePic'
PORTFOLIO_DATA = BASE_PATH + '/static/portfolio'


img_path = BASE_PATH +'/static/img/'
# TEMPLATE_DOC = "/home/pentation/Agent_360/API/static/template/agentScoreCard_template.docx"

def current_milli_time():
    return str(round(time.time() * 1000))

def getCurrentDateTime():
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    return dt_string

def getExtractedList(listOfDict, keyName):
    listVar = ['--',]
    for each in listOfDict:
        listVar.append(each[keyName])
    return listVar

