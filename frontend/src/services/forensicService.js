let evidence = [
  {
    file_name: "sample.txt",
    hash: "abc123",
    status: "COLLECTED",
  },
];

export function getEvidenceList() {
  return evidence;
}

export function updateEvidence(action) {
  if (action === "TAG_SUSPICIOUS") {
    evidence[0].status = "SUSPICIOUS";
  }
  if (action === "MARK_SAFE") {
    evidence[0].status = "SAFE";
  }
  return evidence;
}
