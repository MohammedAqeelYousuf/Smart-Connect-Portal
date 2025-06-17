document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const name = document.getElementById("name");
  const mailid = document.getElementById("mailid");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const role = document.getElementById("role");

  const errorFields = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    password: document.getElementById("password-error"),
    confirm: document.getElementById("confirm-error"),
    role: document.getElementById("role-error")
  };

  const fetchUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = (email) => {
    const users = fetchUsers();
    return users.some(user => user.email === email);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    Object.values(errorFields).forEach(el => el.innerText = "");

    const nameVal = name.value.trim();
    const emailVal = mailid.value.trim();
    const passwordVal = password.value;
    const confirmPasswordVal = confirmPassword.value;
    const roleVal = role.value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    let isValid = true;

    if (nameVal === "") {
      errorFields.name.innerText = "Name is required.";
      isValid = false;
    }

    if (emailVal === "") {
      errorFields.email.innerText = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(emailVal)) {
      errorFields.email.innerText = "Invalid email format.";
      isValid = false;
    } else if (emailExists(emailVal)) {
      errorFields.email.innerText = "Email already exists.";
      isValid = false;
    }

    if (passwordVal.length < 6 || !specialCharPattern.test(passwordVal)) {
      errorFields.password.innerText = "Password must be at least 6 characters and include a special character.";
      isValid = false;
    }

    if (passwordVal !== confirmPasswordVal) {
      errorFields.confirm.innerText = "Passwords do not match.";
      isValid = false;
    }

    if (roleVal === "default") {
      errorFields.role.innerText = "Please select a role.";
      isValid = false;
    }

    if (!isValid) return;

    const users = fetchUsers();
    users.push({
      name: nameVal,
      email: emailVal,
      password: passwordVal,
      role: roleVal
    });

    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/pages/auth/login.html";
  });
});
