from flask import session
from flask_socketio import SocketIO
from app import create_app
from app.database import DataBase

# SETUP
app = create_app()
socketio = SocketIO(app)  # used for user communication


# COMMUNICATION FUNCTIONS


@socketio.on('event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    """
    handles saving messages once received from web server
    and sending message to other clients
    :param json: json
    :param methods: POST GET
    :return: None
    """
    data = dict(json)
    if "name" in data:
        db = DataBase()
        db.save_message(data["name"], data["message"])

    socketio.emit('message response', json)



if __name__ == "__main__":  # start the web server 
    app.secret_key = 'super secret key'
    socketio.run(app, debug=True, host='0.0.0.0')
    
    