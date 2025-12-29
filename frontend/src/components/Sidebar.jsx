import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Security Analyst</h3>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/upload">Upload Evidence</Link></li>
        <li><Link to="/logs">Blockchain Logs</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
