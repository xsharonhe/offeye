from flask import Blueprint
from flask import Flask, render_template, url_for, redirect, request, session, jsonify, flash, Blueprint
from .database import DataBase

view = Blueprint("views", __name__)

# GLOBAL CONSTANTS
NAME_KEY = 'name'

# GLOBAL VARS
client = None
MSG_LIMIT = 20


@view.route("/")
@view.route("/login", methods=['GET', 'POST'])
def login():
    """
    displays main login page and handles saving name in session
    :exception POST
    :return: None
    """

    if request.method == "POST":  # if user input a name
        name = request.form["inputName"]
        email = request.form["email"]
        schoolOptions = request.form["schoolOptions"]
        db = DataBase()
        db.save_email(name, email, )
        if len(name) >= 1:
            session[NAME_KEY] = name
            flash('You were successfully logged in as {}.'.format(name))
            if schoolOptions == '1':
                return redirect(url_for("views.highschool_chat"))
            if schoolOptions == '2':
                return redirect(url_for("views.undergraduate_chat"))
            if schoolOptions == '3':
                return redirect(url_for("views.graduate_chat"))
            else:
                return redirect(url_for("views.chat"))
        else:
            flash("1Name must be longer than 1 character.")

    return render_template("login.html", **{"session": "session"})


@view.route("/logout")
def logout():
    """
    logs the user out by popping name from session
    :return: None
    """
    session.pop(NAME_KEY, None)
    flash("You were logged out.")
    return redirect(url_for("views.login"))


@view.route("/chat")
def chat():
    """
    displays home page if logged in
    :return: None
    """
    if NAME_KEY not in session:
        return redirect(url_for("views.login"))

    return render_template("chat.html", **{"session": session})


@view.route("/jobfinder")
def job_finder():
    """
    displays home page if logged in
    :return: None
     """
    if NAME_KEY not in session:
        return redirect(url_for("views.login"))

    return render_template("jobfinder.html", **{"session": session})


@view.route("/history")
def history():
    if NAME_KEY not in session:
        flash("0Please login before viewing message history")
        return redirect(url_for("views.login"))
    
    json_messages = get_history(session[NAME_KEY])
    return render_template("history.html", **{"history":json_messages})


@view.route('/admin')
def admin_form():
    return render_template("admin.html", **{"session": session})


#REDIRECTION
@view.route("/chat/highschool")
def highschool_chat():
    """
    HIGH SCHOOL CHAT ROOM
    :param None
    """
    return render_template("highschool.html", **{"session": "session"})

@view.route("/chat/undergraduate")
def undergraduate_chat():
    """
    UNDERGRADUATE CHAT ROOM
    :param None
    """
    return render_template("undergraduate.html", **{"session": "session"})


@view.route("/chat/graduate")
def graduate_chat():
    """
    GRADUATE CHAT ROOM
    :param None
    """
    return render_template("graduate.html", **{"session": "session"})

# API ENDPOINTS
@view.route("/get_name")
def get_name():
    data = {"name": ""}
    if NAME_KEY in session:
        data = {"name": session[NAME_KEY]}
    return jsonify(data)


@view.route("/get_messages")
def get_messages():
    db = DataBase()
    msgs = db.get_all_messages(MSG_LIMIT)
    return jsonify(msgs)


@view.route("/get_history")
def get_history(name):
    """
    :param name: str
    :return: all messages by name of user
    """
    db = DataBase()
    msgs = db.get_messages_by_name(name)
    messages = remove_seconds_from_messages(msgs)

    return messages


@view.route('/clean')
def robo():
    db = DataBase()
    msgs = db.robo_messages(MSG_LIMIT)
    messages = remove_seconds_from_messages(msgs)

    return jsonify(messages)


# UTILITIES
def remove_seconds_from_messages(msgs):
    """
    removes the seconds from all messages
    :param msgs: list
    :return: list
    """
    messages = []
    for msg in msgs:
        message = msg
        message["time"] = remove_seconds(message["time"])
        messages.append(message)

    return messages


def remove_seconds(msg):
    """
    :return: string with seconds trimmed off
    """
    return msg.split(".")[0][:-3]

