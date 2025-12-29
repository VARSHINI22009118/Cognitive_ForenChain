# backend/csp/decision_engine.py

def decide_action(command, confidence):
    """
    CSP Decision Engine
    -------------------
    Returns the action CSP decides to take
    based on command + confidence
    """

    if command == "COLLECT_EVIDENCE" and confidence >= 0.6:
        return {
            "action": "COLLECT",
            "risk": "LOW",
            "message": "Evidence collection approved"
        }

    if command == "TAG_EVIDENCE" and confidence >= 0.5:
        return {
            "action": "TAG",
            "risk": "LOW",
            "message": "Evidence tagging approved"
        }

    if command == "MARK_ANOMALY" and confidence >= 0.7:
        return {
            "action": "FLAG",
            "risk": "MEDIUM",
            "message": "Anomaly flagged for review"
        }

    return {
        "action": "NO_ACTION",
        "risk": "NONE",
        "message": "Confidence too low – no action taken"
    }
