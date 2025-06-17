document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const name = document.getElementById("name");
  const mailid = document.getElementById("mailid");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const role = document.getElementById("role");
  const errorTag = document.getElementById("error-tag");

  const fetchUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = (email) => {
    const users = fetchUsers();
    return users.some(user => user.email === email);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let errors = [];


    const passwordVal = password.value;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const emailVal = mailid.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (name.value.trim() === "") errors.push("Name is required.");
    if (emailVal === "") {
      errors.push("Email is required.");
    } else if (!emailPattern.test(emailVal)) {
      errors.push("Invalid email format.");
    }

    if ((passwordVal.length < 6)  && (!specialCharPattern.test(passwordVal)) ) errors.push("Password must be at least 6 characters with 1 special Charrecter.");
    if (passwordVal !== confirmPassword.value) errors.push("Passwords do not match.");
    if (role.value === "default") errors.push("Please select a role.");

    if (emailExists(mailid.value.trim())) {
      errors.push("Email already exists.");
    }

    if (errors.length > 0) {
      errorTag.innerHTML = errors.map(err => `<div class="alert alert-danger">${err}</div>`).join("");
      return;
    }

    const users = fetchUsers();
    users.push({
      name: name.value.trim(),
      email: mailid.value.trim(),
      password: password.value,
      role: role.value
    });

    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/pages/auth/login.html";
  });
});
