import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../../utils/logout";

const OfficerSidebar = ({ isCollapsed }) => {

const navigate = useNavigate();

const menuItems = [
{ id: "dashboard", name: "Dashboard" },
{ id: "assets", name: "IT Assets" },
{ id: "users", name: "User Database" },
{ id: "reports", name: "Reports" },
{ id: "analytics", name: "Analytics" },
{ id: "settings", name: "Settings" }
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
  dashboard: "/officer",
  assets: "/officer/assets",
  users: "/admin/users",
  reports: "/reports",
  analytics: "/analytics",
  settings: "/settings"
};


return (

<div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

<div className="sidebar-header">
<span className="logo-text">Officer Dashboard</span>
</div>

<div className="sidebar-content">

<div className="sidebar-profile">
<div className="profile-image">
<img src="https://i.pravatar.cc/100" alt="officer"/>
</div>

<div className="profile-info">
<h3>{user?.fullName}</h3>
<p className="profile-designation">{user?.designation}</p>
<p className="profile-role">Officer</p>
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

export default OfficerSidebar;
