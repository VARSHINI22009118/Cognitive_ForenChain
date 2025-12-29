# backend/csp/logger.py

import os
import json
from datetime import datetime

LOG_DIR = "bc/logs"
LOG_FILE = os.path.join(LOG_DIR, "csp_decisions.log")

os.makedirs(LOG_DIR, exist_ok=True)

def log_csp_event(event):
    event["logged_at"] = datetime.utcnow().isoformat()

    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(event) + "\n")
