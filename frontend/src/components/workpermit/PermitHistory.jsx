import React from "react";

const PermitHistory = ({ permits = [] }) => {
  return (
    <div className="card">
      <h2>Permit History</h2>

      <table className="wp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plant</th>
            <th>Department</th>
            <th>Activity</th>
            <th>Work Category</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {permits.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No permit history available
              </td>
            </tr>
          ) : (
            permits.map((permit) => (
              <tr key={permit.id}>

                {/* ✅ Permit Code */}
                <td>{permit.permitCode || "-"}</td>

                {/* ✅ Nested Mapping */}
                <td>{permit.plant?.name || "-"}</td>
                <td>{permit.department?.name || "-"}</td>

                {/* ✅ Activity */}
                <td>{permit.activity || "-"}</td>

                {/* ✅ Work Category */}
                <td>
                  {permit.workCategory === "STANDARD"
                    ? "Standard Work"
                    : "Critical Work"}
                </td>

                {/* ✅ Status */}
                <td>
                  <span className={`status ${permit.status?.toLowerCase()}`}>
                    {permit.status}
                  </span>
                </td>

                {/* ✅ Created By */}
                <td>
                  {permit.createdBy
                    ? permit.createdBy.fullName
                    : "-"}
                </td>

                {/* ✅ Date */}
                <td>
                  {permit.createdAt
                    ? new Date(permit.createdAt).toISOString().split("T")[0]
                    : "-"}
                </td>

                {/* VIEW ONLY */}
                <td className="action-cell">
                  <button className="icon-btn view-btn" title="View">
                    👁
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermitHistory;