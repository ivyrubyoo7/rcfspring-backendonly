import axios from "axios";

/* ======================================
   AXIOS INSTANCE
====================================== */

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================================
   REQUEST INTERCEPTOR
   Attach Authorization Header
====================================== */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ Attach only valid token
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // ❗ Ensure no invalid header is sent
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================
   RESPONSE INTERCEPTOR
   Global Error Handling
====================================== */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {

      // 🔐 Unauthorized → token invalid or expired
      if (error.response.status === 401) {
        console.warn("401 Unauthorized on:", error.config?.url);

        // 🔥 DO NOT logout immediately
        // Only logout if it's login failure OR truly expired session

        if (error.config?.url.includes("/auth/login")) {
          return Promise.reject(error);
        }

        // Optional: you can show a warning instead
        console.warn("Session may have expired");

        return Promise.reject(error);
      }

      // 🚫 Forbidden → valid login but no permission
      if (error.response.status === 403) {
        console.warn("Access denied:", error.config?.url);
        return Promise.reject(error);
      }

      // ❌ Bad Request
      if (error.response.status === 400) {
        console.error("Bad Request:", error.response.data);
        alert(error.response.data || "Invalid request");
      }

      // 💥 Server Error
      if (error.response.status === 500) {
        console.error("Server Error");
        alert("Something went wrong on server");
      }
    }

    return Promise.reject(error);
  }
);

/* ======================================
   USER APIs
====================================== */

export const getAllUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export default API;