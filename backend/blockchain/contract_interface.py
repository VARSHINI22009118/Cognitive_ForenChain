def call_contract(evidence_hash, action, analyst_id):
    return {
        "tx_hash": f"0x{hash(evidence_hash + action + str(analyst_id)) & 0xffffffff:x}"
    }
