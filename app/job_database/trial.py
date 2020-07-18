import sqlite3
from sqlite3 import Error
from datetime import datetime
import time

FILE = "job_database.db"
JOBS_TABLE = "JOBS"

class JobDatabase:
    def __init__(self):
        """
        try to connect to file and create cursor
        """
        self.conn = None
        try:
            self.conn = sqlite3.connect(FILE)
        except Error as e:
            print("[CANNOT CONNECT TO JOBS DATABASE]", e)

        self.cursor = self.conn.cursor()
        self._create_table()
        
    
    def close(self):
        self.conn.close()
        
    
    def _create_table(self):
        """
        create new database table if one doesn't exist
        :return: None
        """
        count = 0
        if count == 0:
            query = f"""CREATE TABLE IF NOT EXISTS {JOB_TABLE}
                        (tag TEXT, job_title TEXT, email TEXT, phone_number TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)"""
            count = count = 1
            self.cursor.execute(query)
            
            insert_query = f"""INSERT INTO {JOB_TABLE} """
        
        self.conn.commit()
        
        