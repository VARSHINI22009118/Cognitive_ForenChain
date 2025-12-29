# backend/database/db.py

import pymysql

def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="root",
        database="cognitive_forenchain",
        port=3306,
        cursorclass=pymysql.cursors.DictCursor,  # ✅ THIS FIXES dictionary=True ISSUE
        autocommit=True
    )
