from flask import Flask, render_template, Response, request
import cv2

app = Flask(__name__)
camera = None
video_on = False

def start_video_feed():
    global camera, video_on
    resp=None
    if camera is None:
        camera = cv2.VideoCapture(0 + cv2.CAP_DSHOW)
        print('started video feed', camera)
        print("camera.isOpened()",camera.isOpened())
        if not camera.isOpened():
            camera = cv2.VideoCapture(0+ cv2.CAP_V4L2)  # V4L2 (Linux)
        print("camera.isOpened()",camera.isOpened())
        
        if not camera.isOpened():
            camera = cv2.VideoCapture(0+ cv2.CAP_QT)
            print("Error: Unable to open video capture.")
            camera.release()  # Release camera resources
            camera = None
        else:
            video_on = True
            print("Video feed started.")
            print('started video feed', camera)
            resp=generate_frame()
            print('response of generate frame function',resp)

    else:
        print("Video feed already started.")
        resp=generate_frame()
    return resp


def stop_video_feed():
    global camera, video_on
    if camera is not None:
        camera.release()  # Release camera resources
        camera = None
        video_on = False
        print("Video feed stopped.")

def generate_frame():
    global camera, video_on
    print("generate frame started",camera,video_on)
    while video_on:
        success, frame = camera.read()
        print(success)
        if not success:
            print("Error: Failed to capture frame.")
            break

        # Encode frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            print("Error: Failed to encode frame as JPEG.")
            break

        # Convert JPEG buffer to bytes
        frame_bytes = buffer.tobytes()
        # print("frame_bytes",frame_bytes)
        
        # Yield frame in HTTP response format
        return (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

"""@app.route('/')
def index():
    return render_template('index_.html')

@app.route('/video_feed')
def video_feed():
    start_video_feed()
    return Response(generate_frame(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop_video')
def stop_video():
    stop_video_feed()
    return 'Video feed stopped.'


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)"""
