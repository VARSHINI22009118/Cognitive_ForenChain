# backend/blockchain/blockchain.py

from blockchain.block import Block
import time


class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        """
        Creates the first (genesis) block of the blockchain.
        """
        return Block(0, time.time(), {"info": "Genesis Block"}, "0")

    def get_latest_block(self):
        """
        Returns the most recent block in the chain.
        """
        return self.chain[-1]

    def add_block(self, data):
        """
        Adds a new block containing forensic / BCI / CSP data.
        """
        latest_block = self.get_latest_block()

        new_block = Block(
            index=len(self.chain),
            timestamp=time.time(),
            data=data,
            previous_hash=latest_block.hash
        )

        self.chain.append(new_block)
        return new_block

    def get_formatted_logs(self):
        """
        Converts blockchain blocks into UI-friendly forensic log entries.
        """
        logs = []

        for block in self.chain:
            # Skip genesis block
            if block.index == 0:
                continue

            ts = time.strftime('%H:%M:%S', time.localtime(block.timestamp))
            data = block.data or {}

            logs.extend([
                {
                    "time": ts,
                    "property": "Evidence Hash",
                    "action": "Recorded",
                    "notes": data.get("evidence_hash", "")
                },
                {
                    "time": ts,
                    "property": "Action",
                    "action": data.get("action", ""),
                    "notes": "Executed"
                },
                {
                    "time": ts,
                    "property": "Analyst",
                    "action": "Verified",
                    "notes": data.get("analyst_name", "N/A"),
                    "highlight": True
                }
            ])

        return logs
