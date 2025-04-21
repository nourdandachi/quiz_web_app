const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.email === "admin@quiz.com") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
});
