from blockchain.blockchain import Blockchain

blockchain_instance = Blockchain()

def load_logs_into_blockchain():
    with open("logs/bci_command.log", "r") as f:
        for line in f:
            blockchain_instance.add_block({
                "evidence_hash": "AUTO_HASH",
                "action": line.strip(),
                "analyst_name": "BCI Module"
            })
