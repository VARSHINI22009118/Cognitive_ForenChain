import hashlib

class HashGenerator:
    def generate_sha256(self, file_path: str) -> str:
        sha256 = hashlib.sha256()

        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                sha256.update(chunk)

        return sha256.hexdigest()
