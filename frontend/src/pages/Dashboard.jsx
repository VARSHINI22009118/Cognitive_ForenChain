import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-root">
      {/* TOP NAVBAR */}
      <header className="topbar">
        <div className="logo">Cognitive ForenChain</div>

        <nav className="nav-links">
          <span className="active" onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span onClick={() => navigate("/analysis")}>Analysis</span>
          <span onClick={() => navigate("/reports")}>Reports</span>
        </nav>

        <div
          className="profile"
          onClick={() => navigate("/profile")}
          title="Profile"
        >
          👤
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="dashboard-grid">
        {/* MODULE STATUS */}
        <div className="card">
          <h3>Module Status</h3>
          <div className="module-grid">
            <div
              className="module active"
              onClick={() => navigate("/bci")}
              style={{ cursor: "pointer" }}
            >
              BCI Module
              <span>ACTIVE ✅</span>
            </div>

            <div
              className="module active"
              onClick={() => navigate("/cyber-security")}
              style={{ cursor: "pointer" }}
            >
              Cyber Security Platform
              <span>ACTIVE ✅</span>
            </div>

            <div
              className="module connected"
              onClick={() => navigate("/forensics")}
              style={{ cursor: "pointer" }}
            >
              Digital Forensics Module
              <span>CONNECTED ⏱️</span>
            </div>

            {/* CONNECTION MODULE — intentionally left untouched */}
            <div className="module connected">
              Connection
              <span>IDLE ⏱ </span>
            </div>
          </div>
        </div>

        {/* REAL-TIME LOG */}
        <div className="card">
          <h3>Real-Time Activity Log</h3>

          <div className="log-container">
            <ul className="log">
              <li>[14:35:01] BCI: “TAG EVIDENCE” issued</li>
              <li>[14:35:02] CSP: Executing DFM</li>
              <li>[14:30:03] DFM: File hash acquired</li>
              <li>[10:18:04] BLOCKCHAIN: Transaction recorded</li>
            </ul>
          </div>
        </div>

        {/* BLOCKCHAIN STATUS */}
        <div
          className="card"
          onClick={() => navigate("/blockchain")}
          style={{ cursor: "pointer" }}
        >
          <h3>Blockchain & Smart Contracts</h3>
          <p>Module Integrity</p>

          <div className="progress">
            <div className="progress-bar" style={{ width: "95%" }} />
          </div>

          <span className="percent">95%</span>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="card system-health">
          <h3>System Health</h3>

          <div className="health-ring">
            <div className="health-inner">✔</div>
          </div>

          <p className="health-text">All systems operational</p>
        </div>
      </div>
    </div>
  );
}
