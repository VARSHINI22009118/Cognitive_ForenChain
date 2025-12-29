import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bci.css";

const COMMANDS = ["COLLECT_EVIDENCE", "TAG_EVIDENCE", "MARK_ANOMALY"];

export default function BCIModule() {
  const navigate = useNavigate();

  const [eeg, setEeg] = useState([]);
  const [attention, setAttention] = useState(0);
  const [focus, setFocus] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [command, setCommand] = useState(null);
  const [log, setLog] = useState([]);

  /* =======================
     EEG SIMULATION
  ======================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setEeg((prev) => {
        const value = Math.floor(Math.random() * 80) + 20;
        const updated = [...prev, value];
        return updated.length > 55 ? updated.slice(1) : updated;
      });

      setLog((prev) => [
        `[${new Date().toLocaleTimeString()}] EEG signal received`,
        ...prev.slice(0, 9),
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  /* =======================
     INTENT DECODING
  ======================= */
  useEffect(() => {
    if (eeg.length < 10) return;

    const avg = eeg.reduce((a, b) => a + b, 0) / eeg.length;
    const conf = Math.min(100, Math.floor(avg));

    setAttention(conf);
    setFocus(Math.min(100, Math.floor(avg * 0.9)));
    setConfidence(conf);

    if (conf > 55 && !command) {
      const selected =
        COMMANDS[Math.floor(Math.random() * COMMANDS.length)];

      setCommand(selected);

      setLog((prev) => [
        `[${new Date().toLocaleTimeString()}] Intent decoded → ${selected}`,
        ...prev.slice(0, 9),
      ]);
    }
  }, [eeg, command]);

  /* =======================
     EMIT COMMAND → CSP
  ======================= */
  const emitCommand = async () => {
  if (!command) return;

  const payload = {
    command,
    confidence: confidence / 100,
    timestamp: new Date().toISOString(),
  };

  setLog((prev) => [
    `[${new Date().toLocaleTimeString()}] Command sent to CSP`,
    ...prev.slice(0, 9),
  ]);

  try {
    // 🔹 Existing BCI logging (DO NOT REMOVE)
    await fetch("http://localhost:5000/api/bci-command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 🔹 NEW: CSP orchestration call
    await fetch("http://localhost:5000/api/csp/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    navigate("/cyber-security", { state: payload });

  } catch (err) {
    console.error("BCI → CSP Error:", err);
  }
};


  /* =======================
     SVG WAVE PATH
  ======================= */
  const wavePath = eeg
    .map((v, i) =>
      `${i === 0 ? "M" : "L"} ${20 + i * 8} ${130 - v}`
    )
    .join(" ");

  return (
    <div className="bci-root">
      <header className="bci-header">
        <h2>BCI Cognitive Command Processing</h2>
        <p>Brain → System Interaction Layer</p>
      </header>

      <div className="bci-grid">
        {/* EEG SIGNAL */}
        <div className="card">
          <h3>Simulated EEG Signal</h3>

          <svg className="eeg-wave" viewBox="0 0 520 160">
            <line x1="20" y1="10" x2="20" y2="130" className="axis" />
            <text x="2" y="20" className="axis-label">
              Amplitude
            </text>

            <line x1="20" y1="130" x2="500" y2="130" className="axis" />
            <text x="460" y="155" className="axis-label">
              Time
            </text>

            <path d={wavePath} className="wave" />
          </svg>
        </div>

        {/* COGNITIVE INDICATORS */}
        <div className="card">
          <h3>Cognitive Indicators</h3>
          <p>Attention: {attention}%</p>
          <p>Focus: {focus}%</p>
          <p>Intent Confidence: {confidence}%</p>
        </div>

        {/* COMMAND DECODER */}
        <div className="card">
          <h3>Decoded Command</h3>

          <div className="final-command-box">
            <span className="label">FINAL DECODED COMMAND</span>
            <div className="command-value">
              {command || "—"}
            </div>
          </div>

          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${confidence}%` }}
            />
          </div>

          <span className="confidence-label">
            Confidence: {confidence}%
          </span>

          <button
            className="emit-btn"
            disabled={!command}
            onClick={emitCommand}
          >
            Send to CSP
          </button>
        </div>

        {/* ACTIVITY LOG */}
        <div className="card">
          <h3>BCI Activity Log</h3>
          <ul className="bci-log">
            {log.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
