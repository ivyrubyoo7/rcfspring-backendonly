import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { login } from "../services/authService";

const API_BASE = "http://localhost:8080/api/auth";

const RCF_LOGO =
  "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Rashtriya_Chemicals_%26_Fertilizers_Logo.svg/960px-Rashtriya_Chemicals_%26_Fertilizers_Logo.svg.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData.email, formData.password);

      console.log("LOGIN DATA:", data); // 🔥 ADD THIS
      console.log("TOKEN AFTER LOGIN:", localStorage.getItem("token"));
      alert("Login successful");

      // store user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          designation: data.designation,
          role: data.role,
          plantId: data.plantId,
          plantName: data.plantName,
          departmentName: data.departmentName
        })
      );

      localStorage.setItem("role", data.role);

      // redirect based on role
      if (data.role === "ADMIN") navigate("/admin");
      if (data.role === "OFFICER") navigate("/officer");
      if (data.role === "MANAGER") navigate("/manager");
      if (data.role === "EMPLOYEE") navigate("/employee");
      if (data.role === "CONTRACTOR") navigate("/contractor");

    } catch (error) {
      console.error("Auth error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-background">
        <div className="grid-overlay" />
      </div>

      <div className="auth-content">

        {/* ===== BRANDING ===== */}
        <div className="auth-branding">
          <div className="brand-icon">
            <img src={RCF_LOGO} alt="RCF Logo" className="rcf-logo"/>
          </div>

          <p className="brand-subtitle">
            Rashtriya Chemicals & Fertilizers Limited
          </p>
        </div>


        <div className={`auth-wrapper ${mode === "signin" ? "slide-left" : ""}`}>

          {/* ===== SIGN UP ===== */}
          <div className="auth-form-panel">

            <h2>Create Account</h2>
            <p className="subtitle">Register for the RCF System</p>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Official Email (..@rcf.in)"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="primary-btn" type="submit">
                Create Account
              </button>

            </form>
          </div>


          {/* ===== SIGN IN ===== */}
          <div className="auth-form-panel">

            <h2>Sign In</h2>
            <p className="subtitle">Access the RCF Dashboard</p>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Official Email (..@rcf.in)"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="primary-btn" type="submit">
                Sign In
              </button>

            </form>
          </div>


          {/* ===== SLIDING OVERLAY ===== */}
          <div className="auth-overlay">

            <div className="overlay-content">

              {mode === "signup" ? (
                <>
                  <h2>Already Registered?</h2>
                  <p>Sign in to access</p>

                  <button
                    className="ghost-btn"
                    onClick={() => setMode("signin")}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h2>New Employee?</h2>
                  <p>Create your account to access the RCF management system.</p>

                  <button
                    className="ghost-btn"
                    onClick={() => setMode("signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;