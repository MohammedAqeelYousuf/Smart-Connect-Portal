const isLoggedIn = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    return currentUser?true:false
}

const logoutUser = () => {
    localStorage.removeItem('currentUser');

    window.location.href = '/index.html'
}


if(!isLoggedIn()){
    window.location.href = "/pages/auth/login.html";
}