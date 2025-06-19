type User = {
    name: string;
    email: string;
    role: string;
    password?: string;
};

const displayProfile = (): void => {
    const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

    const userData = document.getElementById('user-data');
    if (userData && currentUser) {
        userData.innerHTML = `
            <h2 class="mb-1">${currentUser.name}</h2>
            <p class="text-muted mb-2">Email: ${currentUser.email}</p>
            <p class="text-muted mb-2">Role: ${currentUser.role}</p>
        `;
    }
};

const setDefaultValues = (): void => {
    const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (currentUser) {
        const nameInput = document.getElementById('editName') as HTMLInputElement | null;
        const emailInput = document.getElementById('editEmail') as HTMLInputElement | null;

        if (nameInput) nameInput.value = currentUser.name;
        if (emailInput) emailInput.value = currentUser.email;
    }
};

const editUserProfile = (e: Event): void => {
    e.preventDefault();

    const nameInput = document.getElementById('editName') as HTMLInputElement | null;
    const emailInput = document.getElementById('editEmail') as HTMLInputElement | null;

    if (!nameInput || !emailInput) return;

    const name = nameInput.value;
    const email = emailInput.value;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser?.email) {
            users[i].name = name;
            users[i].email = email;
        }
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ name, email, role: currentUser?.role || "" }));
    alert("Profile is updated");
    displayProfile();
};

const updatePassword = (e: Event): void => {
    e.preventDefault();

    const currentPasswordInput = document.getElementById('currentPassword') as HTMLInputElement | null;
    const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement | null;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement | null;
    const passwordError = document.getElementById('passwordError');

    if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput || !passwordError) return;

    passwordError.innerText = "";

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmPasswordInput.value;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (newPassword !== confirmNewPassword) {
        passwordError.innerText = "Password and Confirm Password does not match";
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser?.email) {
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


document.getElementById('editUserForm')?.addEventListener('submit', editUserProfile);
document.getElementById('updatePasswordModal')?.addEventListener('submit', updatePassword);

displayProfile();
setDefaultValues();
