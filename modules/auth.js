const fetchUsers = async() => {
  try {
  const res = await fetch('http://localhost:5503/users')
    .then(response => response.json())

  console.log('Fetched users:', res);

  return res;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

const fetchUserByEmail = async(email) => {
  const users = await fetchUsers();
  console.log('Searching for user with email:', users.find(user => user.email === email));
  return users.find(user => user.email === email);
};

let errorTag = document.getElementById('error-tag');

const loginUser = async(e) => {
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

  const user = await fetchUserByEmail(mailid);

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

  if( user.role === 'staff') {
    window.location.href = '/pages/admin-dash.html';
  }else if (user.role === 'student') {
    window.location.href = '/pages/stud-dash.html';
  }
};

document.getElementById("login-form").addEventListener("submit", loginUser);
