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
          <span onClick={() => navigate("/report")}>Reports</span> {/* Fixed link */}
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
        <div className="card hover-card">
          <h3>Module Status</h3>

          <div className="module-grid">
            <div
              className="module hover-module"
              onClick={() => navigate("/bci")}
            >
              <div className="module-box active">
                <span className="module-name">BCI Module</span>
                <span className="module-state">ACTIVE ✅</span>
              </div>
            </div>

            <div
              className="module hover-module"
              onClick={() => navigate("/cyber-security")}
            >
              <div className="module-box active">
                <span className="module-name">
                  Cyber Security Platform
                </span>
                <span className="module-state">ACTIVE ✅</span>
              </div>
            </div>

            <div
              className="module hover-module"
              onClick={() => navigate("/forensics")}
            >
              <div className="module-box connected">
                <span className="module-name">
                  Digital Forensics Module
                </span>
                <span className="module-state">CONNECTED ⏱️</span>
              </div>
            </div>

            <div className="module hover-module">
              <div className="module-box connected">
                <span className="module-name">Connection</span>
                <span className="module-state">IDLE ⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* REAL-TIME LOG */}
        <div className="card hover-card">
          <h3>Real-Time Activity Log</h3>

          <div className="log-container">
            <div className="log-item">
              [14:35:01] BCI: “TAG EVIDENCE” issued
            </div>
            <div className="log-item">
              [14:35:02] CSP: Executing DFM
            </div>
            <div className="log-item">
              [14:30:03] DFM: File hash acquired
            </div>
            <div className="log-item">
              [10:18:04] BLOCKCHAIN: Transaction recorded
            </div>
          </div>
        </div>

        {/* BLOCKCHAIN STATUS */}
        <div
          className="card hover-card"
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
        <div className="card system-health hover-card">
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
