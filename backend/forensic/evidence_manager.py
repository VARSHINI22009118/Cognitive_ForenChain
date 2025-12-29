from blockchain.transaction_logger import log_transaction


class EvidenceManager:
    def apply_tags(self, decision, evidence=None, analyst=None):
        tags = ["BCI_TRIGGERED"]

        if decision.get("action"):
            tags.append(decision["action"])

        if decision.get("risk"):
            tags.append(decision["risk"])

        if evidence and analyst:
            log_transaction(
                evidence=evidence,
                action="TAG_EVIDENCE",
                analyst=analyst
            )

        return tags
