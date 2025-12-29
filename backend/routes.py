# backend/routes.py
import time

from flask import Blueprint, request, jsonify

# AUTH & BCI
from security.auth import register_user, authenticate_user
from bci.command_mapper import process_command

# CSP
from csp.decision_engine import decide_action
from csp.validators import validate_csp_payload
from csp.logger import log_csp_event

# FORENSIC (NEW)
from forensic.evidence_manager import EvidenceManager


api = Blueprint("api", __name__)

# =========================
# REGISTER
# =========================
@api.route("/api/register", methods=["POST"])
def register():
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request"}), 400

    success = register_user(
        data.get("full_name"),
        data.get("username"),
        data.get("password")
    )

    if success:
        return jsonify({"message": "Registration successful"}), 201
    return jsonify({"message": "User already exists"}), 409


# =========================
# LOGIN
# =========================
@api.route("/api/login", methods=["POST"])
def login():
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request"}), 400

    user = authenticate_user(
        data.get("username"),
        data.get("password")
    )

    if user:
        return jsonify({"status": "success", "user": user}), 200
    return jsonify({"status": "failed"}), 401


# =========================
# BCI COMMAND (UNCHANGED)
# =========================
@api.route("/api/bci-command", methods=["POST"])
def bci_command():
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request"}), 400

    process_command(
        data.get("command"),
        data.get("confidence"),
        data.get("timestamp")
    )

    return jsonify({"status": "success"}), 200


# =========================
# CSP COMMAND (UPDATED)
# =========================
@api.route("/api/csp/command", methods=["POST"])
def csp_command():
    data = request.json
    is_valid, message = validate_csp_payload(data)
    if not is_valid:
        return jsonify({"status": "error", "message": message}), 400

    command = data["command"]
    confidence = data["confidence"]
    timestamp = data["timestamp"]

    decision = decide_action(command, confidence)

    log_csp_event({
        "command": command,
        "confidence": confidence,
        "decision": decision,
        "timestamp": timestamp
    })

    return jsonify({
        "status": "processed",
        "command": command,
        "decision": decision
    }), 200


# =========================
# BLOCKCHAIN LOGS (READ-ONLY)
# =========================
from blockchain.contract_interface import blockchain_instance

@api.route("/api/blockchain/logs", methods=["GET"])
def get_blockchain_logs():
    chain = blockchain_instance.chain

    logs = []
    for block in chain[1:]:  # skip genesis
        data = block.data or {}
        logs.append({
            "time": time.strftime("%H:%M:%S", time.localtime(block.timestamp)),
            "property": data.get("action", "N/A"),
            "action": "RECORDED",
            "notes": data.get("evidence_hash", "—"),
            "highlight": True
        })

    latest_block = chain[-1]

    return jsonify({
        "transaction": {
            "blockNumber": latest_block.index,
            "blockHash": latest_block.hash,
            "txHash": latest_block.hash
        },
        "logs": logs
    }), 200
