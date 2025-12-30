import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "../styles/blockchain.css";
import { generateSampleBlockchainLogs } from "../services/sampleBlockchainLogs";

const shortHash = (hash, start = 8, end = 6) => {
  if (!hash || hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}…${hash.slice(-end)}`;
};

const dynamicTime = (offsetSeconds = 0) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() + offsetSeconds);
  return d.toLocaleTimeString("en-IN", { hour12: false });
};

export default function BlockchainModule() {
  const [logs, setLogs] = useState([]);
  const [tx, setTx] = useState(null);

  const navigate = useNavigate(); // ✅ useNavigate hook

  useEffect(() => {
    const sampleBlocks = generateSampleBlockchainLogs();

    let counter = 0;

    const generatedLogs = sampleBlocks
      .slice(0, 5)
      .flatMap((block) =>
        block.logs.map((log) => ({
          ...log,
          time: dynamicTime(counter++),
        }))
      );

    setLogs(generatedLogs);

    setTx({
      status: "SUCCESS",
      blockNumber: Math.floor(Math.random() * 9000) + 1000,
      blockHash: "0xBCI4FC" + Math.random().toString(16).slice(2, 10),
      txHash: "0xTXBCI9E" + Math.random().toString(16).slice(2, 10),
      contractStatus: "Smart Contract Verified",
      systemHealth: "Access Granted",
    });
  }, []);

  if (!tx) {
    return (
      <div className="bc-root">
        <h2 style={{ textAlign: "center", color: "#94a3b8" }}>
          Loading Blockchain Logs…
        </h2>
      </div>
    );
  }

  return (
    <div className="bc-root">
      {/* HEADER */}
      <header className="bc-header">
        <h1>Cognitive ForenChain & Smart Contract Log</h1>
        <nav>
          <span onClick={() => navigate("/dashboard")}>Dashboard</span>
          <span onClick={() => navigate("/analysis")}>Analysis</span>
          <span onClick={() => navigate("/report")}>Reports</span> {/* ✅ updated */}
          <span>Settings</span>
        </nav>
      </header>

      <div className="bc-grid">
        {/* LEFT PANEL */}
        <div className="bc-left">
          <div className="bc-card hover-card">
            <h3>Transaction Status</h3>
            <div className="status success">✔ {tx.status}</div>
          </div>

          <div className="bc-card hover-card">
            <h3>Block Number</h3>
            <p>{tx.blockNumber}</p>
            <p className="hash">{shortHash(tx.blockHash)}</p>
          </div>

          <div className="bc-card hover-card">
            <h3>Transaction Hash</h3>
            <p className="hash">{shortHash(tx.txHash)}</p>
          </div>

          <div className="bc-card hover-card">
            <h3>Smart Contract Verification</h3>
            <p className="verified">✔ {tx.contractStatus}</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bc-right">
          <div className="bc-card hover-card full">
            <h3>Block Detailed Log Entries</h3>

            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Property</th>
                  <th>Action</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.time}</td>
                    <td>{log.property}</td>
                    <td>{log.action}</td>
                    <td className={log.highlight ? "ok" : ""}>{log.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bc-card hover-card system">
            <h3>System Health</h3>
            <p className="verified">✔ {tx.systemHealth}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
