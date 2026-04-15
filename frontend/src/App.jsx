import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import AuthPage from "./auth/AuthPage";
import LandingPage from "./landing/LandingPage";

/* DASHBOARDS */
import EmployeeDashboard from "./dashboard/pages/EmployeeDashboard";
import OfficerDashboard from "./dashboard/pages/OfficerDashboard";
import ManagerDashboard from "./dashboard/pages/ManagerDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

/* ADMIN PAGES */
import AdminReports from "./dashboard/pages/AdminReports";

/* USER MANAGEMENT PAGE */
import AdminUsersPage from "./dashboard/pages/AdminUsersPage";

/* IT ASSETS PAGE */
import ITAssetsPage from "./dashboard/pages/ITAssetsPage";

/* SIDEBARS */
import EmployeeSidebar from "./dashboard/sidebar/EmployeeSidebar";
import OfficerSidebar from "./dashboard/sidebar/OfficerSidebar";
import ManagerSidebar from "./dashboard/sidebar/ManagerSidebar";
import AdminSidebar from "./dashboard/sidebar/AdminSidebar";

/* WorkPermits */
import WorkPermitManager from "./components/workpermit/WorkPermitManager";

/* Toats */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const Layout = ({ SidebarComponent, children }) => {
    return (
      <div className="app-layout">

        <SidebarComponent
          isCollapsed={!isSidebarOpen}
          onToggle={toggleSidebar}
        />

        <main className="main-content">

          {/* 🔔 GLOBAL BELL (TOP RIGHT) */}


          {children}

        </main>

      </div>
    );
  };

  return (
    <>
    <Routes>

      <Route path="/" element={<LandingPage />} />

      {/* AUTH PAGE */}
      <Route path="/auth" element={<AuthPage />} />

      {/* EMPLOYEE DASHBOARD */}
      <Route
        path="/employee"
        element={
          <Layout SidebarComponent={EmployeeSidebar}>
            <EmployeeDashboard />
          </Layout>
        }
      />

      {/* OFFICER DASHBOARD */}
      <Route
        path="/officer"
        element={
          <Layout SidebarComponent={OfficerSidebar}>
            <OfficerDashboard />
          </Layout>
        }
      />

      {/* MANAGER DASHBOARD */}
      <Route
        path="/manager"
        element={
          <Layout SidebarComponent={ManagerSidebar}>
            <ManagerDashboard />
          </Layout>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <AdminDashboard />
          </Layout>
        }
      />

      {/* ADMIN USER MANAGEMENT */}
      <Route
        path="/admin/users"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <AdminUsersPage />
          </Layout>
        }
      />

      {/* MANAGER USERS */}
      <Route
        path="/manager/users"
        element={
          <Layout SidebarComponent={ManagerSidebar}>
            <AdminUsersPage />
          </Layout>
        }
      />

      {/* MANAGER WORK PERMITS */}
      <Route
        path="/manager/permits"
        element={
          <Layout SidebarComponent={ManagerSidebar}>
            <WorkPermitManager />
          </Layout>
        }
      />

      {/* MANAGER IT ASSETS */}
      <Route
        path="/manager/assets"
        element={
          <Layout SidebarComponent={ManagerSidebar}>
            <ITAssetsPage />
          </Layout>
        }
      />

      {/* OFFICER USERS */}
      <Route
        path="/officer/users"
        element={
          <Layout SidebarComponent={OfficerSidebar}>
            <AdminUsersPage />
          </Layout>
        }
      />

      {/* IT ASSETS */}
      <Route
        path="/admin/assets"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <ITAssetsPage />
          </Layout>
        }
      />

        // OFFICER WORK PERMITS (if needed)
      <Route
          path="/officer/permits"
          element={
            <Layout SidebarComponent={OfficerSidebar}>
              <WorkPermitManager />
            </Layout>
         }
      />
      {/* ADMIN REPORTS */}
      <Route
        path="/admin/reports"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <AdminReports />
          </Layout>
        }
      />

      <Route
        path="/manager/reports"
        element={
          <Layout SidebarComponent={ManagerSidebar}>
            <AdminReports />
          </Layout>
        }
      />

      {/* WORK PERMITS */}
      <Route
        path="/admin/permits"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <WorkPermitManager />
          </Layout>
        }
      />

      {/* OTHER */}
      <Route
        path="/analytics"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <h1>Analytics Page</h1>
          </Layout>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout SidebarComponent={AdminSidebar}>
            <h1>Settings Page</h1>
          </Layout>
        }
      />

    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;