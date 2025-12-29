from blockchain.contract_interface import call_contract


def log_transaction(evidence, action, analyst):
    tx = call_contract(evidence["hash"], action, analyst)

    print("\n🔐 BLOCKCHAIN TRANSACTION RECORDED")
    print(f"Evidence Hash : {evidence['hash']}")
    print(f"Action        : {action}")
    print(f"Analyst       : {analyst['name']}")
    print(f"Block Index   : {tx['block_index']}")
    print(f"Block Hash    : {tx['tx_hash']}")
