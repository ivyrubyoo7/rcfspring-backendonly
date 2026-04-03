<<<<<<< HEAD
package com.rcfl.rcfspring.dto.response;

public class UserResponse {

    private Long id;
    private String employeeId;
    private String fullName;
    private String email;
    private String phone;

    private String role;
    private String designation;
    private String department;
    private String plant;

    private Boolean isActive;

    /* =========================
       Constructors
       ========================= */

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String employeeId,
            String fullName,
            String email,
            String phone,
            String role,
            String designation,
            String department,
            String plant,
            Boolean isActive
    ) {
        this.id = id;
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.designation = designation;
        this.department = department;
        this.plant = plant;
        this.isActive = isActive;
    }

    /* =========================
       Getters
       ========================= */

    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }

    public String getDesignation() {
        return designation;
    }

    public String getDepartment() {
        return department;
    }

    public String getPlant() {
        return plant;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    /* =========================
       Setters (needed for JSON)
       ========================= */

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }
=======
package com.rcfl.rcfspring.dto.response;

public class UserResponse {

    private Long id;
    private String employeeId;
    private String fullName;
    private String email;
    private String phone;

    private String role;
    private String designation;
    private String department;
    private String plant;

    private Boolean isActive;

    /* =========================
       Constructors
       ========================= */

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String employeeId,
            String fullName,
            String email,
            String phone,
            String role,
            String designation,
            String department,
            String plant,
            Boolean isActive
    ) {
        this.id = id;
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.designation = designation;
        this.department = department;
        this.plant = plant;
        this.isActive = isActive;
    }

    /* =========================
       Getters
       ========================= */

    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }

    public String getDesignation() {
        return designation;
    }

    public String getDepartment() {
        return department;
    }

    public String getPlant() {
        return plant;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    /* =========================
       Setters (needed for JSON)
       ========================= */

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}