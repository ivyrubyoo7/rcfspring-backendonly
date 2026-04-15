import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../../utils/logout";

const ManagerSidebar = ({ isCollapsed }) => {

const navigate = useNavigate();

const menuItems = [
  { id: "dashboard", name: "Dashboard", path: "/manager" },

  { id: "users", name: "User Database", path: "/manager/users" },

  { id: "permits", name: "Work Permits", path: "/manager/permits" },

  { id: "assets", name: "IT Assets", path: "/manager/assets" },

  { id: "reports", name: "Reports", path: "/manager/reports" },

  // Optional
  // { id: "analytics", name: "Analytics", path: "/manager/analytics" },
  // { id: "settings", name: "Settings", path: "/manager/settings" }
];

const handleLogout = () => {
  logout(navigate);
};
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    setUser(storedUser);
  }
}, []);

const routeMap = {
  dashboard: "/manager",
  users: "/manager/users",
    // ✅ ADD THIS
  permits: "/manager/permits",
    // ✅ ADD THIS
  assets: "/manager/assets",
  reports: "/manager/reports",
  analytics: "/manager/analytics",
  settings: "/manager/settings"
};

return (

<div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

<div className="sidebar-header">
<span className="logo-text">Manager Dashboard</span>
</div>

<div className="sidebar-content">

<div className="sidebar-profile">
<div className="profile-image">
<img src="https://i.pravatar.cc/100" alt="manager"/>
</div>

<div className="profile-info">
<h3>{user?.fullName}</h3>
<p className="profile-designation">{user?.designation}</p>
<p className="profile-role">Manager</p>
</div>
</div>

<nav className="sidebar-nav">

{menuItems.map((item) => (

<button
key={item.id}
className="menu-item"
onClick={() => navigate(routeMap[item.id])}
>

<span className="menu-text">{item.name}</span>

</button>

))}

</nav>

</div>

<div className="sidebar-footer">
<button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
</div>

</div>
);
};

export default ManagerSidebar;
