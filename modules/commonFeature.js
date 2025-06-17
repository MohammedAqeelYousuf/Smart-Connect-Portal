const logoutUser = () => {
    localStorage.removeItem('currentUser');

    window.location.href = '/pages/index.html'
}