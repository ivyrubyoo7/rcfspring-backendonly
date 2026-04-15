import React from "react";

const tabs = [
  { key: "REQUEST", label: "Request Permit" },
  { key: "ACTIVE", label: "Active Permits" },
  { key: "HISTORY", label: "Permit History" },
];

const PermitTabs = ({ activeTab, setActiveTab, pendingCount }) => {
  return (
    <div className="wp-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => setActiveTab(tab.key)}
        >
          <>
            {tab.label}

            {tab.key === "ACTIVE" && pendingCount > 0 && (
              <span className="permit-badge">{pendingCount}</span>
            )}
          </>
        </button>
      ))}
    </div>
  );
};

export default PermitTabs;