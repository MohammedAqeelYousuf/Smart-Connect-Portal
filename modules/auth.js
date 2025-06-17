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

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errorTag.innerHTML = '';

  let errors = [];

  // Check if email is valid format
  if (mailid === '') {
    errors.push("Email is required.");
  } else if (!emailPattern.test(mailid)) {
    errors.push("Invalid email format.");
  }

  // Stop early if basic email checks fail
  if (errors.length > 0) {
    errorTag.innerHTML = errors.map(err => `<div class="alert alert-danger">${err}</div>`).join("");
    return;
  }

  const user = fetchUserByEmail(mailid);

  if (!user) {
    errorTag.innerHTML = `<div class="alert alert-danger">User with this email does not exist.</div>`;
    return;
  }

  if (user.password !== password) {
    errorTag.innerHTML = `<div class="alert alert-danger">Password is incorrect.</div>`;
    return;
  }

  // Login successful
  localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: mailid, role: user.role }));
  window.location.href = '/pages/stud-dash.html';
};

document.getElementById("login-form").addEventListener("submit", loginUser);
