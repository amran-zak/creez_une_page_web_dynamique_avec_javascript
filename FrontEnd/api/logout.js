document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html"; // ou "login.html" selon ton choix
    });
  }
});
