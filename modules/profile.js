
const displayProfile = () => {   
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    document.getElementById('user-data').innerHTML = `<h2 class="mb-1">${currentUser?.name}</h2>
        <p class="text-muted mb-2">Email: ${currentUser?.email}</p>
        <p class="text-muted mb-2">Role: ${currentUser?.role}</p>`
}

const setDefaultValues = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    document.getElementById('editName').value = currentUser?.name
    document.getElementById('editEmail').value = currentUser?.email
}

const editUserProfile = (e) => {
    e.preventDefault();
    const name = document.getElementById('editName')?.value;
    const email = document.getElementById('editEmail')?.value;
    let users = JSON.parse(localStorage.getItem('users')) || []
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    for(let i=0;i<users.length;i++){
        if(users[i]?.email===email){
            users[i].name = name
        }
    }

    localStorage.setItem('users',JSON.stringify(users));
    localStorage.setItem('currentUser',JSON.stringify({name,email,role:currentUser?.role}))
    alert("Profile is updated")
    displayProfile();
}

const updatePassword = (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmNewPassword = document.getElementById('confirmPassword')?.value;
    let passwordError = document.getElementById('passwordError')
    passwordError.innerText = ""

    let users = JSON.parse(localStorage.getItem('users')) || []
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
    if(newPassword!==confirmNewPassword){
        passwordError.innerText = "Password and Confirm Password does not match"
        return
    }

    for(let i=0;i<users.length;i++){
        if(users[i]?.email===currentUser?.email){
            if(users[i].password!==currentPassword){
                passwordError.innerText = "Invalid Password"
                return  
            }

            users[i].password = newPassword;
        }
    }

    localStorage.setItem('users',JSON.stringify(users));
    alert("Password is updated")
}

document.getElementById('editUserForm').addEventListener('submit',editUserProfile);
document.getElementById('updatePasswordModal').addEventListener('submit',updatePassword);

displayProfile()
setDefaultValues()