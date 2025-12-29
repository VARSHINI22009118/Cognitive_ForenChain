import re
from blockchain.contract_interface import call_contract

BCI_LOG_PATH = "logs/bci_commands.log"

def ingest_bci_logs():
    """
    Reads bci_commands.log and converts each command into a blockchain block.
    """
    with open(BCI_LOG_PATH, "r", encoding="utf-8") as file:
        lines = file.readlines()

    for line in lines:
        if "Command:" not in line:
            continue

        # Example line:
        # Command: COLLECT_EVIDENCE | Confidence: 0.6 | Timestamp: 2025-12-28T16:07:35.665Z
        try:
            command_match = re.search(r"Command:\s(\w+)", line)
            confidence_match = re.search(r"Confidence:\s([\d.]+)", line)

            if not command_match:
                continue

            action = command_match.group(1)
            confidence = float(confidence_match.group(1)) if confidence_match else 0.0

            # Simulated evidence hash
            evidence_hash = f"EV-{hash(line) % 100000}"

            analyst = {
                "id": "BCI_SYSTEM",
                "name": "BCI Module"
            }

            call_contract(evidence_hash, action, analyst)

        except Exception as e:
            print("Skipping invalid log line:", e)
