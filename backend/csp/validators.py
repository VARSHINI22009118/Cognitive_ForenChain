# backend/csp/validators.py

def validate_csp_payload(data):
    required = ["command", "confidence", "timestamp"]

    for field in required:
        if field not in data:
            return False, f"Missing field: {field}"

    if not isinstance(data["confidence"], (int, float)):
        return False, "Confidence must be numeric"

    return True, "Valid payload"
