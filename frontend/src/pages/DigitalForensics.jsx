import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/forensic.css";

export default function DigitalForensics() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const [status, setStatus] = useState("IDLE");
  const [timeline, setTimeline] = useState([]);
  const [hash, setHash] = useState("");
  const [tags, setTags] = useState([]);
  const [caseId, setCaseId] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false); // ✅ NEW

  const decision = state?.decision || null;

  useEffect(() => {
    if (!decision) return;

    setStatus("PROCESSING");

    const now = () => new Date().toLocaleTimeString();

    setTimeline([
      `[${now()}] Evidence acquired`,
      `[${now()}] Cryptographic hash generated`,
      `[${now()}] Evidence tagged via CSP`,
      `[${now()}] Timeline reconstructed`,
      `[${now()}] Cognitive anomaly marked`,
      `[${now()}] Forensic report generated`,
    ]);

    setHash("02f3a9c8e8d4c91e5e7d0c4b8f1a7b9e");
    setTags(["BCI_TRIGGERED", decision.action, decision.risk]);
    setCaseId(`CF-${Math.floor(Math.random() * 100000)}`);
  }, [decision]);

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Forensic_Report_${caseId}.pdf`);

    setStatus("COMPLETED");          // ✅ STATUS UPDATED HERE
    setReportGenerated(true);        // ✅ SHOW BADGE AFTER DOWNLOAD
  };

  if (!decision) {
    return (
      <div className="forensic-idle">
        <h2>No forensic task initiated</h2>
        <p>Awaiting approved action from CSP.</p>
      </div>
    );
  }

  return (
    <div className="forensic-root">
      <header className="forensic-header">
        <h1>Forensic Investigation Report</h1>

        {reportGenerated && (   /* ✅ CONDITIONAL RENDER */
          <span className="report-status completed">
            Generated Successfully
          </span>
        )}
      </header>

      <div className="forensic-layout" ref={pdfRef}>
        <div className="forensic-panel">
          <h3>Report Status</h3>
          <p className="verified">✔ Report Generated</p>
          <p><b>Blockchain Verification:</b> VERIFIED</p>
          <p><b>Case ID:</b> {caseId}</p>
          <p><b>Source:</b> BCI → CSP</p>
        </div>

        <div className="forensic-panel">
          <h3>Evidence Summary</h3>
          <p><b>File:</b> malware_sample.exe</p>
          <p><b>Hash:</b> {hash}</p>
          <p><b>Action:</b> {decision.action}</p>
          <p><b>Risk:</b> {decision.risk}</p>

          <div className="forensic-actions">
            <button className="download-btn" onClick={downloadPDF}>
              Download Report (PDF)
            </button>
            <button
              className="blockchain-btn"
              onClick={() => navigate("/blockchain")}
            >
              View Blockchain Proof
            </button>
          </div>
        </div>

        <div className="forensic-panel logs">
          <h3>Real-Time Activity Log</h3>
          <ul>
            {timeline.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="forensic-panel tags-panel">
        <h3>Tags & Annotations</h3>
        <div className="tag-container">
          {tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
