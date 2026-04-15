import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx'; // Import for Excel functionality
import "./AdminReports.css";

// ─── Shared Static Option Maps (Synced with UserEntryCard) ──────────────────
const DEPARTMENTS = [
  { id: 1, label: "Electrical" }, { id: 2, label: "Instrumentation" },
  { id: 3, label: "Admin" }, { id: 4, label: "MS-IT" },
  { id: 5, label: "Hard Water" }, { id: 6, label: "Bagging" },
  { id: 7, label: "Human Resources (HR)" }, { id: 12, label: "Production" },
  { id: 13, label: "Mechanical"}
];

const PLANTS = [
  { id: 1, label: "UREA" }, { id: 2, label: "AMMONIA" },
  { id: 3, label: "Heavy Water" }, { id: 5, label: "Steam Generation Plant (SGP)" },
  { id: 8, label: "Nitrogen Phosphorus Potassium (NPK)" }
];

const REPORT_TYPES = [
  { id: "USER", label: "User Database" },
  { id: "ASSET", label: "IT Asset Inventory" },
  { id: "PERMIT", label: "Work Permit Logs" }
];

export default function AdminReports() {
  const [config, setConfig] = useState({
    systemName: "RCF Command Center",
    systemId: "RCF-PROD-2026",
    reportType: "USER",
    departmentId: "",
    plantId: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()),
    layout: "table-text", // "table-only" or "table-text"
    includeSignatures: true
  });

  const [data, setData] = useState([]);

  // ─── Mock Data Fetching Logic ─────────────────────────────────────────────
  useEffect(() => {
    // In a real app, this would be: fetch(`/api/reports/${config.reportType}?dept=${config.departmentId}...`)
    const mockData = [
      { id: "001", name: "Loop Calibration", target: "Instrumentation", status: "Verified", date: config.date },
      { id: "002", name: "System Audit", target: "MS-IT", status: "Pending", date: config.date },
      { id: "003", name: "Safety Check", target: "Ammonia Plant", status: "Critical", date: config.date },
    ];
    setData(mockData);
  }, [config.reportType, config.date]);

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // ─── Export Logic ────────────────────────────────────────────────────────

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReportData");
    XLSX.writeFile(workbook, `${config.reportType}_Report_${config.date}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid report-dashboard">
      {/* ─── CONFIGURATION SECTION (Hidden on Print) ─── */}
      <div className="row no-print mb-4">
        <div className="col-12">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Admin Report Generator</h3>
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={downloadExcel}>
                    <i className="bi bi-file-earmark-spreadsheet me-2"></i> Export Excel (.xlsx)
                  </button>
                  <button className="btn btn-primary" onClick={handlePrint}>
                    <i className="bi bi-printer me-2"></i> Print to PDF
                  </button>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-3">
                  <label>System Name</label>
                  <input type="text" name="systemName" className="form-control" value={config.systemName} onChange={handleConfigChange} />
                </div>
                <div className="col-md-3">
                  <label>System ID</label>
                  <input type="text" name="systemId" className="form-control" value={config.systemId} onChange={handleConfigChange} />
                </div>
                <div className="col-md-2">
                  <label>Report Category</label>
                  <select name="reportType" className="form-select" value={config.reportType} onChange={handleConfigChange}>
                    {REPORT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                <div className="col-md-2">
                  <label>Date</label>
                  <input type="date" name="date" className="form-control" value={config.date} onChange={handleConfigChange} />
                </div>
                <div className="col-md-2">
                  <label>Time</label>
                  <input type="time" name="time" className="form-control" value={config.time} onChange={handleConfigChange} />
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-3">
                  <label>Filter Department</label>
                  <select name="departmentId" className="form-select" value={config.departmentId} onChange={handleConfigChange}>
                    <option value="">All Departments</option>
                    {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Filter Plant</label>
                  <select name="plantId" className="form-select" value={config.plantId} onChange={handleConfigChange}>
                    <option value="">All Plants</option>
                    {PLANTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label>Report Layout</label>
                  <select name="layout" className="form-select" value={config.layout} onChange={handleConfigChange}>
                    <option value="table-only">Table Only</option>
                    <option value="table-text">Text + Tables (Executive)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PRINTABLE DOCUMENT PREVIEW ─── */}
      <div className="report-preview-outer">
        <div className="printable-document">
          {/* Header */}
          <div className="doc-header d-flex justify-content-between">
            <div className="rcf-brand">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Rashtriya_Chemicals_%26_Fertilizers_Logo.svg/960px-Rashtriya_Chemicals_%26_Fertilizers_Logo.svg.png"
                alt="RCF Logo"
                className="rcf-logo-img"
              />

              <div className="rcf-text">
                <h2>RCF</h2>
                <p>Rashtriya Chemicals & Fertilizers Ltd.</p>
              </div>
            </div>
            <div className="doc-meta text-end">
              <h5 className="m-0">{config.systemName}</h5>
              <p className="m-0 small"><strong>System ID:</strong> {config.systemId}</p>
              <p className="m-0 small"><strong>Generated:</strong> {config.day}, {config.date} | {config.time}</p>
            </div>
          </div>

          <div className="doc-divider" />

          {/* Body */}
          <div className="doc-content">
            <h4 className="text-center mb-4 text-uppercase decoration-underline">
              {REPORT_TYPES.find(r => r.id === config.reportType)?.label} Summary Report
            </h4>

            {config.layout === "table-text" && (
              <div className="executive-summary mb-4">
                <p><strong>To:</strong> Plant Administration / Safety Audit Committee</p>
                <p><strong>Subject:</strong> Formal log of system data for {config.reportType} activities.</p>
                <p className="text-justify">
                  This computer-generated report provides a comprehensive overview of
                  operational data recorded within the <strong>{config.systemId}</strong> framework.
                  The data below has been filtered by selected plant parameters and
                  validated for accuracy as of {config.date}.
                </p>
              </div>
            )}

            <table className="table table-bordered report-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Description / Entity</th>
                  <th>Plant/Dept Area</th>
                  <th>Log Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.target}</td>
                    <td>
                      <span className={`report-status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {config.layout === "table-text" && (
              <div className="additional-notes mt-4">
                <h6>Official Observations:</h6>
                <div className="notes-placeholder">
                  Operational parameters for the Ammonia/Urea cycle remain within standard safety thresholds.
                  No unauthorized access or data discrepancies were flagged during this generation window.
                </div>
              </div>
            )}
          </div>

          {/* Signature Block */}
          {config.includeSignatures && (
            <div className="signature-grid mt-auto">
              <div className="row">
                <div className="col-4">
                  <div className="signature-box">
                    <div className="signature-line" />
                    <p>Generated By (Admin)</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="signature-box">
                    <div className="signature-line" />
                    <p>Verified By (HOD)</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="signature-box">
                    <div className="signature-line" />
                    <p>Security/Safety Officer</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="doc-footer text-center small text-muted">
            <p className="m-0">Page 1 of 1 — Confidential Internal Document — {config.systemId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}