function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">
      <h4>{evidence.file_name}</h4>
      <p>Hash: {evidence.hash}</p>
      <p>Status: {evidence.status}</p>
    </div>
  );
}

export default EvidenceCard;
