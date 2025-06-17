const isLoggedIn = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    return currentUser?true:false
}

const logoutUser = () => {
    localStorage.removeItem('currentUser');

    window.location.href = '/pages/index.html'
}


if(!isLoggedIn()){
    window.location.href = "/pages/auth/login.html";
}