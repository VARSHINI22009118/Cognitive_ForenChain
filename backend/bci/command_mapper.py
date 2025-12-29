# backend/bci/command_mapper.py

from datetime import datetime
import logging
import os

# ============================
# Logging setup
# ============================

# Ensure logs folder exists relative to this file
log_folder = os.path.join(os.path.dirname(__file__), "..", "logs")
os.makedirs(log_folder, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(log_folder, "bci_commands.log"),
    level=logging.INFO,
    format="%(asctime)s [BCI] %(message)s",
)

# ============================
# Command mapping
# ============================

def map_command(signal):
    """
    Map decoded BCI signals to system commands
    """
    if signal == "HIGH_FOCUS":
        return "TAG_SUSPICIOUS"
    elif signal == "MEDIUM_FOCUS":
        return "MARK_SAFE"
    else:
        return None

# ============================
# Process command
# ============================

def process_command(command, confidence, timestamp=None):
    """
    Process command received from BCI frontend
    - Logs the command to file
    - Prints it to console
    - (Optional) Forward to Cyber Security / Forensics modules
    """
    ts = timestamp or datetime.utcnow().isoformat()
    log_message = f"Command: {command} | Confidence: {confidence} | Timestamp: {ts}"
    
    # Print to console
    print(log_message)
    
    # Log to file
    logging.info(log_message)

    # TODO: Forward to CSP / Digital Forensics module
    # Example: call functions in security/access_control.py or forensic/evidence_manager.py
