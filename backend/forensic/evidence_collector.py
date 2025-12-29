import os
import time

class EvidenceCollector:
    def acquire(self, file_path: str) -> dict:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Evidence not found: {file_path}")

        stats = os.stat(file_path)

        return {
            "file_path": file_path,
            "file_name": os.path.basename(file_path),
            "size_bytes": stats.st_size,
            "acquired_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        }
