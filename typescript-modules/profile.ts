interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff';
  password?: string;
}

interface NavLink {
  title: string;
  url: string;
}

const updateUser = async (id: string, name: string): Promise<User | null> => {
  try {
    const response = await fetch(`http://localhost:5503/users/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const res: User = await response.json();
    return res;
  } catch (error) {
    console.error("Error in updating user");
    return null;
  }
};

const updatePasswordByID = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<User | null> => {
  try {
    const userFetchResponse = await fetch(`http://localhost:5503/users/${id}`);
    const userFetchRes: User = await userFetchResponse.json();

    if (oldPassword !== userFetchRes.password) {
      console.error("Incorrect current password");
      return null;
    }

    const response = await fetch(`http://localhost:5503/users/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });

    const res: User = await response.json();
    return res;
  } catch (error) {
    console.error("Error in updating password");
    return null;
  }
};

const navLinks: { [key: string]: NavLink[] } = {
  admin: [
    { title: "Home", url: "/pages/admin-dash.html" },
    { title: "Announcements", url: "/pages/announcement.html" },
    { title: "Events", url: "/pages/events.html" },
    { title: "View Feedback", url: "/pages/view-feedback.html" },
    { title: "Resolve Queries", url: "/pages/resolve-queries.html" }
  ],
  student: [
    { title: "Home", url: "/pages/stud-dash.html" },
    { title: "Events", url: "/pages/events.html" },
    { title: "Feedback", url: "/pages/feedback-home.html" }
  ]
};

const displayProfile = (): void => {
  const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const userDataDiv = document.getElementById('user-data');
  const sidebarLinksUl = document.getElementById('sidebar-links');

  if (!currentUser || !userDataDiv || !sidebarLinksUl) return;

  userDataDiv.innerHTML = `
    <h2 class="mb-1">${currentUser.name}</h2>
    <p class="text-muted mb-2">Email: ${currentUser.email}</p>
    <p class="text-muted mb-2">Role: ${currentUser.role}</p>
  `;

  sidebarLinksUl.innerHTML = '';

  const links = currentUser.role === "staff" ? navLinks.admin : navLinks.student;

  for (const link of links) {
    sidebarLinksUl.innerHTML += `
      <li class="nav-item">
        <a href="${link.url}" class="nav-link px-3 text-white text-center" aria-current="page">
          ${link.title}
        </a>
      </li>
    `;
  }
};

const setDefaultValues = (): void => {
  const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) return;

  const nameInput = document.getElementById('editName') as HTMLInputElement | null;
  const emailInput = document.getElementById('editEmail') as HTMLInputElement | null;

  if (nameInput) nameInput.value = currentUser.name;
  if (emailInput) emailInput.value = currentUser.email;
};

const editUserProfile = async (e: Event): Promise<void> => {
  e.preventDefault();
  const name = (document.getElementById('editName') as HTMLInputElement)?.value;
  const email = (document.getElementById('editEmail') as HTMLInputElement)?.value;
  const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (!currentUser) return;

  const updated = await updateUser(currentUser.id, name);

  if (!updated) {
    alert("Error in updating user");
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify({
    id: currentUser.id,
    name,
    email,
    role: currentUser.role
  }));

  alert("Profile is updated");
  displayProfile();
};

const updatePassword = async (e: Event): Promise<void> => {
  e.preventDefault();

  const currentPasswordInput = document.getElementById('currentPassword') as HTMLInputElement | null;
  const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement | null;
  const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement | null;
  const passwordError = document.getElementById('passwordError') as HTMLElement | null;

  if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput || !passwordError) return;

  passwordError.innerText = "";
  const currentPassword = currentPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const confirmNewPassword = confirmPasswordInput.value;

  const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (!currentUser) return;

  if (newPassword !== confirmNewPassword) {
    passwordError.innerText = "Password and Confirm Password does not match";
    return;
  }

  const updated = await updatePasswordByID(currentUser.id, currentPassword, newPassword);

  if (!updated) {
    alert("Error in updating password");
    return;
  }

  alert("Password is updated");
};

document.addEventListener('DOMContentLoaded', () => {
  displayProfile();
  setDefaultValues();
});

const editForm = document.getElementById('editUserForm');
if (editForm) {
  editForm.addEventListener('submit', editUserProfile);
}

const passwordForm = document.getElementById('updatePasswordModal');
if (passwordForm) {
  passwordForm.addEventListener('submit', updatePassword);
}
