import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/analysis.css";

export default function Analysis() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or Word document.");
      return;
    }

    setFile(selectedFile);
    // Redirect to BCI module after upload
    navigate("/bci", { state: { uploadedFile: selectedFile.name } });
  };

  return (
    <div className="analysis-root">
      <h1 className="title">Cognitive ForenChain</h1>

      {/* First row: BCI + Cyber Security */}
      <div className="modules-row">
        <div className="module-card">
          <h2>1️⃣ BCI Module</h2>
          <p>
            Captures EEG brain signals, converts cognitive patterns into system
            actions, and triggers forensic operations without physical input.
          </p>
          <p><strong>Why:</strong> Reduce manual effort, eliminate delay, faster interaction.</p>
        </div>

        <div className="module-card">
          <h2>2️⃣ Cyber Security Platform</h2>
          <p>
            Runs analysis, detects suspicious activity, communicates with BCI,
            shows real-time feedback, manages evidence flow.
          </p>
          <p><strong>Why:</strong> Coordinates modules, executes BCI actions, automated cybersecurity.</p>
        </div>
      </div>

      {/* Second row: Digital Forensics + Blockchain */}
      <div className="modules-row">
        <div className="module-card">
          <h2>3️⃣ Digital Forensics Module</h2>
          <p>
            Acquires evidence, tags & annotates files, reconstructs timelines,
            performs anomaly detection, prepares forensic reports.
          </p>
          <p><strong>Why:</strong> Automates evidence handling, reduces error, ensures accurate analysis.</p>
        </div>

        <div className="module-card">
          <h2>4️⃣ Blockchain + Smart Contract</h2>
          <p>
            Stores every forensic action as a blockchain transaction, maintains
            immutable logs, uses smart contracts for access, provides verifiable chain of custody.
          </p>
          <p><strong>Why:</strong> Prevents manipulation, ensures transparency, secures workflows.</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <h2>Upload Document (.pdf or .doc)</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
        />
        {file && <p>Uploaded: {file}</p>}
      </div>
    </div>
  );
}
