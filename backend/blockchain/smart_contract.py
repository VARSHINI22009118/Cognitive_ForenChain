class SmartContract:
    ALLOWED_ACTIONS = {
        "COLLECT_EVIDENCE",
        "TAG_EVIDENCE",
        "MARK_ANOMALY",
        "GENERATE_REPORT"
    }

    @staticmethod
    def validate_transaction(evidence_hash, action, analyst):
        if not evidence_hash:
            raise ValueError("Evidence hash missing")

        if action not in SmartContract.ALLOWED_ACTIONS:
            raise ValueError("Action not permitted by smart contract")

        if not analyst or "id" not in analyst:
            raise ValueError("Invalid analyst identity")

        return True
