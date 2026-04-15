import React from "react";
import "../AdminDashboard.css";

const EmployeeDashboard = () => {

  const leaveData = {
    cl: 8,
    ml: 6,
    rh: 2
  };

  const attendance = {
    present: 20,
    absent: 2,
    late: 1
  };

  return (
    <div className="dashboard-main">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Employee Dashboard</h1>
          <p className="header-subtitle">Your work summary</p>
        </div>

        <div className="date-display">
          📅 {new Date().toDateString()}
        </div>
      </div>


      {/* LEAVE SUMMARY */}
      <div className="stats-grid">

        <div className="stat-card success">
          <div className="stat-icon">🌴</div>
          <div className="stat-content">
            <h3>Casual Leave</h3>
            <div className="stat-value">{leaveData.cl}</div>
            <div className="stat-footer">
              <span className="stat-text">Remaining</span>
            </div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">🏥</div>
          <div className="stat-content">
            <h3>Medical Leave</h3>
            <div className="stat-value">{leaveData.ml}</div>
            <div className="stat-footer">
              <span className="stat-text">Remaining</span>
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">🎉</div>
          <div className="stat-content">
            <h3>Restricted Holiday</h3>
            <div className="stat-value">{leaveData.rh}</div>
            <div className="stat-footer">
              <span className="stat-text">Remaining</span>
            </div>
          </div>
        </div>

      </div>


      {/* TASK UPDATE */}
      <div className="quick-actions">

        <h3>Tasks</h3>

        <div className="action-buttons">

          <button className="action-btn primary">
            Update Today's Task
          </button>

          <button className="action-btn success">
            View Task History
          </button>

          <button className="action-btn info">
            Submit Work Report
          </button>

        </div>

      </div>


      {/* ATTENDANCE SUMMARY */}
      <div className="bottom-grid">

        <div className="info-card">

          <div className="card-header">
            <h3>Attendance Summary</h3>
          </div>

          <div className="asset-summary">

            <div className="asset-item total">
              <div className="asset-icon">✅</div>
              <div className="asset-details">
                <span className="asset-label">Present</span>
                <span className="asset-value">{attendance.present}</span>
              </div>
            </div>

            <div className="asset-item repair">
              <div className="asset-icon">❌</div>
              <div className="asset-details">
                <span className="asset-label">Absent</span>
                <span className="asset-value">{attendance.absent}</span>
              </div>
            </div>

            <div className="asset-item available">
              <div className="asset-icon">⏰</div>
              <div className="asset-details">
                <span className="asset-label">Late</span>
                <span className="asset-value">{attendance.late}</span>
              </div>
            </div>

          </div>

          {/* REPORTS */}
          <div className="info-card">

            <div className="card-header">
              <h3>Reports</h3>
            </div>

            <div className="action-buttons">

              <button className="action-btn primary">
                Download Attendance Report
              </button>

              <button className="action-btn info">
                Download Task Report
              </button>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;