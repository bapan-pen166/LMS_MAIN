import requests
import pandas as pd
import json
import sqlalchemy
from sqlalchemy import create_engine
import urllib
from urllib.parse import quote_plus
import pymysql

engine = create_engine('mysql+pymysql://root:%s@localhost/lms' % quote_plus('password'))

url = f"https://api-in21.leadsquared.com/v2/LeadManagement.svc/Leads.Get?accessKey=u$r54682b1706e22d7ceff04cf2179c0217&secretKey=ce1b2f4d522b4e010b43091503addd0440c1810b"
pageNo = 1
dataCount = 0

while True:
    payload = {
        "Parameter": {
            "LookupName": "ProspectStage",
            "LookupValue": "Converted – 100%",
            "SqlOperator": "="
        },
        "Columns": {
            "Include_CSV": "ProspectID, FirstName, LastName, EmailAddress,ProspectStage,CreatedOn,SourceCampaign,mx_Disposition,mx_Sub_Disposition,Source,mx_Course,OwnerIdName,mx_State,Phone,ModifiedOn"
        },
        "Sorting": {
            "ColumnName": "CreatedOn",
            "Direction": "1"
        },
        "Paging": {
            "PageIndex": pageNo,
            "PageSize": 1000
        }
    }

    response = requests.post(url, json=payload)
    data = response.text
    dataDict = json.loads(data)

    if len(dataDict) != 0:
        
        df = pd.DataFrame(dataDict)
        print("page no >>>> ",pageNo,">>>>",df)

        df.to_sql("converted_student_data", if_exists = 'append', index=False, con=engine)
        pageNo += 1

    else:
        break