import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_DIR = os.path.join(BASE_DIR, "../data")
EVIDENCE_DIR = os.path.join(DATA_DIR, "evidence_uploads")
REPORT_DIR = os.path.join(DATA_DIR, "reports")

SECRET_KEY = "cognitive-foren-chain-secret"

FOCUS_THRESHOLD_SUSPICIOUS = 80
FOCUS_THRESHOLD_SAFE = 50
