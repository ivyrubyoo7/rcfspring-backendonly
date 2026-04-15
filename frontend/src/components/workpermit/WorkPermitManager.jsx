import React, { useState, useEffect } from "react";
import "./workpermit.css";
import PermitTabs from "./PermitTabs";
import WorkPermitForm from "./WorkPermitForm";
import PermitTable from "./PermitTable";
import PermitHistory from "./PermitHistory";
import API from "../../services/api";
import { toast } from "react-toastify";

const WorkPermitManager = () => {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  const [permits, setPermits] = useState([]);
  const [historyPermits, setHistoryPermits] = useState([]);

  const [loading, setLoading] = useState(false);

  const [knownPermitIds, setKnownPermitIds] = useState([]);

  const handlePermitUpdate = (id, newStatus) => {
    setPermits(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  // 🔥 Derived states
  const pendingPermits = permits.filter(
    p => (p.status || "").toLowerCase() === "pending"
  );

  const processedPermits = permits.filter(p => {
    const status = (p.status || "").toLowerCase();
    return status === "approved" || status === "rejected";
  });

  // ✅ Fetch Active Permits
  const fetchActivePermits = async () => {
    try {
      setLoading(true);

      const res = await API.get("/permits/pending-approvals");
      const data = res.data || [];

      // 🕒 current time
      const now = new Date();

      // ⏱ only permits within last 10 minutes
      const recentPermits = data.filter(p => {
        if (!p.createdAt) return false;

        const created = new Date(p.createdAt);
        const diffMinutes = (now - created) / (1000 * 60);

        return diffMinutes <= 10;
      });

      // 🔔 FIRST LOAD → no notification
      if (knownPermitIds.length === 0) {
        setKnownPermitIds(data.map(p => p.id));
      } else {
        const newRecentPermits = recentPermits
          .filter(p => !knownPermitIds.includes(p.id))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        newRecentPermits.forEach((permit) => {
          toast.info(`New permit: ${permit.activity}`, {
            toastId: permit.id // ✅ prevents duplicates
          });
        });

        // update known IDs
        setKnownPermitIds(data.map(p => p.id));
      }

      // update UI
      setPermits(data);

    } catch (error) {
      console.error("Error fetching active permits:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch History Permits
  const fetchHistoryPermits = async () => {
    try {
      setLoading(true);
      const res = await API.get("/permits/history");
      setHistoryPermits(res.data || []);
    } catch (error) {
      console.error("Error fetching history permits:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data based on tab
  useEffect(() => {
    if (activeTab === "ACTIVE") {
      fetchActivePermits();
    }

    if (activeTab === "HISTORY") {
      fetchHistoryPermits();
    }
  }, [activeTab]);

  // 🔁 Polling every 5 sec
  useEffect(() => {
    if (activeTab !== "ACTIVE") return;

    const interval = setInterval(() => {
      fetchActivePermits();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // ✅ Delete handler
  const handleDelete = (id) => {
    console.log("Delete permit:", id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "REQUEST":
        return <WorkPermitForm />;

      case "ACTIVE":
        return (
          <>
            {loading ? (
              <p style={{ padding: "20px" }}>Loading permits...</p>
            ) : (
              <>
                {/* 🔴 Pending */}
                <div style={{ marginBottom: "30px" }}>
                  <h2>Pending Requests ({pendingPermits.length})</h2>

                  <PermitTable
                    permits={pendingPermits}
                    onDelete={handleDelete}
                    onUpdate={handlePermitUpdate}
                    type="PENDING"
                  />
                </div>

                {/* ✅ Approved / Rejected */}
                <div>
                  <h2>Approved / Rejected</h2>

                  <PermitTable
                    permits={processedPermits}
                    onDelete={handleDelete}
                    onUpdate={handlePermitUpdate}
                    type="PROCESSED"
                  />
                </div>
              </>
            )}
          </>
        );

      case "HISTORY":
        return (
          <>
            {loading ? (
              <p style={{ padding: "20px" }}>Loading history...</p>
            ) : (
              <PermitHistory permits={historyPermits} />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="wp-container">
      {/* Header */}
      <div
        className="wp-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1>Work Permit System</h1>
          <p>Manage permits across all plants and departments</p>
        </div>
      </div>

      {/* Tabs */}
      <PermitTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingPermits.length}
      />

      {/* Content */}
      <div className="wp-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default WorkPermitManager;