"use strict";
const isLoggedIn = () => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
};
const logoutUser = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/spa-index.html';
};
if (!isLoggedIn()) {
    window.location.href = "/pages/auth/login.html";
}
