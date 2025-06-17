const fetchUsers = () =>{
    return JSON.parse(localStorage.getItem('users')) || []
}

const emailExists = (email) => {
    const users = localStorage.getItem('users') || []

    const existingUser = users.filter(user=>user.email===email);

    return existingUser.length>0?true:false
}
let errorTag = document.getElementById('error-tag')

const createUser = (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value
    const role = document.getElementById("role").value
    
    errorTag.innerText = ''

    if(emailExists(username)){
        errorTag.innerText = 'Username already exists';
        return
    }

    if(password!==confirmPassword){
        errorTag.innerText = "Password does not match with confirm password"
    }

    let users = fetchUsers();
    localStorage.setItem('users',JSON.stringify([...users,{name,email:username,password,role}]));

    window.location.href = '/pages/auth/login.html';
}

document.getElementById("signup-form").addEventListener("submit", createUser);