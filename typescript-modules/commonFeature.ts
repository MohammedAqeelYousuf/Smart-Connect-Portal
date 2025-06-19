const isLoggedIn = (): boolean => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
};

const logoutUser = (): void => {
    localStorage.removeItem('currentUser');
    window.location.href = '/index.html';
};

if (!isLoggedIn()) {
    window.location.href = "/pages/auth/login.html";
}
