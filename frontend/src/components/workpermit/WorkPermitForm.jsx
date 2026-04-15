import React, { useState } from "react";
import { useEffect } from "react";
import API from "../../services/api";

const PLANT_MAP = {
  UREA: 1,
  AMMONIA: 2,
  "HEAVY WATER": 3,
  "BOILER BRIQUETTE": 4,
  "STEAM GENERATION": 5,
  BAGGING: 6,
  "PRODUCTION HANDLING PLANT (PHP)": 7,
  "CHEMICAL GROUP OF PLANT (CGP)": 8,
  "WATER TREATMENT PLANT (WTP)": 9,
  "EFFLUENT TREATMENT PLANT (ETP)": 10,
};

const DEPARTMENT_MAP = {
  ELECTRICAL: 1,
  INSTRUMENTATION: 2,
  MS_IT: 3,
  BAGGING: 4,
  PRODUCTION: 5,
  MECHANICAL: 6,
};

const getPlantId = (plant) => PLANT_MAP[plant];
const getDepartmentId = (dept) => DEPARTMENT_MAP[dept];

const SAFETY_RULES = {
  AMMONIA: {
    COMMON: ["Ammonia PPE", "Gas Monitoring"],

    INSTRUMENTATION: ["Gas Test < 25 ppm", "SCBA Available", "LOTO Applied"],
    ELECTRICAL: ["Power Isolation", "Insulated Tools"],
    MECHANICAL: ["Pressure Valve Check"],
    PRODUCTION: ["Process Safety Check"],
    BAGGING: ["Material Handling Safety"],
  },

  UREA: {
    COMMON: ["Dust Mask", "Ventilation Check"],

    MECHANICAL: ["Pressure Release", "Valve Lock"],
    ELECTRICAL: ["Power Lockout"],
    PRODUCTION: ["Line Inspection"],
    BAGGING: ["Packaging Safety"],
  },

  "HEAVY WATER": {
    COMMON: ["Radiation Safety", "Protective Suit"],

    INSTRUMENTATION: ["Sensor Calibration"],
    ELECTRICAL: ["Circuit Isolation"],
  },

  "BOILER BRIQUETTE": {
    COMMON: ["Heat PPE", "Fire Safety"],

    MECHANICAL: ["Boiler Check"],
    ELECTRICAL: ["Panel Safety"],
  },

  "STEAM GENERATION": {
    COMMON: ["Steam Leak Check", "Pressure Monitoring"],

    MECHANICAL: ["Boiler Inspection"],
    INSTRUMENTATION: ["Gauge Calibration"],
  },

  BAGGING: {
    COMMON: ["Dust Control", "Mask Mandatory"],

    PRODUCTION: ["Conveyor Safety"],
  },

  "PRODUCTION HANDLING PLANT (PHP)": {
    COMMON: ["Material Handling", "Spill Control"],

    MECHANICAL: ["Equipment Check"],
    ELECTRICAL: ["Motor Safety"],
  },

  "CHEMICAL GROUP OF PLANT (CGP)": {
    COMMON: ["Chemical PPE", "Hazard Label"],

    INSTRUMENTATION: ["Gas Detection"],
  },

  "WATER TREATMENT PLANT (WTP)": {
    COMMON: ["Water Quality Check"],

    MECHANICAL: ["Pump Inspection"],
    ELECTRICAL: ["Panel Check"],
  },

  "EFFLUENT TREATMENT PLANT (ETP)": {
    COMMON: ["Waste Handling", "Gas Ventilation"],

    MECHANICAL: ["Pipeline Check"],
  },

  // 🔥 SPECIAL: MS-IT (Independent)
  GENERAL: {
    MS_IT: [
      "System Backup",
      "Network Check",
      "Antivirus Updated",
      "Access Control Verified",
    ],
  },
};
const WorkPermitForm = () => {
  const [formData, setFormData] = useState({
    plant: "",
    department: "",
    zone: "",
    activity: "",
    riskLevel: "LOW",
  });

  const [workers, setWorkers] = useState([
    { name: "", role: "", id: "" },
  ]);

    const [selectedChecklist, setSelectedChecklist] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [customItem, setCustomItem] = useState("");

    useEffect(() => {
      // Reset ONLY when plant changes
      setSelectedChecklist([]);
      setSelectedOption("");
      setCustomItem("");

      setFormData((prev) => ({
        ...prev,
        department: [],
      }));
    }, [formData.plant]);

  // =============================
  // HANDLE FORM CHANGE
  // =============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // WORKER HANDLING
  // =============================
  const handleWorkerChange = (index, field, value) => {
    const updated = [...workers];
    updated[index][field] = value;
    setWorkers(updated);
  };

  const addWorker = () => {
    setWorkers([...workers, { name: "", role: "", id: "" }]);
  };

  const removeWorker = (index) => {
    const updated = workers.filter((_, i) => i !== index);
    setWorkers(updated);
  };

  // =============================
  // SAFETY CHECKLIST
  // =============================
//   const handleSafety = (e) => {
//     setSafety({
//       ...safety,
//       [e.target.name]: e.target.checked,
//     });
//   };

  // =============================
  // SUBMIT
  // =============================
  const handleSubmit = async () => {
    try {
      const payload = {
        plantId: getPlantId(formData.plant),
        departmentIds: [getDepartmentId(formData.department)],

        zone: formData.zone,
        activity: formData.activity,

        workCategory:
          formData.riskLevel === "LOW" ? "STANDARD" : "CRITICAL",

        personnel: workers.map((w) => ({
          name: w.name,
          role: w.role,
          employeeId: w.id,
        })),

        safetyChecklist: selectedChecklist.map((item) => ({
          checklistItem: item,
          isChecked: true,
        })),
      };

      console.log("🔥 FINAL PAYLOAD:", payload);

      const res = await API.post("/permits", payload);

      console.log("✅ Response:", res.data);
      alert("✅ Permit Created Successfully");

    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("❌ Error submitting permit");
    }
  };

  return (
    <div className="card">
      <h2>Request Work Permit</h2>

      {/* =============================
          BASIC DETAILS
      ============================= */}
      <div className="form-grid" >
        <div>
          <label>Plant</label>
          <select name="plant" onChange={handleChange}>
            <option value="">Select Plant</option>
            <option value="UREA">Urea</option>
            <option value="AMMONIA">AMMONIA</option>
            <option value="HEAVY WATER">Heavy Water</option>
            <option value="BOILER BRIQUETTE">Boiler Briquette</option>
            <option value="STEAM GENERATION">Steam Generation</option>
            <option value="BAGGING">Bagging</option>
            <option value="PRODUCTION HANDLING PLANT (PHP)">PRODUCTION HANDLING PLANT (PHP)</option>
            <option value="CHEMICAL GROUP OF PLANT (CGP)">CHEMICAL GROUP OF PLANT (CGP)</option>
            <option value="WATER TREATMENT PLANT (WTP)">WATER TREATMENT PLANT (WTP)</option>
            <option value="EFFLUENT TREATMENT PLANT (ETP)">EFFLUENT TREATMENT PLANT (ETP)</option>
          </select>
        </div>

        <div>
          <label>Department</label>
          <select
            name="department"

            value={formData.department}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (opt) => opt.value
              );

              setFormData({
                ...formData,
                department: selected,
              });
            }}
          >
            <option value="" disabled>
              Select Department
            </option>

            <option value="ELECTRICAL">Electrical</option>
            <option value="INSTRUMENTATION">Instrumentation</option>

            <option value="MS_IT">MS-IT</option>

            <option value="BAGGING">Bagging</option>

            <option value="PRODUCTION">Production</option>
            <option value="MECHANICAL">Mechanical</option>
          </select>
        </div>

        <div>
          <label>Zone</label>
          <input name="zone" onChange={handleChange} />
        </div>

        <div>
          <label>Activity</label>
          <input name="activity" onChange={handleChange} />
        </div>

        <div>
          <label>Work Category</label>
          <select name="riskLevel" onChange={handleChange}>
            <option value="" disabled>Select Work Category</option>
            <option value="LOW">Standard Work</option>
            <option value="HIGH">Critical Work</option>
          </select>
        </div>
      </div>

      {/* =============================
          WORKERS
      ============================= */}
      <h3>Personnel</h3>

      {workers.map((worker, index) => (
        <div key={index} className="worker-row">
          <input
            placeholder="Name"
            value={worker.name}
            onChange={(e) =>
              handleWorkerChange(index, "name", e.target.value)
            }
          />

          <select
            value={worker.role}
            onChange={(e) =>
              handleWorkerChange(index, "role", e.target.value)
            }
          >
            <option value="" disabled hidden>
                Select Role
              </option>
            <option value="ADMIN">Admin</option>
            <option value="OFFICER">Officer</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="CONTRACT">Contract</option>
          </select>

          <input
            placeholder="Employee ID"
            value={worker.id}
            onChange={(e) =>
              handleWorkerChange(index, "id", e.target.value)
            }
          />

          {workers.length > 1 && (
            <button
              className="danger-btn"
              onClick={() => removeWorker(index)}
            >
              🗑️
            </button>
          )}
        </div>
      ))}

      <div className="inline-action">
        <button className="mini-btn" onClick={addWorker}>
          + Add
        </button>
      </div>



      {/* =============================
          SAFETY CHECKLIST
      ============================= */}
    <h3>Safety Checklist</h3>

    {(() => {
      const plant = formData.plant;
      const departments = formData.department || [];

      let checklistItems = [];

      if (departments.includes("MS_IT")) {
        checklistItems = [
          ...(SAFETY_RULES.GENERAL?.MS_IT || []),
        ];
      }

      if (plant && departments.length > 0) {
        checklistItems = [
          ...(SAFETY_RULES[plant]?.COMMON || []),
          ...departments.flatMap(
            (dept) => SAFETY_RULES[plant]?.[dept] || []
          ),
        ];
      }

      checklistItems = [...new Set(checklistItems)];

      return (
        <>

        <div className="wp-container">
          {/* INLINE SELECT + ADD */}
          <div className="inline-row">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select Safety Item</option>

              {checklistItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}

              <option value="CUSTOM">+ Add Custom</option>
            </select>

            <button
              type="button"
              className="mini-btn"
              onClick={() => {
                if (
                  selectedOption &&
                  selectedOption !== "CUSTOM" &&
                  !selectedChecklist.includes(selectedOption)
                ) {
                  setSelectedChecklist((prev) => [
                    ...prev,
                    selectedOption,
                  ]);
                  setSelectedOption("");
                }
              }}
            >
              + Add
            </button>
          </div>

          {/* CUSTOM INPUT */}
          {selectedOption === "CUSTOM" && (
            <div style={{ marginTop: "10px" }}>
              <input
                placeholder="Enter custom safety item"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
              />

              <button
                type="button"
                className="mini-btn"
                onClick={() => {
                  const trimmed = customItem.trim();

                  if (
                    trimmed &&
                    !selectedChecklist.includes(trimmed)
                  ) {
                    setSelectedChecklist((prev) => [
                      ...prev,
                      trimmed,
                    ]);
                    setCustomItem("");
                    setSelectedOption("");
                  }
                }}
              >
                Add Custom
              </button>
            </div>
          )}

          {/* CHECKLIST DISPLAY */}
          {/* CHECKLIST DISPLAY */}
          <div className="checklist-box">
            {selectedChecklist.length === 0 && (
              <p style={{ color: "#64748b", textAlign: "center", padding: "10px" }}>
                No safety items selected
              </p>
            )}

            {selectedChecklist.map((item, index) => (
              <div key={index} className="check-item">
                {/* Visual Checkbox */}
                <input type="checkbox" defaultChecked readOnly />

                {/* Item Text */}
                <span className="check-text">{item}</span>

                {/* Fixed Delete Button */}
                <button
                  type="button"
                  className="delete-icon-btn"
                  onClick={() => {
                    setSelectedChecklist(prev => prev.filter((_, i) => i !== index));
                  }}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          </div>
        </>
      );
    })()}
      {/* =============================
          SUBMIT
      ============================= */}
      <br />
      <br />

      <div className="form-actions">
        <button type="button" className="primary-btn" onClick={handleSubmit}>
          Submit Permit
        </button>
      </div>
    </div>
  );
};

export default WorkPermitForm;