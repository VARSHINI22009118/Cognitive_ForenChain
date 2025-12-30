import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/report.css";

export default function Reports() {
  const navigate = useNavigate();
  const pdfRef = useRef();
  const [reportGenerated, setReportGenerated] = useState(false);

  // Dummy report data
  const caseId = `CF-${Math.floor(Math.random() * 100000)}`;
  const hash = "02f3a9c8e8d4c91e5e7d0c4b8f1a7b9e";
  const decision = { action: "Malware Quarantine", risk: "High" };
  const tags = ["AUTOMATED", decision.action, decision.risk];

  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const now = () => new Date().toLocaleTimeString();
    setTimeline([
      `[${now()}] Evidence acquired`,
      `[${now()}] Cryptographic hash generated`,
      `[${now()}] Evidence tagged`,
      `[${now()}] Timeline reconstructed`,
      `[${now()}] Anomaly detection completed`,
      `[${now()}] Report finalized`,
    ]);
  }, []);

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Report_${caseId}.pdf`);

    setReportGenerated(true);
  };

  return (
    <div className="report-root">
      <header className="report-header">
        <h1>Investigation Report</h1>
        {reportGenerated && (
          <span className="report-status completed">
            Generated Successfully
          </span>
        )}
      </header>

      <div className="report-layout" ref={pdfRef}>
        <div className="report-panel">
          <h3>Report Status</h3>
          <p className="verified">✔ Report Generated</p>
          <p><b>Blockchain Verification:</b> VERIFIED</p>
          <p><b>Case ID:</b> {caseId}</p>
          <p><b>Source:</b> Automated System</p>
        </div>

        <div className="report-panel">
          <h3>Evidence Summary</h3>
          <p><b>File:</b> sample_malware.exe</p>
          <p><b>Hash:</b> {hash}</p>
          <p><b>Action:</b> {decision.action}</p>
          <p><b>Risk:</b> {decision.risk}</p>

          <div className="report-actions">
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

        <div className="report-panel logs">
          <h3>Real-Time Activity Log</h3>
          <ul>
            {timeline.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="report-panel tags-panel">
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
