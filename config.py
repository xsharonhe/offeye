from os import environ

class Config:
    """
    REFER TO .ENV FILES
    """
    TESTING = environ.get('TESTING')
    FLASK_DEBUG = environ.get('FLASK_DEBUG')
    SECRET_KEY = environ.get('SECRET_KEY')
    SERVER = environ.get('SERVER')