const updateUser = async(id,name)=>{
  try {
    const response = await fetch(`http://localhost:5503/users/${id}`,{
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })

    let res = await response.json();
    return res
  } catch (error) {
    console.log("Error in updating user");
    return null;
  }
}

const updatePasswordByID = async(id,oldPassword,newPassword)=>{
  try {
    const userFetchResponse = await fetch(`http://localhost:5503/users/${id}`)
    let userFetchRes = await userFetchResponse.json();
    
    if(oldPassword!=userFetchRes.password){
      console.log("Error in updating user");
      return null;  
    }

    const response = await fetch(`http://localhost:5503/users/${id}`,{
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password:newPassword})
    })

    let res = await response.json();
    return res
  } catch (error) {
    console.log("Error in updating user");
    return null;
  }
}

const navLinks = {
  admin: [
    {
      title: "Home",
      url: "/pages/admin-dash.html"
    },
    {
      title: "Announcements",
      url: "/pages/announcement.html"
    },
    {
      title: "Events",
      url: "/pages/events.html"
    },
    {
      title: "View Feedback",
      url: "/pages/view-feedback.html"
    },
    {
      title: "Resolve Queries",
      url: "/pages/resolve-queries.html"
    }
  ],
  student: [
    {
      title: "Home",
      url: "/pages/stud-dash.html"
    },
    {
      title: "Events",
      url: "/pages/events.html"
    },
    {
      title: "Feedback",
      url: "/pages/feedback-home.html"
    }
  ]
};


const displayProfile = () => {   
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    document.getElementById('user-data').innerHTML = `<h2 class="mb-1">${currentUser?.name}</h2>
        <p class="text-muted mb-2">Email: ${currentUser?.email}</p>
        <p class="text-muted mb-2">Role: ${currentUser?.role}</p>`
        document.getElementById('sidebar-links').innerHTML = '';

        if(currentUser.role==="staff"){
            for(let i=0;i<navLinks.admin.length;i++){

                document.getElementById('sidebar-links').innerHTML += `<li class="nav-item">
                <a
                  href="${navLinks.admin[i].url}"
                  class="nav-link px-3 text-white text-center"
                  aria-current="page"
                >
                  ${navLinks.admin[i].title}
                </a>
              </li>
              `;
            }
        }else{
            for(let i=0;i<navLinks.student.length;i++){

                document.getElementById('sidebar-links').innerHTML += `<li class="nav-item">
                <a
                  href="${navLinks.student[i].url}"
                  class="nav-link px-3 text-white text-center"
                  aria-current="page"
                >
                  ${navLinks.student[i].title}
                </a>
              </li>
              `;
            }
        }
}

const setDefaultValues = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    document.getElementById('editName').value = currentUser?.name
    document.getElementById('editEmail').value = currentUser?.email
}

const editUserProfile = async(e) => {
    e.preventDefault();
    const name = document.getElementById('editName')?.value;
    const email = document.getElementById('editEmail')?.value;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const updated = await updateUser(currentUser?.id,name);

    if(!updated){
      alert("Error in updating user")
      return;
    }

    localStorage.setItem('currentUser',JSON.stringify({id:currentUser?.id,name,email,role:currentUser?.role}))
    alert("Profile is updated")
    displayProfile();
}

const updatePassword = async(e) => {
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

    const updated = await updatePasswordByID(currentUser?.id,currentPassword,newPassword)
    
    if(!updated){
      alert("Error in updating password")
      return;
    }

    alert("Password is updated")
}

document.getElementById('editUserForm').addEventListener('submit',editUserProfile);
document.getElementById('updatePasswordModal').addEventListener('submit',updatePassword);

document.addEventListener('DOMContentLoaded',()=>{
    displayProfile()
    setDefaultValues()
})