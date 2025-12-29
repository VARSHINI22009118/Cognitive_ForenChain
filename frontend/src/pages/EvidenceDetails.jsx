function EvidenceDetails({ evidence }) {
  return (
    <div>
      <h3>Evidence Details</h3>
      <p>{evidence.file_name}</p>
      <p>{evidence.hash}</p>
      <p>{evidence.status}</p>
    </div>
  );
}

export default EvidenceDetails;
