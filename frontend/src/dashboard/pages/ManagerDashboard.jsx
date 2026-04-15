import React, { useState, useEffect } from "react";
import API from "../../services/api";
import "../AdminDashboard.css";

const ManagerDashboard = () => {
  const [pendingPermits, setPendingPermits] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch pending approvals
  const fetchPendingPermits = async () => {
    try {
      setLoading(true);
      const res = await API.get("/permits/pending-approvals");

      console.log("PENDING PERMITS:", res.data);

      setPendingPermits(res.data || []);
    } catch (error) {
      console.error("Error fetching pending permits:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Approve permit
  const approvePermit = async (id) => {
    try {
      await API.put(`/permits/${id}/approve`);
      alert("Permit approved ✅");

      fetchPendingPermits(); // refresh list
    } catch (error) {
      console.error("Approve error:", error);
      alert("Error approving permit");
    }
  };

  // 🔥 Reject permit
  const rejectPermit = async (id) => {
    try {
      await API.put(`/permits/${id}/reject`);
      alert("Permit rejected ❌");

      fetchPendingPermits(); // refresh list
    } catch (error) {
      console.error("Reject error:", error);
      alert("Error rejecting permit");
    }
  };

  // 🔥 Load on mount
  useEffect(() => {
    fetchPendingPermits();
  }, []);

  return (
    <div className="dashboard-main">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Manager Dashboard</h1>
        <p className="header-subtitle">Management Overview</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card success">
          <h3>Total Employees</h3>
          <div className="stat-value">142</div>
        </div>

        <div className="stat-card info">
          <h3>Active Projects</h3>
          <div className="stat-value">8</div>
        </div>

        <div className="stat-card warning">
          <h3>Pending Reports</h3>
          <div className="stat-value">5</div>
        </div>

      </div>

      {/* 🔥 PENDING APPROVALS */}
      <div style={{ marginTop: "30px" }}>
        <h2>Pending Approvals</h2>

        {loading ? (
          <p>Loading...</p>
        ) : pendingPermits.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <table className="wp-table">
            <thead>
              <tr>
                <th>Permit Code</th>
                <th>Activity</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pendingPermits.map((p) => (
                <tr key={p.id}>
                  <td>{p.permitCode}</td>
                  <td>{p.activity}</td>
                  <td>{p.workCategory}</td>
                  <td>{p.status}</td>

                  {/* 🔥 ACTION BUTTONS */}
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => approvePermit(p.id)}
                      style={{
                        marginRight: "10px",
                        padding: "6px 12px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectPermit(p.id)}
                      style={{
                        padding: "6px 12px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default ManagerDashboard;