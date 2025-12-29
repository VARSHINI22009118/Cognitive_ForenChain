from blockchain.blockchain import Blockchain
from blockchain.smart_contract import SmartContract

blockchain_instance = Blockchain()


def call_contract(evidence_hash, action, analyst):
    SmartContract.validate_transaction(evidence_hash, action, analyst)

    block_data = {
        "evidence_hash": evidence_hash,
        "action": action,
        "analyst_id": analyst["id"],
        "analyst_name": analyst.get("name"),
    }

    block = blockchain_instance.add_block(block_data)

    return {
        "tx_hash": block.hash,
        "block_index": block.index
    }
