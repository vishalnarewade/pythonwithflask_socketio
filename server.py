
from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit
# import PIL.Image as Image
import base64
# import io

app = Flask(__name__, static_folder='template/assets', template_folder='template')
adminUser = ''

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@socketio.on('connection')
def test_connection(data):
    print("socket connected " + str(data))
    if str(data) == 'admin':
        adminUser = request.sid
        # print(adminUser)

@socketio.on('send')
def test_send(data):
    imgdata = base64.b64decode(data['photo'].split(',')[1])
    path = 'template'
    filename = 'assets/images/upload/' + data['name'] +'-'+ data['time'] +'.png'
    with open(path + '/' + filename, 'wb') as f:
            f.write(imgdata)
            f.close()
    data['photo'] = filename
    emit('receive', data, room = adminUser)
    # print("data received " + str(data))
    
# If you are running it using python <filename> then below command will be used
if __name__ == '__main__':
    socketio.run(app)