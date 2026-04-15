import API from "./api";

/* ======================================
   LOGIN
====================================== */
export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  const data = response.data;

  // 🔥 DEBUG (VERY IMPORTANT — keep for now)
  console.log("LOGIN RESPONSE:", data);

  // 🔥 FORCE STORE TOKEN (NO CONDITION)
  localStorage.setItem("token", data.token);

  console.log("TOKEN STORED:", localStorage.getItem("token"));

  // 🔥 Store user info
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      plantId: data.plantId,
      departmentId: data.departmentId,
      firstLogin: data.firstLogin,
    })
  );

  return data;
};

/* ======================================
   CHANGE PASSWORD
====================================== */
export const changePassword = async (currentPassword, newPassword) => {
  const response = await API.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });

  return response.data;
};

/* ======================================
   LOGOUT
====================================== */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};