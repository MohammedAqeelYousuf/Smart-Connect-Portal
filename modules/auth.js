const fetchUsers = () => JSON.parse(localStorage.getItem('users')) || [];

const fetchUserByEmail = (email) => {
  const users = fetchUsers();
  return users.find(user => user.email === email);
};

let errorTag = document.getElementById('error-tag');

const loginUser = (e) => {
  e.preventDefault();

  const mailid = document.getElementById("mailid").value.trim();
  const password = document.getElementById("password").value;

  const mailidError = document.getElementById("mailid-error");
  const passwordError = document.getElementById("password-error");

  mailidError.textContent = "";
  passwordError.textContent = "";

  let hasError = false;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errorTag.innerHTML = ''; 

  let errors = [];
if (mailid === "") {
    mailidError.textContent = "Email is required.";
    hasError = true;
  } else if (!emailPattern.test(mailid)) {
    mailidError.textContent = "Invalid email format.";
    hasError = true;
  }

  const user = fetchUserByEmail(mailid);

 if (!hasError && !user) {
    mailidError.textContent = "User with this email does not exist.";
    hasError = true;
  }

  if (!hasError && user.password !== password) {
    passwordError.textContent = "Password is incorrect.";
    hasError = true;
  }

  if (hasError) return;

  
  localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: mailid, role: user.role }));
  window.location.href = '/pages/stud-dash.html';
};

document.getElementById("login-form").addEventListener("submit", loginUser);
