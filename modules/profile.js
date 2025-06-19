"use strict";
var _a, _b;
const displayProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const userData = document.getElementById('user-data');
    if (userData && currentUser) {
        userData.innerHTML = `
            <h2 class="mb-1">${currentUser.name}</h2>
            <p class="text-muted mb-2">Email: ${currentUser.email}</p>
            <p class="text-muted mb-2">Role: ${currentUser.role}</p>
        `;
    }
};
const setDefaultValues = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
        const nameInput = document.getElementById('editName');
        const emailInput = document.getElementById('editEmail');
        if (nameInput)
            nameInput.value = currentUser.name;
        if (emailInput)
            emailInput.value = currentUser.email;
    }
};
const editUserProfile = (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('editName');
    const emailInput = document.getElementById('editEmail');
    if (!nameInput || !emailInput)
        return;
    const name = nameInput.value;
    const email = emailInput.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.email)) {
            users[i].name = name;
            users[i].email = email;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ name, email, role: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) || "" }));
    alert("Profile is updated");
    displayProfile();
};
const updatePassword = (e) => {
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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (newPassword !== confirmNewPassword) {
        passwordError.innerText = "Password and Confirm Password does not match";
        return;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.email)) {
            if (users[i].password !== currentPassword) {
                passwordError.innerText = "Invalid Password";
                return;
            }
            users[i].password = newPassword;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    alert("Password is updated");
};
(_a = document.getElementById('editUserForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', editUserProfile);
(_b = document.getElementById('updatePasswordModal')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', updatePassword);
displayProfile();
setDefaultValues();
