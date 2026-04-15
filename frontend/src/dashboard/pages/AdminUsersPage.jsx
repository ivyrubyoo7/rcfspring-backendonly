import React, { useEffect, useState } from "react";
import API from "../../services/api";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [plantFilter, setPlantFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");  // ✅ interceptor handles token
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };


  // Unique plants and departments for dropdowns
  const plants = [...new Set(users.map((u) => u.plant))];
  const departments = [...new Set(users.map((u) => u.department))];

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchText) ||
      user.employeeId?.toLowerCase().includes(searchText) ||
      user.role?.toLowerCase().includes(searchText) ||
      user.designation?.toLowerCase().includes(searchText) ||
      user.department?.toLowerCase().includes(searchText) ||
      user.plant?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "ALL" || user.role === roleFilter;

    const matchesPlant =
      plantFilter === "ALL" || user.plant === plantFilter;

    const matchesDepartment =
      departmentFilter === "ALL" || user.department === departmentFilter;

    return matchesSearch && matchesRole && matchesPlant && matchesDepartment;
  });

  return (
    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Management</h3>

        <button className="btn btn-primary">
          + Add User
        </button>
      </div>

      <div className="card p-3 shadow-sm">

        {/* ROLE FILTER BUTTONS */}

        <div className="mb-3">
          <div className="btn-group">
            <button
              className={`btn ${roleFilter === "ALL" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("ALL")}
            >
              All
            </button>

            <button
              className={`btn ${roleFilter === "ADMIN" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("ADMIN")}
            >
              Admin
            </button>

            <button
              className={`btn ${roleFilter === "OFFICER" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("OFFICER")}
            >
              Officer
            </button>

            <button
              className={`btn ${roleFilter === "MANAGER" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("MANAGER")}
            >
              Manager
            </button>

            <button
              className={`btn ${roleFilter === "EMPLOYEE" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("EMPLOYEE")}
            >
              Employee
            </button>

            <button
              className={`btn ${roleFilter === "CONTRACTOR" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setRoleFilter("CONTRACTOR")}
            >
              Contractor
            </button>
          </div>
        </div>

        {/* SEARCH + DROPDOWNS */}

        <div className="d-flex gap-2 mb-3">

          <input
            type="text"
            placeholder="Search users..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Plant Filter */}
          <select
            className="form-select"
            value={plantFilter}
            onChange={(e) => setPlantFilter(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="ALL">All Plants</option>
            {plants.map((plant, index) => (
              <option key={index} value={plant}>
                {plant}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            className="form-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{ maxWidth: "220px" }}
          >
            <option value="ALL">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>

        </div>

        <table className="table table-hover table-bordered">

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Role</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Plant</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.employeeId}</td>
                <td>{user.role}</td>
                <td>{user.designation}</td>
                <td>{user.department}</td>
                <td>{user.plant}</td>
                <td>{user.email}</td>

                <td>
                  {/* View */}
                  <i
                    className="bi bi-eye text-primary me-2"
                    style={{ cursor: "pointer" }}
                    title="View"
                  ></i>

                  {/* Edit */}
                  <i
                    className="bi bi-pencil-square text-warning me-2"
                    style={{ cursor: "pointer" }}
                    title="Edit"
                  ></i>

                  {/* Delete */}
                  <i
                    className="bi bi-trash text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteUser(user.id)}
                    title="Delete"
                  ></i>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsersPage;