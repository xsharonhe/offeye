import sqlite3
from sqlite3 import Error
from datetime import datetime

# CONSTANTS

FILE = "messages.db"
CHAT_TABLE = "Messages"
JOB_TABLE = "Jobs"
EMAIL_TABLE = "Emails"
ADMIN_EMAILS = "Admins"


class DataBase:
    """
    used to connect, write to and read from a local sqlite3 database
    """
    def __init__(self):
        """
        try to connect to file and create cursor
        """
        self.conn = None
        try:
            self.conn = sqlite3.connect(FILE)
        except Error as e:
            print("[CANNOT CONNECT TO MESSAGES DATABASE]", e)

        self.cursor = self.conn.cursor()
        self._create_table()

    def close(self):
        """
        close the db connection
        :return: None
        """
        self.conn.close()

    def _create_table(self):
        """
        create new database table if one doesn't exist
        :return: None
        """
        query = f"""CREATE TABLE IF NOT EXISTS {CHAT_TABLE}
                    (name TEXT, content_message TEXT, time Date, id INTEGER PRIMARY KEY AUTOINCREMENT)"""
        self.cursor.execute(query)
        second = f"""CREATE TABLE IF NOT EXISTS {JOB_TABLE}
                    (name TEXT, content_message TEXT, time Date, id INTEGER PRIMARY KEY AUTOINCREMENT)"""
        self.cursor.execute(second)
        email = """CREATE TABLE IF NOT EXISTS {}
                            (name TEXT, email TEXT)
                        """.format(EMAIL_TABLE)
        self.cursor.execute(email)
        email = """CREATE TABLE IF NOT EXISTS {}
                                    (name ADMIN, email TEXT)
                                """.format(ADMIN_EMAILS)
        self.cursor.execute(email)
        self.conn.commit()

    def get_all_messages(self, limit=100, name=None):
        """
        returns all messages
        :param limit: int
        :return: list[dict]
        """
        if not name:
            query = f"SELECT * FROM {CHAT_TABLE}"
            self.cursor.execute(query)
        else:
            query = f"SELECT * FROM {CHAT_TABLE} WHERE NAME = ?"
            self.cursor.execute(query, (name,))

        result = self.cursor.fetchall()

        # return messages in sorted order by date
        results = []
        for r in sorted(result, key=lambda x: x[3], reverse=True)[:limit]:
            name, content_message, date, _id = r
            data = {"name":name, "message":content_message, "time":str(date)}
            results.append(data)

        return list(reversed(results))

    def get_messages_by_name(self, name, limit=100):
        """
        Gets a list of messages by user name
        :param name: str
        :return: list
        """
        return self.get_all_messages(limit, name)

    def save_message(self, name, msg):
        """
        saves the given message in the table
        :param name: str
        :param msg: str
        :param time: datetime
        :return: None
        """
        query = f"INSERT INTO {CHAT_TABLE} VALUES (?, ?, ?, ?)"
        self.cursor.execute(query, (name, msg, datetime.now(), None))
        self.conn.commit()
        
    def robo_messages(self, limit=100, name=None):
        """
        returns all ROBOT messages
        :param limit: int
        :return: list[dict]
        """
        if not name:
            query = f"SELECT * FROM {JOB_TABLE}"
            self.cursor.execute(query)
        else:
            query = f"SELECT * FROM {JOB_TABLE} WHERE NAME = ?"
            self.cursor.execute(query, (name,))

        result = self.cursor.fetchall()

        #SORT BY DATE
        results = []
        for r in sorted(result, key=lambda x: x[3], reverse=True)[:limit]:
            name, content_message, date, _id = r
            data = {"name": name, "message": content_message, "time": str(date)}
            results.append(data)

        return list(reversed(results))


    def save_email(self, name, email):
        query = "INSERT INTO {} VALUES (?, ?)".format(EMAIL_TABLE)
        self.cursor.execute(query, (name, email))
        self.conn.commit()