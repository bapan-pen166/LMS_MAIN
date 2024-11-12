from flask import Flask, jsonify
import requests
import pandas as pd
import json
import sqlalchemy
from sqlalchemy import create_engine
from urllib.parse import quote_plus
import pymysql
from flask import Blueprint

crm = Blueprint('crm', __name__)

engine = create_engine('mysql+pymysql://root:%s@localhost/lms' % quote_plus('password'))

url = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Leads.Get?accessKey=u$r54682b1706e22d7ceff04cf2179c0217&secretKey=ce1b2f4d522b4e010b43091503addd0440c1810b"

def get_existing_prospect_ids(engine):
    query = "SELECT ProspectID FROM converted_student_data"
    existing_ids = pd.read_sql(query, con=engine)
    return set(existing_ids['ProspectID'].values)

def fetch_and_append_new_data():
    pageNo = 1
    dataCount = 0

    existing_prospect_ids = get_existing_prospect_ids(engine)
    total_new_records = 0

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
            print(f"Page No >>>> {pageNo} >>>> {df.shape}")

            new_data_df = df[~df['ProspectID'].isin(existing_prospect_ids)]

            columns_to_drop = ['ProspectAutoId', 'OwnerId', 'IsStarredLead', 'IsTaggedLead', 'CanUpdate']
            new_data_df = new_data_df.drop(columns=columns_to_drop, errors='ignore')

            if not new_data_df.empty:
                new_data_df.to_sql("converted_student_data", if_exists='append', index=False, con=engine)
                total_new_records += new_data_df.shape[0]
                print(f"Appended {new_data_df.shape[0]} new records to the database.")
            else:
                print("No new records to append.")

            pageNo += 1
        else:
            break

    return total_new_records

@crm.route('/crm', methods=['POST'])
def update_converted_students():
    try:
        new_records_count = fetch_and_append_new_data()

        return jsonify({
            "success": True,
            "message": f"{new_records_count} new records appended to the database."
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })
