import os
import shutil
from forensic.hash_generator import generate_hash
from config import EVIDENCE_DIR

def collect_evidence(file_path):
    if not os.path.exists(EVIDENCE_DIR):
        os.makedirs(EVIDENCE_DIR)

    file_name = os.path.basename(file_path)
    stored_path = os.path.join(EVIDENCE_DIR, file_name)

    shutil.copy(file_path, stored_path)

    evidence = {
        "file_name": file_name,
        "file_path": stored_path,
        "hash": generate_hash(stored_path),
        "status": "COLLECTED"
    }

    return evidence
