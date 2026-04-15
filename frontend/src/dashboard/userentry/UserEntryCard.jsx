import React, { useState, useEffect, useRef } from "react";
import "./UserEntryCard.css";
// ─── Static Option Maps ────────────────────────────────────────────────────

const ROLES = [
  { id: 1, label: "ADMIN" },
  { id: 2, label: "OFFICER" },
  { id: 3, label: "MANAGER" },
  { id: 4, label: "EMPLOYEE" },
  { id: 5, label: "CONTRACTOR"},
];

const DESIGNATIONS = [
  { id: 1, label: "Head Of Department (HOD)", roleId: 2 },
  { id: 2, label: "General Manager (GM)", roleId: 2 },
  { id: 3, label: "Chief Manager (CM)", roleId: 2 },
  { id: 4, label: "Deputy General Manager (DGM)", roleId: 2 },
  { id: 5, label: "Assistant Manager (AM)", roleId: 3 },
  { id: 6, label: "Senior Engineer", roleId: 4 },
  { id: 7, label: "Engineer", roleId: 4 },
  { id: 8, label: "Supervisor", roleId: 4 },
  { id: 9, label: "Operator", roleId: 4 },
  { id: 10, label: "Chief Manager (HR)", roleId: 2 },
  { id: 11, label: "Secretary Associate", roleId: 3 },
  { id: 12, label: "Assistant Secretary Associate", roleId: 4 },
  { id: 13, label: "Executive Secretary", roleId: 3 },
  { id: 14, label: "Apprentice", roleId: 5 },
  { id: 15, label: "Vocational Trainee (VT)", roleId: 5 },
  { id: 16, label: "Management Trainee (MT)", roleId: 5 },
  { id: 17, label: "Contract Worker", roleId: 5},
];

const DEPARTMENTS = [
  { id: 1, label: "Electrical" },
  { id: 2, label: "Instrumentation" },
  { id: 3, label: "Admin" },
  { id: 4, label: "MS-IT" },
  { id: 5, label: "Hard Water" },
  { id: 6, label: "Bagging" },
  { id: 7, label: "Human Resources (HR)" },
  { id: 8, label: "Human Resource Development (HRD)" },
  { id: 9, label: "Engineering, Environment & Sustainability (EES)" },
  { id: 10, label: "Finance" },
  { id: 11, label: "Purchase" },
  { id: 12, label: "Production" },
  { id: 13, label: "Mechanical"},
];

const PLANTS = [
  { id: 1, label: "UREA" },
  { id: 2, label: "AMMONIA" },
  { id: 3, label: "Heavy Water" },
  { id: 4, label: "Boiler Briquette" },
  { id: 5, label: "Steam Generation Plant (SGP)" },
  { id: 6, label: "Water Treatment Plant (WTP) " },
  { id: 7, label: "Effluent Treatment Plant (ETP)" },
  { id: 8, label: "Nitrogen Phosphorus Potassium (NPK)" },
  { id: 9, label: "Production Handling Plant (PHP)" },
  { id: 10, label: "Chemical Group of Plants (CGP)" }
];


// ─── Empty Form State ─────────────────────────────────────────────────────

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  employeeId: "",
  roleId: "",
  designationId: "",
  departmentId: "",
  plantId: "",
};

// ─── Field ────────────────────────────────────────────────────────────────

function Field({ label, required, children, hint }) {
  return (
    <div className="ufc-field">
      <label className="ufc-label">
        {label}
        {required && <span className="ufc-required">*</span>}
      </label>
      {children}
      {hint && <p className="ufc-hint">{hint}</p>}
    </div>
  );
}

// ─── SelectField ──────────────────────────────────────────────────────────

function SelectField({ name, value, onChange, options, placeholder }) {
  return (
    <div className="ufc-select-wrap">
      <select
        className="ufc-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="ufc-select-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="ufc-section-title">
      <span className="ufc-section-icon">{icon}</span>
      <div>
        <h3 className="ufc-section-heading">{title}</h3>
        {subtitle && <p className="ufc-section-sub">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────

/**
 * UserFormCard
 *
 * Props:
 *   isOpen       – boolean — controls visibility
 *   onClose      – () => void
 *   onSave       – (formData: object) => void   ← maps to handleSaveUser
 *   editUser     – object | null   ← pass the user row for edit, or null for add
 */
export default function UserEntryCard({ isOpen, onClose, onSave, editUser = null }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const cardRef = useRef(null);
  const firstInputRef = useRef(null);
  const filteredDesignations = DESIGNATIONS.filter(
    (d) => Number(d.roleId) === Number(form.roleId)
  );

  const isEdit = Boolean(editUser);

  // ── Sync form when editUser changes ──
  useEffect(() => {
    if (isOpen) {
      setForm(
        isEdit
          ? {
              fullName: editUser.fullName ?? "",
              email: editUser.email ?? "",
              phone: editUser.phone ?? "",
              employeeId: editUser.employeeId ?? "",
              roleId: editUser.roleId ?? "",
              designationId: editUser.designationId ?? "",
              departmentId: editUser.departmentId ?? "",
              plantId: editUser.plantId ?? "",
            }
          : EMPTY_FORM
      );
      setErrors({});
      setSaving(false);
    }
  }, [isOpen, editUser, isEdit]);

  // ── Focus first input when card opens ──
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // ── Keyboard close ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Lock body scroll while card is open ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "roleId" ? { designationId: "" } : {}),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.employeeId.trim()) errs.employeeId = "Employee ID is required.";
    if (!form.roleId) errs.roleId = "Please select a role.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setSaving(true);
    try {
      await onSave({ ...form });
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div className="ufc-overlay" onClick={onClose} aria-hidden="true" />

      {/* ── Card ── */}
      <div
        className="ufc-card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ufc-title"
      >
        {/* ─── Header ─── */}
        <div className="ufc-header">
          <div className="ufc-header-left">
            <div className="ufc-header-icon">{isEdit ? "✏️" : "👤"}</div>
            <div>
              <h2 id="ufc-title" className="ufc-title">
                {isEdit ? "Edit User" : "Add New User"}
              </h2>
              <p className="ufc-subtitle">
                {isEdit
                  ? `Editing ${editUser?.fullName || "user"}`
                  : "Fill in the details to create a new user"}
              </p>
            </div>
          </div>
          <button
            className="ufc-close-btn"
            onClick={onClose}
            aria-label="Close form"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ─── Progress strip ─── */}
        <div className="ufc-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* ─── Body ─── */}
        <form className="ufc-body" onSubmit={handleSubmit} noValidate>
          {/* ── Section 1: Basic Information ── */}
          <section className="ufc-section">
            <SectionTitle
              icon="🪪"
              title="Basic Information"
              subtitle="Identity and contact details"
            />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <Field label="Full Name" required>
                  <input
                    ref={firstInputRef}
                    className={`ufc-input${errors.fullName ? " ufc-input--error" : ""}`}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <span className="ufc-error">{errors.fullName}</span>
                  )}
                </Field>
              </div>

              <div className="col-12 col-md-6">
                <Field label="Employee ID" required>
                  <input
                    className={`ufc-input${errors.employeeId ? " ufc-input--error" : ""}`}
                    type="text"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. EMP-0042"
                    autoComplete="off"
                  />
                  {errors.employeeId && (
                    <span className="ufc-error">{errors.employeeId}</span>
                  )}
                </Field>
              </div>

              <div className="col-12 col-md-6">
                <Field label="Email Address" required>
                  <input
                    className={`ufc-input${errors.email ? " ufc-input--error" : ""}`}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="ufc-error">{errors.email}</span>
                  )}
                </Field>
              </div>

              <div className="col-12 col-md-6">
                <Field label="Phone Number" hint="Optional — include country code">
                  <input
                    className="ufc-input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 0000000"
                    autoComplete="tel"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="ufc-divider" />

          {/* ── Section 2: Role & Organization ── */}
          <section className="ufc-section">
            <SectionTitle
              icon="🏗️"
              title="Role & Organization"
              subtitle="Access level and placement within the organization"
            />

            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg-3">
                <Field label="Role" required>
                  <SelectField
                    name="roleId"
                    value={form.roleId}
                    onChange={handleChange}
                    options={ROLES}
                    placeholder="Select Role"
                  />
                  {errors.roleId && (
                    <span className="ufc-error">{errors.roleId}</span>
                  )}
                </Field>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <Field label="Designation">
                  <SelectField
                    name="designationId"
                    value={form.designationId}
                    onChange={handleChange}
                    options={filteredDesignations}
                    placeholder={
                      form.roleId ? "Select Designation" : "Select role first"
                    }
                  />

                </Field>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <Field label="Department">
                  <SelectField
                    name="departmentId"
                    value={form.departmentId}
                    onChange={handleChange}
                    options={DEPARTMENTS}
                    placeholder="Select Department"
                  />
                </Field>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <Field label="Plant">
                  <SelectField
                    name="plantId"
                    value={form.plantId}
                    onChange={handleChange}
                    options={PLANTS}
                    placeholder="Select Plant"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* ─── Footer ─── */}
          <div className="ufc-footer">
            <p className="ufc-footer-note">
              <span>*</span> Required fields
            </p>
            <div className="ufc-footer-actions">
              <button
                type="button"
                className="ufc-btn ufc-btn--cancel"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ufc-btn ufc-btn--save"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="ufc-spinner" aria-hidden="true" />
                    Saving…
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M2 7.5l4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {isEdit ? "Update User" : "Save User"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}