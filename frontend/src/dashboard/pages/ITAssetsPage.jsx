import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/api";
import "./ITAssetsPage.css";

const ASSET_TYPES = [
  "PC",
  "Laptop",
  "CPU",
  "Printer",
  "Camera",
  "Facial Recognition Terminal",
  "Telephone"
];

const BRAND_OPTIONS = {
  PC: ["DELL", "HP", "ACER", "LENOVO"],
  Laptop: ["DELL", "HP", "ACER", "LENOVO"],

  Camera: [
    "HikVision",
    "CP Plus",
    "ZICOM",
    "Samsung",
    "Sony",
    "Bosch",
    "Godrej",
    "Dahua",
    "TP-Link",
    "Panasonic"
  ],

  Printer: [
    "HP",
    "Canon",
    "Epson",
    "Brother"
  ],

  "Facial Recognition Terminal": [
    "Nialabs",
    "ESSL AI Face ERIS",
    "ZKTeco MiniTA Face",
    "PRO 1900",
    "Team Office Z912",
    "Matrix COSEC Agro"
  ],

  Telephone: [
    "Panasonic",
    "AT&T",
    "Motorola",
    "Beetel",
    "Hola!",
    "Gigaset"
  ],

  CPU: [
    "Intel (Core / Xeon / Core Ultra)",
    "AMD (Ryzen / Threadripper)"
  ]
};
const PLANTS = [
  { id: 1, name: "UREA" },
  { id: 2, name: "AMMONIA" },
  { id: 3, name: "Heavy Water" },
  { id: 4, name: "Boiler Briquette" },
  { id: 5, name: "Steam Generation Plant (SGP)" },
  { id: 6, name: "Water Treatment Plant (WTP)" },
  { id: 7, name: "Effluent Treatment Plant (ETP)" },
  { id: 8, name: "Nitrogen Phosphorus Potassium (NPK)" },
  { id: 9, name: "Production Handling Plant (PHP)" },
  { id: 10, name: "Chemical Group of Plants (CGP)" }
];

const DEPARTMENTS = [
  { id: 1, name: "Electrical" },
  { id: 2, name: "Instrumentation" },
  { id: 3, name: "Admin" },
  { id: 4, name: "MS-IT" },
  { id: 5, name: "Hard Water" },
  { id: 6, name: "Bagging" },
  { id: 7, name: "Human Resources (HR)" },
  { id: 8, name: "Human Resource Development (HRD)" },
  { id: 9, name: "Engineering, Environment & Sustainability (EES)" },
  { id: 10, name: "Finance" },
  { id: 11, name: "Purchase" },
  { id: 12, name: "Production" },
  { id: 13, name: "Mechanical" }
];

const REASONS = ["Monitoring", "Management", "Development", "Others"];
const STATUS = ["New", "Working", "Repair", "Refurbished", "Discarded"];

const ITAssetsPage = () => {

  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState("ALL");
  const [plantFilter, setPlantFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    assetType: "",
    brand: "",
    deviceNumber: "",
    plantId: "",
    departmentId: "",
    incharge: "",
    reason: "",
    otherReason: "",
    status: ""
  });

  /* ============================
     LOAD ASSETS
  ============================ */

  const fetchAssets = async () => {
    try {
      const res = await API.get("/assets");
      setAssets(res.data);
    } catch (err) {
      console.error("Error loading assets:", err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  /* ============================
     FORM CHANGE
  ============================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assetType") {
      setFormData({
        ...formData,
        assetType: value,
        brand: "" // reset brand
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  /* ============================
     SAVE ASSET
  ============================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      assetType: formData.assetType,
      brand: formData.brand,
      deviceNumber: formData.deviceNumber,

      plantId: formData.plantId
        ? Number(formData.plantId)
        : null,

      departmentId: Number(formData.departmentId),

      incharge: formData.incharge,

      reason:
        formData.reason === "Others"
          ? formData.otherReason
          : formData.reason,

      status: formData.status
    };

    try {

      await API.post("/assets", payload);

      fetchAssets();

      setFormData({
        assetType: "",
        brand: "",
        deviceNumber: "",
        plantId: "",
        departmentId: "",
        incharge: "",
        reason: "",
        otherReason: "",
        status: ""
      });

      setShowForm(false);

    } catch (err) {
        console.error("Error saving asset:", err.response?.data || err);
      }
  };

  /* ============================
     DELETE ASSET
  ============================ */

  const deleteAsset = async (id) => {

    if (!window.confirm("Delete this asset?")) return;

    try {

      await API.delete(`/assets/${id}`);

      fetchAssets();

    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ============================
     FILTER LOGIC
  ============================ */

  /* ============================
     FILTER LOGIC (OPTIMIZED)
  ============================ */

  const filteredAssets = useMemo(() => {

    return assets.filter((asset) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        asset.assetType?.toLowerCase().includes(searchText) ||
        asset.brand?.toLowerCase().includes(searchText) ||
        asset.deviceNumber?.toLowerCase().includes(searchText) ||
        asset.incharge?.toLowerCase().includes(searchText);

      const matchesAsset =
        assetFilter === "ALL" || asset.assetType === assetFilter;

      const matchesPlant =
        plantFilter === "ALL" || asset.plant?.name === plantFilter;

      const matchesDepartment =
        departmentFilter === "ALL" || asset.department?.name === departmentFilter;

      return matchesSearch && matchesAsset && matchesPlant && matchesDepartment;

    });

  }, [assets, search, assetFilter, plantFilter, departmentFilter]);


  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>IT Assets Management</h3>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Asset
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="card shadow mb-4">
          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-4 mb-3">
                  <label>Asset Type</label>
                  <select
                    className="form-select"
                    name="assetType"
                    value={formData.assetType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {ASSET_TYPES.map((a, i) => (
                      <option key={i} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Brand</label>
                  <select
                    className="form-select"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    disabled={!formData.assetType}
                    required
                  >
                    <option value="">Select</option>

                    {BRAND_OPTIONS[formData.assetType]?.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Device Number</label>
                  <input
                    className="form-control"
                    name="deviceNumber"
                    value={formData.deviceNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Plant</label>
                  <select
                    className="form-select"
                    name="plantId"
                    value={formData.plantId}
                    onChange={handleChange}
                  >
                    <option value="">None / Corporate</option>

                    {PLANTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Department</label>
                  <select
                    className="form-select"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>

                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Incharge</label>
                  <input
                    className="form-control"
                    name="incharge"
                    value={formData.incharge}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Reason</label>
                  <select
                    className="form-select"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {REASONS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Other Reason</label>
                  <input
                    className="form-control"
                    name="otherReason"
                    value={formData.otherReason}
                    onChange={handleChange}
                    disabled={formData.reason !== "Others"}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {STATUS.map((s, i) => (
                      <option key={i}>{s}</option>
                    ))}
                  </select>
                </div>

              </div>

              <button className="btn btn-success">
                Save Asset
              </button>

            </form>

          </div>
        </div>
      )}

      {/* TABLE */}

      {/* FILTER BAR */}

      <div className="card shadow filter-card mb-3">
        <div className="card-body">

          <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">

            {/* ASSET TYPE BUTTONS */}

            <div className="btn-group flex-wrap asset-filter-group">

              <button
                className={`btn ${assetFilter === "ALL" ? "btn-dark" : "btn-outline-dark"}`}
                onClick={() => setAssetFilter("ALL")}
              >
                All
              </button>

              {ASSET_TYPES.map((type) => (

                <button
                  key={type}
                  className={`btn ${assetFilter === type ? "btn-dark" : "btn-outline-dark"}`}
                  onClick={() => setAssetFilter(type)}
                >
                  {type}
                </button>

              ))}

            </div>

            {/* PLANT + DEPARTMENT FILTER */}

            <div className="d-flex gap-2">

              <select
                className="form-select filter-select"
                style={{ maxWidth: "200px" }}
                value={plantFilter}
                onChange={(e) => setPlantFilter(e.target.value)}
              >
                <option value="ALL">All Plants</option>

                {PLANTS.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}

              </select>

              <select
                className="form-select filter-select"
                style={{ maxWidth: "220px" }}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="ALL">All Departments</option>

                {DEPARTMENTS.map((d) => (
                  <option key={d.id}>{d.name}</option>
                ))}

              </select>

            </div>

          </div>

          {/* SEARCH BAR */}

          <input
            type="text"
            placeholder="Search assets..."
            className="form-control search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>Asset</th>
                <th>Brand</th>
                <th>Device</th>
                <th>Plant</th>
                <th>Department</th>
                <th>Incharge</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredAssets.map(asset => (

                <tr key={asset.id}>
                  <td>{asset.assetType}</td>
                  <td>{asset.brand}</td>
                  <td>{asset.deviceNumber}</td>
                  <td>{asset.plant?.name || "Corporate"}</td>
                  <td>{asset.department?.name}</td>
                  <td>{asset.incharge}</td>
                  <td>{asset.reason}</td>
                  <td>{asset.status}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default ITAssetsPage;