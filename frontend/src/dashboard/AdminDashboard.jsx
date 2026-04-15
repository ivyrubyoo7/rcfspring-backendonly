import React, { useState, useEffect } from 'react';
import UserEntryCard from "./userentry/UserEntryCard";
import API from "../services/api";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    presentEmployees: 0,
    absentEmployees: 0,
    totalEmployees: 0,
    productionRate: 0,
    itAssets: {
      total: 0,
      available: 0,
      underRepair: 0
    },
    departmentStats: [],
    recentActivities: [],
    productionTrend: []
  });

const [users, setUsers] = useState([]);
const [showUserEntry, setShowUserEntry] = useState(false);

  // Simulate data fetching from database
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Replace with actual API call to your backend
      // const response = await fetch('/api/dashboard-data');
      // const data = await response.json();

      // Simulated data
      setDashboardData({
        presentEmployees: 847,
        absentEmployees: 53,
        totalEmployees: 900,
        productionRate: 87.5,
        itAssets: {
          total: 450,
          available: 398,
          underRepair: 52
        },
        departmentStats: [
          { department: 'Production', count: 340, present: 320 },
          { department: 'IT', count: 120, present: 115 },
          { department: 'HR', count: 45, present: 42 },
          { department: 'Sales', count: 180, present: 170 },
          { department: 'Marketing', count: 95, present: 88 },
          { department: 'Finance', count: 120, present: 112 }
        ],
        recentActivities: [
          { id: 1, user: 'John Doe', action: 'Logged in', time: '2 mins ago', type: 'login' },
          { id: 2, user: 'Jane Smith', action: 'Updated production report', time: '15 mins ago', type: 'update' },
          { id: 3, user: 'Mike Johnson', action: 'Requested IT asset', time: '28 mins ago', type: 'request' },
          { id: 4, user: 'Sarah Williams', action: 'Approved leave request', time: '1 hour ago', type: 'approval' },
          { id: 5, user: 'David Brown', action: 'Submitted timesheet', time: '2 hours ago', type: 'submission' }
        ],
        productionTrend: [
          { day: 'Mon', value: 85 },
          { day: 'Tue', value: 88 },
          { day: 'Wed', value: 82 },
          { day: 'Thu', value: 91 },
          { day: 'Fri', value: 87 },
          { day: 'Sat', value: 78 },
          { day: 'Sun', value: 65 }
        ]
      });
    };

    fetchDashboardData();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const attendancePercentage = dashboardData.totalEmployees
    ? ((dashboardData.presentEmployees / dashboardData.totalEmployees) * 100).toFixed(1)
    : "0";
  const assetAvailability = dashboardData.itAssets.total
    ? ((dashboardData.itAssets.available / dashboardData.itAssets.total) * 100).toFixed(1)
    : "0";

  const handleSaveUser = async (formData) => {
    try {
      const payload = {
        fullName: formData.fullName,
        employeeId: formData.employeeId,
        email: formData.email,
        phone: formData.phone,
        roleId: formData.roleId ? Number(formData.roleId) : null,
        designationId: formData.designationId ? Number(formData.designationId) : null,
        departmentId: formData.departmentId ? Number(formData.departmentId) : null,
        plantId: formData.plantId ? Number(formData.plantId) : null,
        managerId: formData.managerId ? Number(formData.managerId) : null
      };

      console.log("FINAL PAYLOAD:", payload); // 🔥 DEBUG

      await API.post("/users", payload);

      alert("User created successfully");
      setShowUserEntry(false);
      fetchUsers();

    } catch (error) {
      console.error("Create user error:", error.response || error);
      alert("Server error: " + (error.response?.data?.message || "Check console"));
    }
  };

  return (
    <div className="admin-dashboard">

        <div className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <div className="top-header">
              <h1>Admin Dashboard</h1>

            </div>
            <p className="header-subtitle">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="header-right">
            <div className="date-display">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Present Employees</h3>
              <div className="stat-value">{dashboardData.presentEmployees}</div>
              <div className="stat-footer">
                <span className="stat-badge success">{attendancePercentage}%</span>
                <span className="stat-text">Attendance rate</span>
              </div>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="18" y1="8" x2="23" y2="13"></line>
                <line x1="23" y1="8" x2="18" y2="13"></line>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Absent Employees</h3>
              <div className="stat-value">{dashboardData.absentEmployees}</div>
              <div className="stat-footer">
                <span className="stat-badge warning">{((dashboardData.absentEmployees / dashboardData.totalEmployees) * 100).toFixed(1)}%</span>
                <span className="stat-text">Of total workforce</span>
              </div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Production Rate</h3>
              <div className="stat-value">{dashboardData.productionRate}%</div>
              <div className="stat-footer">
                <span className="stat-badge success">+5.2%</span>
                <span className="stat-text">From last week</span>
              </div>
            </div>
          </div>

          <div className="stat-card info">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="stat-content">
              <h3>IT Assets Available</h3>
              <div className="stat-value">{dashboardData.itAssets.available}</div>
              <div className="stat-footer">
                <span className="stat-badge info">{assetAvailability}%</span>
                <span className="stat-text">Total: {dashboardData.itAssets.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Production Trend Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Production Trend (7 Days)</h3>
              <select className="chart-filter">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="chart-content">
              <div className="bar-chart">
                {dashboardData.productionTrend.map((item, index) => (
                  <div key={index} className="bar-wrapper">
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{ height: `${item.value}%` }}
                        data-value={item.value}
                      >
                        <span className="bar-value">{item.value}%</span>
                      </div>
                    </div>
                    <span className="bar-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Department Overview</h3>
              <button className="chart-action">View Details</button>
            </div>
            <div className="chart-content">
              <div className="department-list">
                {dashboardData.departmentStats.map((dept, index) => {
                  const percentage = (dept.present / dept.count * 100).toFixed(0);
                  return (
                    <div key={index} className="department-item">
                      <div className="department-info">
                        <span className="department-name">{dept.department}</span>
                        <span className="department-count">{dept.present}/{dept.count}</span>
                      </div>
                      <div className="department-bar">
                        <div
                          className="department-progress"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="department-percentage">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* IT Assets & Recent Activities */}
        <div className="bottom-grid">
          {/* IT Assets Breakdown */}
          <div className="info-card">
            <div className="card-header">
              <h3>IT Assets Status</h3>
              <span className="card-badge">Live</span>
            </div>
            <div className="card-content">
              <div className="asset-summary">
                <div className="asset-item total">
                  <div className="asset-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className="asset-details">
                    <span className="asset-label">Total Assets</span>
                    <span className="asset-value">{dashboardData.itAssets.total}</span>
                  </div>
                </div>
                <div className="asset-item available">
                  <div className="asset-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="asset-details">
                    <span className="asset-label">Available</span>
                    <span className="asset-value">{dashboardData.itAssets.available}</span>
                  </div>
                </div>
                <div className="asset-item repair">
                  <div className="asset-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  </div>
                  <div className="asset-details">
                    <span className="asset-label">Under Repair</span>
                    <span className="asset-value">{dashboardData.itAssets.underRepair}</span>
                  </div>
                </div>
              </div>
              <div className="asset-visual">
                <div className="asset-percentage">{assetAvailability}%</div>
                <p>Assets Available</p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="info-card">
            <div className="card-header">
              <h3>Recent Activities</h3>
              <button className="card-action">View All</button>
            </div>
            <div className="card-content">
              <div className="activity-list">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'login' && '🔓'}
                      {activity.type === 'update' && '📝'}
                      {activity.type === 'request' && '📋'}
                      {activity.type === 'approval' && '✔️'}
                      {activity.type === 'submission' && '📤'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-user">{activity.user}</div>
                      <div className="activity-action">{activity.action}</div>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Database */}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button
              className="action-btn primary"
              onClick={() => setShowUserEntry(true)}
                >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>Add Employee</span>
            </button>
            <button className="action-btn success">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Generate Report</span>
            </button>
            <button className="action-btn info">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Manage Assets</span>
            </button>
            <button className="action-btn warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m20.2-5.2l-4.2 4.2m0 6l4.2 4.2"></path>
              </svg>
              <span>System Settings</span>
            </button>
          </div>
        </div>
          {/* User Entry Card */}
           {showUserEntry && (
             <UserEntryCard
               isOpen={showUserEntry}
               onClose={() => setShowUserEntry(false)}
               onSave={handleSaveUser}
             />
           )}
      </div>

    </div>
  );
};

export default AdminDashboard;