import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Sidebar.css';
import { logout } from "../../utils/logout";


const AdminSidebar = ({ isCollapsed, onToggle, userRole }) => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    designation: '',
    profileImage: ''
  });

  const roleLabels = {
    ADMIN: "Admin",
    OFFICER: "Officer",
    MANAGER: "Manager",
    EMPLOYEE: "Employee"
  };
  const [activeMenu, setActiveMenu] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

const routeMap = {
  dashboard: "/admin",
  permits: "/admin/permits",
  assets: "/admin/assets",
  users: "/admin/users",
  reports: "/admin/reports",  // ✅ FIXED
  analytics: "/analytics",
  production: "/production",
  settings: "/settings"
};

  useEffect(() => {

    try {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      setUserData({
        name: parsedUser?.fullName || "",
        email: parsedUser?.email || "",
        designation: parsedUser?.designation || "",
        profileImage:
          parsedUser?.profileImage ||
          "https://i.pinimg.com/736x/46/03/df/4603df64b829052bcf357dfdea4bbde8.jpg"
      });

    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }

  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
//     {
//         id: 'analytics',
//         name: 'Analytics',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//           <circle cx="9" cy="7" r="4"></circle>
//           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//         </svg>
//       ),
//       subItems: ['Present People', 'Absent People']
//     },
//     {
//       id: 'production',
//       name: 'Production',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <line x1="12" y1="1" x2="12" y2="23"></line>
//           <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//         </svg>
//       ),
//       subItems: ['Production Rate', 'Production Analytics']
//     },
    {
      id: 'permits',
      name: 'Work Permits',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="9" y1="11" x2="15" y2="11"></line>
        </svg>
      ),
//       subItems: ['Request Permit', 'Active Permits', 'Permit History']
    },
    {
      id: 'assets',
      name: 'IT Assets',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },

    {
      id: 'users',
      name: 'User Database',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    }

//     {
//       id: 'settings',
//       name: 'Settings',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="3"></circle>
//           <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m20.2-5.2l-4.2 4.2m0 6l4.2 4.2"></path>
//         </svg>
//       )
//     }
  ];

  const filteredMenuItems = menuItems;
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* HEADER (fixed) */}
      <div className="sidebar-header">
        <div className="logo">
          {!isCollapsed && <span className="logo-text">Command Center</span>}
        </div>

        <button className="toggle-btn" onClick={onToggle} title="Toggle Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="sidebar-content">

        <div className="sidebar-profile">
          <div className="profile-image">
            <img src={userData.profileImage} alt={userData.name} />
            <div className="status-indicator"></div>
          </div>
          {!isCollapsed && (
            <div className="profile-info">
              <h3>{userData.name}</h3>

              <p className="profile-designation">
                {userData.designation}
              </p>

              <p className="profile-role">
                {roleLabels[userRole]}
              </p>

              <p className="profile-email">
                {userData.email}
              </p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="menu-item-wrapper">
              <button
                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveMenu(item.id);

                  const route = routeMap[item.id];

                  if (route) {
                    navigate(route);
                  }
                }}
                title={isCollapsed ? item.name : ''}
              >
                <span className="menu-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-text">{item.name}</span>}
                {!isCollapsed && item.subItems && (
                  <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>

              {!isCollapsed && item.subItems && activeMenu === item.id && (
                <div className="submenu">
                  {item.subItems.map((subItem, index) => (
                    <button
                      key={index}
                      className="submenu-item"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the parent menu from closing
                        // Navigates to the route with a query parameter (e.g., /admin/reports?type=user)
                        const type = subItem.toLowerCase().split(' ')[0];
                        navigate(`${routeMap[item.id]}?type=${type}`);
                      }}
                    >
                      <span className="submenu-dot"></span>
                      <span>{subItem}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

      </div>

      {/* FOOTER (fixed at bottom) */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout} title={isCollapsed ? 'Logout' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

    </div>
  );

};

export default AdminSidebar;