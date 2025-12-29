import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadEvidence from "./pages/UploadEvidence";
import BlockchainLogs from "./pages/BlockchainLogs";
import AnalystProfile from "./pages/AnalystProfile";

/* Existing placeholder pages */
const Analysis = () => <div>Analysis Page</div>;
const Reports = () => <div>Reports Page</div>;

/* NEW MODULE PAGES */
import BCIModule from "./pages/BCIModule";
import CyberSecurity from "./pages/CyberSecurity";
import DigitalForensics from "./pages/DigitalForensics";
import BlockchainModule from "./pages/BlockchainModule";

function App() {
  return (
    <Router>
      <Routes>
        {/* EXISTING ROUTES — UNCHANGED */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadEvidence />} />
        <Route path="/logs" element={<BlockchainLogs />} />
        <Route path="/profile" element={<AnalystProfile />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/reports" element={<Reports />} />

        {/* NEW MODULE ROUTES */}
        <Route path="/bci" element={<BCIModule />} />
        <Route path="/cyber-security" element={<CyberSecurity />} />
        <Route path="/forensics" element={<DigitalForensics />} />
        <Route path="/blockchain" element={<BlockchainModule />} />
      </Routes>
    </Router>
  );
}

export default App;
