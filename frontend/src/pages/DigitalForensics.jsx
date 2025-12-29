import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/forensic.css";

export default function DigitalForensics() {
  const { state } = useLocation();

  const [status, setStatus] = useState("IDLE");
  const [timeline, setTimeline] = useState([]);
  const [hash, setHash] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!state) return;

    setStatus("PROCESSING");

    const now = () => new Date().toLocaleTimeString();

    setTimeline([
      `[${now()}] Evidence acquired`,
      `[${now()}] Hash generated`,
      `[${now()}] Evidence tagged`,
      `[${now()}] Timeline reconstructed`,
      `[${now()}] Cognitive anomaly marked`,
      `[${now()}] Forensic report generated`
    ]);

    setHash("02f3a9c8e8d4c91e5e7d0c4b8f1a7b9e");
    setTags(["SUSPICIOUS", "BCI_TRIGGERED"]);

    setTimeout(() => {
      setStatus("COMPLETED");
    }, 1500);
  }, [state]);

  /* IDLE STATE — IMAGE 1 */
  if (!state) {
    return (
      <div className="forensic-idle">
        <h2>No forensic task initiated</h2>
        <p>Awaiting approved action from CSP.</p>
      </div>
    );
  }

  /* ACTIVE FORENSIC DASHBOARD — IMAGE 2 */
  return (
    <div className="forensic-root">
      <header className="forensic-header">
        <h1>Forensic Investigation Report</h1>
        <span className={`report-status ${status.toLowerCase()}`}>
          {status === "COMPLETED" ? "Generated Successfully" : "Processing"}
        </span>
      </header>

      <div className="forensic-grid">
        {/* LEFT PANEL */}
        <div className="forensic-card">
          <h3>Case Summary</h3>
          <p><b>Command:</b> {state.command}</p>
          <p><b>Action:</b> {state.decision.action}</p>
          <p><b>Risk Level:</b> {state.decision.risk}</p>
        </div>

        {/* CENTER PANEL */}
        <div className="forensic-card">
          <h3>Evidence Summary</h3>
          <p><b>File:</b> malware_sample.exe</p>
          <p><b>Hash:</b> {hash}</p>
          <p><b>Integrity:</b> <span className="verified">VERIFIED</span></p>
        </div>

        {/* RIGHT PANEL */}
        <div className="forensic-card">
          <h3>Tags & Annotations</h3>
          <ul>
            {tags.map((tag, i) => (
              <li key={i} className="tag">{tag}</li>
            ))}
          </ul>
        </div>

        {/* ACTIVITY LOG */}
        <div className="forensic-card logs">
          <h3>Forensic Activity Log</h3>
          <ul>
            {timeline.map((event, i) => (
              <li key={i}>{event}</li>
            ))}
          </ul>
        </div>

        {/* REPORT ACTION */}
        <div className="forensic-card action">
          <button className="download-btn">Download Report (PDF)</button>
          <button className="print-btn">Print</button>
        </div>
      </div>
    </div>
  );
}
