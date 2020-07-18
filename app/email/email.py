from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    # EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='hx660359@gnspes.ca',
    MAIL_PASSWORD='hx$20151111'
)

mail = Mail(app)

def send_mail():
    try:
        msg = Message("Hello",
                      sender="hx660359@gnspes.ca",
                      recipients=["emma.xiaotong@gmail.com"])
        msg.body = "This is the message body"
        mail.send(msg)
        return 'Mail sent!'
    except Exception as e:
        return (str(e))
