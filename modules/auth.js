const fetchUser = (email,password) =>{
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.filter((u)=>u.email===email&&u.password===password)

    return user.length>0?user[0]:null;
}

let errorTag = document.getElementById('error-tag')

const loginUser = (e)=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    errorTag.innerText = ''

    const user = fetchUser(username,password);

    if(!user){
        errorTag.innerText = "User does not exists"
    }

    localStorage.setItem('currentUser',JSON.stringify({name:user.name,email:username,role:user.role}));

    window.location.href = '/pages/home.html';
}

document.getElementById("login-form").addEventListener("submit", loginUser);