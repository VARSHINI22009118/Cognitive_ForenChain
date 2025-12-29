# backend/app.py

from flask import Flask
from flask_cors import CORS
from routes import api

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(api)

if __name__ == "__main__":
    print("Starting Cognitive ForenChain Backend Server...")
    app.run(debug=True)
