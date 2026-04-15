export const logout = (navigate) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  navigate("/");
};