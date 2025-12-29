import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>Cognitive ForenChain</h2>

      <div
        className="profile-icon"
        onClick={() => navigate("/profile")}
        title="Profile"
      >
        👤
      </div>
    </div>
  );
}

export default Navbar;
