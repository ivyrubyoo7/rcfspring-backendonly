<<<<<<< HEAD
package com.rcfl.rcfspring.dto.response;

public class LoginResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String role;

    private Long plantId;
    private Long departmentId;

    private Boolean firstLogin;
    private String message;

    // 🔥 ADD THIS (JWT TOKEN)
    private String token;

    /* =========================
       Constructors
       ========================= */

    public LoginResponse() {
    }

    public LoginResponse(
            Long userId,
            String fullName,
            String email,
            String role,
            Long plantId,
            Long departmentId,
            Boolean firstLogin,
            String message,
            String token
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.plantId = plantId;
        this.departmentId = departmentId;
        this.firstLogin = firstLogin;
        this.message = message;
        this.token = token;
    }

    /* =========================
       Getters
       ========================= */

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Long getPlantId() {
        return plantId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    /* =========================
       Setters
       ========================= */

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPlantId(Long plantId) {
        this.plantId = plantId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }
=======
package com.rcfl.rcfspring.dto.response;

public class LoginResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String role;

    private Long plantId;
    private Long departmentId;

    private Boolean firstLogin;
    private String message;

    // 🔥 ADD THIS (JWT TOKEN)
    private String token;

    /* =========================
       Constructors
       ========================= */

    public LoginResponse() {
    }

    public LoginResponse(
            Long userId,
            String fullName,
            String email,
            String role,
            Long plantId,
            Long departmentId,
            Boolean firstLogin,
            String message,
            String token
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.plantId = plantId;
        this.departmentId = departmentId;
        this.firstLogin = firstLogin;
        this.message = message;
        this.token = token;
    }

    /* =========================
       Getters
       ========================= */

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Long getPlantId() {
        return plantId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    /* =========================
       Setters
       ========================= */

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPlantId(Long plantId) {
        this.plantId = plantId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}