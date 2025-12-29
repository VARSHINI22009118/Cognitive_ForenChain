class Evidence:
    def __init__(self, name, hash, status):
        self.name = name
        self.hash = hash
        self.status = status


class BlockchainLog:
    def __init__(self, block_index, block_hash, action, analyst_id):
        self.block_index = block_index
        self.block_hash = block_hash
        self.action = action
        self.analyst_id = analyst_id
