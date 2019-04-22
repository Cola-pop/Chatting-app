from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dnuif32nbd#$'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app, debug=True)

@app.route('/')
def sessions():
    return render_template('index.html')

def messageReceived(methods=['GET', 'POST']):
    print('Message Received')

@socketio.on('my event')
def handle_my_event(json, methods=['GET', 'POST']):
    print('Received my event: ' + str(json))
    socketio.emit('My Response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)
