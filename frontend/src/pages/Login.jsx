import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

const API_BASE = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const endpoint =
      mode === "login"
        ? `${API_BASE}/api/login`
        : `${API_BASE}/api/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (res.ok && mode === "login") {
        navigate("/dashboard");
      } 
      else if (res.ok && mode === "register") {
        alert("Registered successfully. Please login.");
        setMode("login");
        setForm({ full_name: "", username: "", password: "" });
      } 
      else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      console.error("Network / Backend error:", error);
      alert("Backend is not responding. Please check Flask server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Cognitive Foren Chain</h2>
        <p style={styles.subtitle}>
          {mode === "login" ? "Analyst Login" : "Analyst Registration"}
        </p>

        {mode === "register" && (
          <input
            style={styles.input}
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
          />
        )}

        <input
          style={styles.input}
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          style={styles.primaryBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>

        <button
          style={styles.toggleBtn}
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "New user? Register here"
            : "Already registered? Login"}
        </button>
      </div>
    </div>
  );
}

/* 🔹 STYLES OBJECT (FIXED) */
const styles = {
  wrapper: {
    height: "100vh",
    background: "radial-gradient(circle at top, #0b1220, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#020617",
    padding: "30px",
    borderRadius: "12px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 0 35px rgba(0,0,0,0.9)"
  },
  title: {
    color: "#38bdf8",
    marginBottom: "5px"
  },
  subtitle: {
    color: "#cbd5f5",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#e5e7eb"
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#38bdf8",
    color: "#020617",
    fontWeight: "bold",
    cursor: "pointer"
  },
  toggleBtn: {
    marginTop: "15px",
    background: "none",
    border: "none",
    color: "#38bdf8",
    cursor: "pointer",
    fontSize: "14px"
  }
};
