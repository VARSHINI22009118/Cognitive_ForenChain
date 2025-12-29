# backend/security/auth.py

from werkzeug.security import generate_password_hash, check_password_hash
from database.db import get_db


def register_user(full_name, username, password):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM analysts WHERE username=%s",
        (username,)
    )
    if cursor.fetchone():
        return False

    hashed_password = generate_password_hash(password)

    cursor.execute(
        """
        INSERT INTO analysts (full_name, username, password_hash)
        VALUES (%s, %s, %s)
        """,
        (full_name, username, hashed_password)
    )

    return True


def authenticate_user(username, password):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id, full_name, username, password_hash FROM analysts WHERE username=%s",
        (username,)
    )

    user = cursor.fetchone()

    if user and check_password_hash(user["password_hash"], password):
        return {
            "id": user["id"],
            "full_name": user["full_name"],
            "username": user["username"]
        }

    return None
