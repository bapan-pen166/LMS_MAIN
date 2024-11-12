from flask import Flask
from flask_cors import CORS
from api.attendance_feedback import attend_feed

from api.user import user
from api.studentRegistration import reg

from api.student import student
from api.dashboard import dashboard
from api.mentor import mentor
from api.course import course
from api.video_call import video_call
from flask_socketio import SocketIO, emit, join_room
from api.placementDrive import placementDrive
from api.certificate import cert
from api.crmUpdate import crm
from api.portfolio import portfolio



app = Flask(__name__)

cors = CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'BABJOIERM TUalsndc kgfk mf g'

socketio = SocketIO(app)
users_in_room = {}
rooms_sid = {}
names_sid = {}

app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(reg, url_prefix="/reg")
app.register_blueprint(student, url_prefix="/student")
app.register_blueprint(dashboard, url_prefix="/dashboard")
app.register_blueprint(mentor, url_prefix="/mentor")
app.register_blueprint(course, url_prefix="/course")

app.register_blueprint(video_call, url_prefix="/video-call")  # rishabh
app.register_blueprint(attend_feed, url_prefix="/attendance-feed")
app.register_blueprint(placementDrive, url_prefix="/placementDrive")
app.register_blueprint(cert, url_prefix="/cert")
app.register_blueprint(crm, url_prefix="/crm")
app.register_blueprint(portfolio, url_prefix="/portfolio")

# app.register_blueprint(tracker, url_prefix="/tracker")

# rishabh
# @socketio.on("connect")
# def on_connect():
#     sid = request.sid
#     print("New socket connected ", sid)


# @socketio.on("join-room")
# def on_join_room(data):
#     sid = request.sid
#     room_id = data["room_id"]
#     display_name = session[room_id]["name"]

#     # register sid to the room
#     join_room(room_id)
#     rooms_sid[sid] = room_id
#     names_sid[sid] = display_name

#     # broadcast to others in the room
#     print("[{}] New member joined: {}<{}>".format(room_id, display_name, sid))
#     emit("user-connect", {"sid": sid, "name": display_name},
#          broadcast=True, include_self=False, room=room_id)

#     # add to user list maintained on server
#     if room_id not in users_in_room:
#         users_in_room[room_id] = [sid]
#         emit("user-list", {"my_id": sid})  # send own id only
#     else:
#         usrlist = {u_id: names_sid[u_id]
#                    for u_id in users_in_room[room_id]}
#         # send list of existing users to the new member
#         emit("user-list", {"list": usrlist, "my_id": sid})
#         # add new member to user list maintained on server
#         users_in_room[room_id].append(sid)

#     print("\nusers: ", users_in_room, "\n")


# @socketio.on("disconnect")
# def on_disconnect():
#     sid = request.sid
#     room_id = rooms_sid[sid]
#     display_name = names_sid[sid]

#     print("[{}] Member left: {}<{}>".format(room_id, display_name, sid))
#     emit("user-disconnect", {"sid": sid},
#          broadcast=True, include_self=False, room=room_id)

#     users_in_room[room_id].remove(sid)
#     if len(users_in_room[room_id]) == 0:
#         users_in_room.pop(room_id)

#     rooms_sid.pop(sid)
#     names_sid.pop(sid)

#     print("\nusers: ", users_in_room, "\n")


# @socketio.on("data")
# def on_data(data):
#     sender_sid = data['sender_id']
#     target_sid = data['target_id']
#     if sender_sid != request.sid:
#         print("[Not supposed to happen!] request.sid and sender_id don't match!!!")

#     if data["type"] != "new-ice-candidate":
#         print('{} message from {} to {}'.format(
#             data["type"], sender_sid, target_sid))
#     socketio.emit('data', data, room=target_sid)



# for local

@app.route('/hc', methods=['GET'])
def hc():
    return {"success": True}


if __name__ == '__main__':
     app.run(host="0.0.0.0", port=5050, debug=True,)



# for AWS

# @app.route('/api/hc', methods=['GET'])
# def hc():
#     return {"success": True}


# if __name__ == '__main__':
#     # app.run(host="0.0.0.0", port=5050, debug=True,)
#      app.run(host="0.0.0.0", port=5050, debug=True, ssl_context=('/etc/letsencrypt/live/lms.technostructacademy.com/certificate_lms.pem',
#      '/etc/letsencrypt/live/lms.technostructacademy.com/key_lms.pem'))
 