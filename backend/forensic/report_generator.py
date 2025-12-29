from config import REPORT_DIR
import os

def generate_report(evidence):
    if not os.path.exists(REPORT_DIR):
        os.makedirs(REPORT_DIR)

    report_path = os.path.join(REPORT_DIR, f"{evidence['file_name']}_report.txt")

    with open(report_path, "w") as report:
        report.write("FORENSIC REPORT\n")
        report.write(str(evidence))

    return report_path
