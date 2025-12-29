# backend/forensic/evidence_manager.py

from datetime import datetime

def handle_forensic_action(action, metadata):
    return {
        "action": action,
        "status": "completed",
        "executed_at": datetime.utcnow().isoformat(),
        "metadata": metadata
    }
