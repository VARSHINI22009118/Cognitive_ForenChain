import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/cybersecurity.css";

export default function CyberSecurity() {
  const location = useLocation();
  const navigate = useNavigate();
  const payload = location.state;

  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Idle");
  const [alert, setAlert] = useState("Normal");

  useEffect(() => {
    if (!payload) return;

    const now = new Date().toLocaleTimeString();

    setStatus("Processing");
    setLogs([
      `[${now}] CSP: Received command "${payload.command}"`,
      `[${now}] CSP: Validating command`,
      `[${now}] CSP: Executing security logic`,
      `[${now}] CSP: Awaiting downstream modules`,
      `[${now}] CSP: Alert level Normal`
    ]);

    setTimeout(() => {
      setStatus("Completed");
      setAlert("Normal");
    }, 2000);
  }, [payload]);

  return (
    <div className="csp-root">
      <header className="csp-header">
        <h1>Cyber Security Platform</h1>
        <p>Decision & Orchestration Layer</p>
      </header>

      <div className="csp-grid">
        <div className="csp-left">
          <div className="csp-card">
            <h3>Incoming Command</h3>
            <div className="command-box">{payload?.command || "—"}</div>
          </div>

          <div className="csp-card">
            <h3>Processing Status</h3>
            <div className={`status ${status.toLowerCase()}`}>{status}</div>
          </div>

          <div className="csp-card">
            <h3>Alert Level</h3>
            <div className={`alert ${alert.toLowerCase()}`}>{alert}</div>
          </div>

          {payload?.decision?.action !== "NO_ACTION" && (
            <button
              className="forensic-btn"
              onClick={() =>
                navigate("/forensics", { state: payload })   // ✅ FIX
              }
            >
              Open Forensic Module
            </button>
          )}
        </div>

        <div className="csp-right">
          <div className="csp-card logs">
            <h3>System Activity Logs</h3>
            <ul className="log-list">
              {logs.map((log, i) => (
                <li key={i} className="log-row">{log}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
