"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const updateUser = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:5503/users/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        const res = yield response.json();
        return res;
    }
    catch (error) {
        console.error("Error in updating user");
        return null;
    }
});
const updatePasswordByID = (id, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFetchResponse = yield fetch(`http://localhost:5503/users/${id}`);
        const userFetchRes = yield userFetchResponse.json();
        if (oldPassword !== userFetchRes.password) {
            console.error("Incorrect current password");
            return null;
        }
        const response = yield fetch(`http://localhost:5503/users/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword })
        });
        const res = yield response.json();
        return res;
    }
    catch (error) {
        console.error("Error in updating password");
        return null;
    }
});
const navLinks = {
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
const displayProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const userDataDiv = document.getElementById('user-data');
    const sidebarLinksUl = document.getElementById('sidebar-links');
    if (!currentUser || !userDataDiv || !sidebarLinksUl)
        return;
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
const setDefaultValues = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser)
        return;
    const nameInput = document.getElementById('editName');
    const emailInput = document.getElementById('editEmail');
    if (nameInput)
        nameInput.value = currentUser.name;
    if (emailInput)
        emailInput.value = currentUser.email;
};
const editUserProfile = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    e.preventDefault();
    const name = (_a = document.getElementById('editName')) === null || _a === void 0 ? void 0 : _a.value;
    const email = (_b = document.getElementById('editEmail')) === null || _b === void 0 ? void 0 : _b.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser)
        return;
    const updated = yield updateUser(currentUser.id, name);
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
});
const updatePassword = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
    if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput || !passwordError)
        return;
    passwordError.innerText = "";
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmPasswordInput.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser)
        return;
    if (newPassword !== confirmNewPassword) {
        passwordError.innerText = "Password and Confirm Password does not match";
        return;
    }
    const updated = yield updatePasswordByID(currentUser.id, currentPassword, newPassword);
    if (!updated) {
        alert("Error in updating password");
        return;
    }
    alert("Password is updated");
});
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
