import React from "react";

import API from "../../services/api";
import { getUser } from "../../utils/getUser";
import { toast } from "react-toastify";

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "-";

  const now = new Date();
  const past = new Date(timestamp);

  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return past.toLocaleDateString();
};

const PermitTable = ({ permits = [], onUpdate }) => {
    const user = getUser();

    const roleRaw =
      user?.role?.name ||
      user?.role ||
      "";

    const role = (roleRaw || "").toLowerCase();

    const canApprove = true;

    console.log("ROLE:", role);
    console.log("CAN APPROVE:", canApprove);

    const handleApprove = async (id) => {
      try {
        await API.put(`/permits/${id}/approve`);
        toast.success("Permit Approved");

        // 🔥 update UI instantly
        if (onUpdate) {
          onUpdate(id, "APPROVED");
        }

      } catch (err) {
        console.error(err);
        toast.error("Approval failed");
      }
    };

    const handleReject = async (id) => {
      try {
        await API.put(`/permits/${id}/reject`);
        toast.success("Permit Rejected");

        if (onUpdate) {
          onUpdate(id, "REJECTED");
        }

      } catch (err) {
        console.error(err);
        toast.error("Rejection failed");
      }
    };

  return (
    <div className="card">
      <h2>Active Permits</h2>

      <table className="wp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plant</th>
            <th>Zone</th>
            <th>Activity</th>
            <th>Work Type</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Submitted</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {!permits || permits.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No active permits found
              </td>
            </tr>
          ) : (
            permits.map((permit, index) => {
              // 🔍 DEBUG (keep temporarily)
              console.log("PERMIT:", permit);

              return (
                <tr key={permit?.id || index}>

                  {/* Permit Code */}
                  <td>{permit.permitCode || "-"}</td>

                  {/* Plant */}
                  <td>{permit.plant?.name || "-"}</td>

                  {/* Zone */}
                  <td>{permit.zone || "-"}</td>

                  {/* Activity */}
                  <td>{permit.activity || "-"}</td>

                  {/* Work Type */}
                  <td>
                    {permit.workCategory === "STANDARD"
                      ? "Standard Work"
                      : permit.workCategory === "CRITICAL"
                      ? "Critical Work"
                      : "-"}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`status ${String(permit.status).toLowerCase()}`}
                    >
                      {permit.status || "-"}
                    </span>
                  </td>

                  {/* 🔥 SAFE CREATED BY (IMPORTANT FIX) */}
                  <td>
                    {permit.createdBy
                      ? `${permit.createdBy.firstName || ""} ${permit.createdBy.lastName || ""}`
                      : "-"}
                  </td>

                  {/* Date */}
                  <td>{formatTimeAgo(permit.createdAt)}</td>

                  {/* Actions */}
                  <td className="action-cell">

                    {/* Always visible */}
                    <button className="icon-btn view-btn">👁</button>

                    {/* Only Admin */}
                    {!canApprove && (
                      <>
                        <button className="icon-btn edit-btn">✏️</button>
                        <button className="icon-btn delete-btn">🗑</button>
                      </>
                    )}

                    {/* Only Officer / Manager */}
                    {canApprove && permit.status === "PENDING" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(permit.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => handleReject(permit.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                  </td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermitTable;