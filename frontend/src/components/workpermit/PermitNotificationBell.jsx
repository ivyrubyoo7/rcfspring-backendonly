import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { getUser } from "../../utils/getUser";
import "./workpermit.css";
import { toast } from "react-toastify";

const PermitNotificationBell = () => {
  const [permits, setPermits] = useState([]);
  const [open, setOpen] = useState(false);

  const user = getUser();

  // ✅ SAFE ROLE EXTRACTION
  const roleRaw =
    user?.role?.name ||
    user?.role ||
    "";

  const role = (roleRaw || "").toUpperCase();

  console.log("ROLE FINAL:", role);

  // 🚨 TEMP DEBUG (FORCE SHOW)
  const isAllowed =
    role.includes("MANAGER") ||
    role.includes("OFFICER"); // fallback for now

  if (!isAllowed) return null;

  // ✅ Fetch approvals
  const fetchApprovals = async () => {
    try {
      const res = await API.get("/permits/pending-approvals");

      if (res.data.length > 0 && permits.length === 0) {
        toast.info(`New permit "${res.data[0].activity}" awaiting approval`);
      }

      setPermits(res.data || []);
    } catch (err) {
      console.error("Error fetching approvals", err);
      setPermits([]);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.put(`/permits/${id}/approve`);
      toast.success("Permit Approved");


      // remove from UI
      setPermits((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/permits/${id}/reject`);
      toast.success("Permit Rejected");

      setPermits((prev) => prev.filter((p) => p.id !== id));

      // 🔥 REFRESH TABLE DATA
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed");
    }
  };

  return (
    <div style={{ position: "inline-block" }}>

      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          position: "inline-block"
        }}
      >
        🔔

        {permits.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px"
            }}
          >
            {permits.length}
          </span>
        )}
      </button>

      {/* 📦 Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "40px",
            width: "320px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 999
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <strong>Notifications</strong>
            <span style={{ color: "green", cursor: "pointer", fontSize: "14px" }}>
              Mark all read
            </span>
          </div>

          {/* List */}
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {permits.length === 0 ? (
              <p style={{ padding: "15px" }}>No notifications</p>
            ) : (
              permits.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  {/* Green dot */}
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "green",
                      borderRadius: "50%",
                      marginTop: "6px"
                    }}
                  />

                  <div>
                    <p style={{ margin: 0 }}>
                        <b>
                          {p.createdBy?.name ||
                           `${p.createdBy?.firstName || ""} ${p.createdBy?.lastName || ""}` ||
                           "User"}
                        </b> submitted permit
                      <b> "{p.activity}"</b>
                    </p>

                    <small style={{ color: "#888" }}>
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleString()
                        : "just now"}
                    </small>

                    {/* ACTIONS */}
                    <div style={{ marginTop: "5px", display: "flex", gap: "10px" }}>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(p.id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => handleReject(p.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PermitNotificationBell;