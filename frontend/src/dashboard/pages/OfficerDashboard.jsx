import React, { useEffect, useState } from "react";
import "../AdminDashboard.css";
import { getAllUsers } from "../../services/api";

const OfficerDashboard = () => {

  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    loadUserInfo();
    fetchDashboardData();
  }, []);

  /* ======================================
     Load Logged-in User Info
  ====================================== */
  const loadUserInfo = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserInfo(user);
    } catch (err) {
      console.error("Error parsing user info");
    }
  };

  /* ======================================
     Fetch Dashboard Data
  ====================================== */
  const fetchDashboardData = async () => {
    try {
      const res = await getAllUsers();

      setUsersCount(res.data.length);

    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-main">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Officer Dashboard</h1>
        <p className="header-subtitle">
          {userInfo?.plantName || "Plant"} / {userInfo?.departmentName || "Department"}
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card success">
          <h3>IT Assets</h3>
          <div className="stat-value">320</div>
        </div>

        <div className="stat-card info">
          <h3>Users (Your Scope)</h3>
          <div className="stat-value">
            {loading ? "..." : usersCount}
          </div>
        </div>

        <div className="stat-card warning">
          <h3>Pending Reports</h3>
          <div className="stat-value">7</div>
        </div>

      </div>

    </div>
  );
};

export default OfficerDashboard;