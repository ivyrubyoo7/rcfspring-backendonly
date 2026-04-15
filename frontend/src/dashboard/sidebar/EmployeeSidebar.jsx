import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../../utils/logout";

const EmployeeSidebar = ({ isCollapsed }) => {

const navigate = useNavigate();

const menuItems = [
{ id: "dashboard", name: "Dashboard" },
{ id: "tasks", name: "Tasks" },
{ id: "attendance", name: "Attendance" },
{ id: "reports", name: "Reports" },
{ id: "analytics", name: "Analytics" },
{ id: "settings", name: "Settings" }
];

const routeMap = {
  dashboard: "/employee",
  tasks: "/employee/tasks",
  attendance: "/employee/attendance",
  reports: "/employee/reports",
  analytics: "/employee/analytics",
  settings: "/employee/settings"
};

const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

const handleLogout = () => {
  logout(navigate);
};

return (

<div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>

<div className="sidebar-header">
<span className="logo-text">Employee Dashboard</span>
</div>

<div className="sidebar-content">

<div className="sidebar-profile">
<div className="profile-image">
<img src="https://i.pinimg.com/736x/46/03/df/4603df64b829052bcf357dfdea4bbde8.jpg" alt="user"/>
</div>

<div className="profile-info">
<h3>{user?.fullName}</h3>
<p className="profile-designation">{user?.designation}</p>
<p className="profile-role">Employee</p>
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

export default EmployeeSidebar;
