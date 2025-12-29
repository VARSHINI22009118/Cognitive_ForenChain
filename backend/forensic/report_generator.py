import json
import uuid
import time
from blockchain.transaction_logger import log_transaction


class ReportGenerator:
    def generate(self, evidence, hash_value, tags, timeline, analyst=None):
        report = {
            "case_id": f"CF-{uuid.uuid4().hex[:8]}",
            "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "evidence": evidence,
            "hash": hash_value,
            "tags": tags,
            "timeline": timeline,
            "status": "GENERATED"
        }

        if analyst:
            log_transaction(
                evidence={"hash": hash_value},
                action="GENERATE_REPORT",
                analyst=analyst
            )

        return report

    def export_json(self, report, output_path="forensic_report.json"):
        with open(output_path, "w") as f:
            json.dump(report, f, indent=2)
