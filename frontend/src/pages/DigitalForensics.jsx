import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../styles/forensic.css";

export default function DigitalForensics() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const decision = state?.decision;

  const [timeline, setTimeline] = useState([]);
  const [hash, setHash] = useState("");
  const [caseId, setCaseId] = useState("");
  const [tags, setTags] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    if (!decision) return;

    const now = () => new Date().toLocaleTimeString();

    setTimeline([
      `[${now()}] Evidence acquired`,
      `[${now()}] Hash generated (SHA-256)`,
      `[${now()}] Automated malware scan completed`,
      `[${now()}] Timeline reconstructed`,
      `[${now()}] Cognitive anomaly detected`,
      `[${now()}] Forensic report generated`,
    ]);

    setHash("e3b0c44298fc1c149afbf4c8996fb924...");
    setCaseId(`CF-${Math.floor(Math.random() * 100000)}`);
    setTags(["BCI_TRIGGERED", "MALWARE", "SUSPICIOUS"]);
    setReportGenerated(true);
  }, [decision]);

  if (!decision) {
    return (
      <div className="forensic-empty">
        <h2>No forensic analysis initiated</h2>
        <p>Waiting for CSP-approved evidence.</p>
      </div>
    );
  }

  return (
    <div className="forensic-page" ref={pdfRef}>
      {/* HEADER */}
      <div className="forensic-top">
        <h1>Digital Forensics Analysis Output</h1>
      </div>

      {/* MAIN GRID */}
      <div className="forensic-grid">
        {/* LEFT PANEL */}
        <div className="forensic-left">
          <div className="forensic-card">
            <h3>Evidence File</h3>
            <p className="file-name">malware_sample.exe</p>
            <p className="hash">Hash (SHA-256): {hash}</p>

            <div className="alert danger">
              ⚠ MALWARE DETECTED
            </div>
          </div>

          <div className="forensic-card">
            <h3>Evidence Result</h3>
            <p className="result">Evidence Tagged as Suspicious</p>

            <div className="status-indicator">
              <span className="circle normal" />
              <span>Normal</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="forensic-right">
          <div className="forensic-card wide">
            <h3>File Details & Analysis Summary</h3>

            <table className="analysis-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>File Type</td>
                  <td>Executable</td>
                  <td>1.2 MB</td>
                </tr>
                <tr>
                  <td>Modified</td>
                  <td>2023-10-26</td>
                  <td>Suspicious timestamp</td>
                </tr>
                <tr>
                  <td>IOCs</td>
                  <td>5 Found</td>
                  <td>Known malware signatures</td>
                </tr>
              </tbody>
            </table>

            <p className="analysis-text">
              Automated scan identified known malware signatures. Based on
              BCI-driven commands, the evidence was tagged for isolation and
              further investigation.
            </p>

            <div className="forensic-actions">
              {/* ❌ Download button removed */}
              <button onClick={() => navigate("/blockchain")}>
                View Blockchain Proof
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="forensic-card timeline spaced-section">
        <h3>Real-Time Activity Log</h3>
        <ul>
          {timeline.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* TAGS */}
      <div className="forensic-card tags spaced-section">
        <h3>Tags & Annotations</h3>
        <div className="tag-list">
          {tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <footer className="forensic-footer">
        Version 1.0 © Cognitive ForenChain
      </footer>
    </div>
  );
}
