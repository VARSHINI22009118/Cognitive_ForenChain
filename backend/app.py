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


from blockchain.contract_interface import blockchain_instance

@app.route("/api/blockchain/logs", methods=["GET"])
def get_blockchain_logs():
    chain = blockchain_instance.chain

    latest = chain[-1]

    return {
        "transaction": {
            "blockNumber": latest.index,
            "blockHash": latest.hash,
            "txHash": latest.hash
        },
        "logs": blockchain_instance.get_formatted_logs()
    }

from blockchain.log_ingestor import ingest_bci_logs
if __name__ == "__main__":
    print("Starting Cognitive ForenChain Backend Server...")

    ingest_bci_logs()   # 🔥 THIS IS THE KEY LINE

    app.run(debug=True)

from blockchain.log_to_blockchain import load_logs_into_blockchain

load_logs_into_blockchain()
