from datetime import datetime, timedelta

from flask import jsonify, request, Blueprint
from flask_cors import cross_origin

from db import connect_mysql

attend_feed = Blueprint('attend_feed', __name__)

cur = connect_mysql()
cursor = cur.cursor()

all_peers = []
all_left_peers = []
all_df = {}


# attendanceFeedback - database table

@attend_feed.route('/updateFeedback', methods=['POST'])
@cross_origin()
def updateFeedback():
    try:
        rating = int(request.json['rating'])
        name = request.json['peer_name']
        room_name = request.json['room_name']
        cursor.execute("""
                UPDATE attendanceFeedback 
                SET Feedback = %s 
                WHERE StudentName = %s AND BatchName = %s
                """, (rating, name, room_name))
        return jsonify({"status": 1, 'message': 'Feedback added to Excel and Database successfully.'})

    except Exception as e:
        print(e)
        return jsonify({'status': 0})


# @attend_feed.route('/updateAttendance', methods=['POST'])
# @cross_origin()
# def updateAttendance():
#     print(request.json)
#     return '0'


@attend_feed.route('/updateAttendance', methods=['POST'])
@cross_origin()
def updateAttendance():
    try:
        utc_now = datetime.utcnow()
        time_difference = timedelta(hours=5, minutes=30)
        ist_now = utc_now + time_difference

        if request.json['type'] == 'joined':
            if not any(d['peer_name'] == request.json['peer_name'] for d in all_peers):
                all_peers.append(request.json)
            else:
                print(f"Dictionary with name '{all_peers['peer_name']}' already exists.")
            # if not any(item['peer_name'] == request.json['peer_name'] for item in all_peers):
            #     if not any(item['join_data_time'] == request.json['join_data_time'] for item in all_peers):
            #         all_peers.append(request.json)
            # print('time', request.json['join_data_time'].split('-'))
            # if request.json['room_name'] in all_df:
            #     all_df[request.json['room_name']].append(
            #         (request.json['peer_name'], request.json['join_data_time'], 0, 0))
            # else:
            #     all_df[request.json['room_name']] = [
            #         (request.json['peer_name'], request.json['join_data_time'], 0, 0)]
        else:
            for index, peer in enumerate(all_peers):
                if peer['peer_name'] == request.json['peer_name'] and peer['room_name'] == request.json[
                    'room_name']:
                    name = request.json['peer_name']
                    room = request.json['room_name']
                    join = peer['join_data_time']
                    cursor.execute(
                        """INSERT INTO attendanceFeedback (StudentName, JoinedAt, LeftAt, BatchName) VALUES (%s, %s, %s, %s)""",
                        (name, join, ist_now.strftime("%m/%d/%Y %H:%M:%S"), room)
                    )
                    all_peers.remove(peer)
            cur.commit()

            # print(all_peers, 'after')
            #
            # if not len(all_peers) == len(all_left_peers):
            #     if not any(item['peer_name'] == request.json['peer_name'] for item in all_left_peers):
            #         # if not any(item['join_data_time'] == request.json['join_data_time'] for item in all_left_peers):
            #         all_left_peers.append(
            #             {'peer_name': request.json['peer_name'],
            #              'join_data_time': ist_now.strftime("%m/%d/%Y %H:%M:%S"),
            #              'room_name': request.json['room_name']})
            #
            #         for index, users in enumerate(all_df[request.json['room_name']]):
            #             if users[0] == request.json['peer_name']:
            #                 old_time = users[1]
            #                 all_df[request.json['room_name']].pop(index)
            #                 all_df[request.json['room_name']].insert(index, (
            #                     request.json['peer_name'], old_time, ist_now.strftime("%m/%d/%Y %H:%M:%S"), 0))
            #         # if request.json['room_name'] in all_df:
            #         #     all_df[request.json['room_name']].append((request.json['peer_name'], 0, ist_now.strftime('%Y-%m-%d %H:%M:%S')))
            #         # else:
            #         #     all_df[request.json['room_name']] = all_df[request.json['room_name']].append(
            #         #         (request.json['peer_name'], 0, ist_now.strftime('%Y-%m-%d %H:%M:%S')))
            # if len(all_peers) and len(all_left_peers):
            #     alldf = pd.DataFrame(all_df[request.json['room_name']],
            #                          columns=['StudentName', 'JoinedAt', 'LeftAt', 'Feedback'])
            #
            #     if os.path.exists(f"{request.json['room_name']}.xlsx"):
            #         try:
            #             # Try to open the existing Excel file and append to it
            #             with pd.ExcelWriter(f"{request.json['room_name']}.xlsx", engine='openpyxl', mode='a',
            #                                 if_sheet_exists='replace') as writer:
            #                 alldf.to_excel(writer, sheet_name='Sheet1', index=False)
            #         except Exception as e:
            #             print(f"An error occurred while processing the file: {e}")
            #             # Handle specific file issues or corruption here
            #     else:
            #         try:
            #             # Create a new Excel file if it does not exist
            #             with pd.ExcelWriter(f"{request.json['room_name']}.xlsx", engine='openpyxl') as writer:
            #                 alldf.to_excel(writer, sheet_name='Sheet1', index=False)
            #         except Exception as e:
            #             print(f"An error occurred while creating the file: {e}")

            # if all_left_peers:
            #     for peer in all_peers:
            #         if peer['peer_name'] == all_left_peers[-1]['peer_name'] and peer['room_name'] == all_left_peers[-1]['room_name']:
            #             cursor.execute("""INSERT INTO attendanceFeedback (StudentName, JoinedAt, LeftAt, BatchName) VALUES (%s, %s, %s, %s)""", (peer['peer_name'], peer['join_data_time'], all_left_peers[-1]['join_data_time'], peer['room_name']))
            #             cur.commit()
        return {'status': 1}
    except Exception as e:
        print(e)
        return jsonify({'status': 0})

# utc_now = datetime.utcnow()
# time_difference = timedelta(hours=5, minutes=30)
# ist_now = utc_now + time_difference
#
# if request.json['type'] == 'joined':
#     if not any(item['peer_name'] == request.json['peer_name'] for item in all_peers):
#         if not any(item['join_data_time'] == request.json['join_data_time'] for item in all_peers):
#             all_peers.append(request.json)
#             # print('time', request.json['join_data_time'].split('-'))
#             if request.json['room_name'] in all_df:
#                 all_df[request.json['room_name']].append(
#                     (request.json['peer_name'], request.json['join_data_time'], 0, 0))
#             else:
#                 all_df[request.json['room_name']] = [
#                     (request.json['peer_name'], request.json['join_data_time'], 0, 0)]
# else:
#     if not len(all_peers) == len(all_left_peers):
#         if not any(item['peer_name'] == request.json['peer_name'] for item in all_left_peers):
#             if not any(item['join_data_time'] == request.json['join_data_time'] for item in all_left_peers):
#                 all_left_peers.append(
#                     {'peer_name': request.json['peer_name'],
#                      'join_data_time': ist_now.strftime("%m/%d/%Y %H:%M:%S")})
#
#                 for index, users in enumerate(all_df[request.json['room_name']]):
#                     if users[0] == request.json['peer_name']:
#                         old_time = users[1]
#                         all_df[request.json['room_name']].pop(index)
#                         all_df[request.json['room_name']].insert(index, (
#                             request.json['peer_name'], old_time, ist_now.strftime("%m/%d/%Y %H:%M:%S"), 0))
#
#                 # if request.json['room_name'] in all_df:
#                 #     all_df[request.json['room_name']].append((request.json['peer_name'], 0, ist_now.strftime('%Y-%m-%d %H:%M:%S')))
#                 # else:
#                 #     all_df[request.json['room_name']] = all_df[request.json['room_name']].append(
#                 #         (request.json['peer_name'], 0, ist_now.strftime('%Y-%m-%d %H:%M:%S')))
#
# if len(all_peers) and len(all_left_peers):
#     alldf = pd.DataFrame(all_df[request.json['room_name']],
#                          columns=['StudentName', 'JoinedAt', 'LeftAt', 'Feedback'])
#
#     if os.path.exists(f"{request.json['room_name']}.xlsx"):
#         try:
#             # Try to open the existing Excel file and append to it
#             with pd.ExcelWriter(f"{request.json['room_name']}.xlsx", engine='openpyxl', mode='a',
#                                 if_sheet_exists='replace') as writer:
#                 alldf.to_excel(writer, sheet_name='Sheet1', index=False)
#         except Exception as e:
#             print(f"An error occurred while processing the file: {e}")
#             # Handle specific file issues or corruption here
#     else:
#         try:
#             # Create a new Excel file if it does not exist
#             with pd.ExcelWriter(f"{request.json['room_name']}.xlsx", engine='openpyxl') as writer:
#                 alldf.to_excel(writer, sheet_name='Sheet1', index=False)
#         except Exception as e:
#             print(f"An error occurred while creating the file: {e}")
#
# return 'Done'
 