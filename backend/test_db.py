from database.db import get_db

print("START")

db = get_db()
print("CONNECTED")

cursor = db.cursor()
cursor.execute("SELECT DATABASE()")
print("DB:", cursor.fetchone())

cursor.close()
db.close()

print("DONE")
