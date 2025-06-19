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
    // {
    //   title: "Resolve Queries",
    //   url: "/pages/resolve-queries.html"
    // }
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


const displayNavContents = () => {   
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    document.getElementById('sidebar-links').innerHTML = '';

    if(currentUser.role==="staff"){
        for(let i=0;i<navLinks.admin.length;i++){

            document.getElementById('sidebar-links').innerHTML += `<li class="nav-item">
            <a
                href="${navLinks.admin[i].url}"
                class="nav-link px-3 ${navLinks.admin[i].title==='View Feedback'?'active':''} text-white text-center"
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
                class="nav-link px-3 ${navLinks.student[i].title==='View Feedback'?'active':''} text-white text-center"
                aria-current="page"
            >
                ${navLinks.student[i].title}
            </a>
            </li>
            `;
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
  displayNavContents();

  const feedbackGrid = document.getElementById("feedback-grid");

  const [feedback, users] = await Promise.all([
    fetch("http://localhost:5503/feedback").then(res => res.json()),
    fetch("http://localhost:5503/users").then(res => res.json())
  ]);

  const userMap = {};
  users.forEach(user => userMap[user.id] = user.name);

  function getCategoryClass(category) {
    switch (category.toLowerCase()) {
      case 'academic': return 'announcement-present-academic';
      case 'events': return 'announcement-present-events';
      case 'general': return 'announcement-present-general';
      case 'website': return 'announcement-present-general';
      case 'announcement': return 'announcement-present-academic';
      case 'issue': return 'announcement-present-events';
      default: return 'announcement-present-general';
    }
  }
 console.log(feedback);
  feedback.forEach(item => {
    const card = document.createElement("div");
    card.className = `announcement-present-card ${getCategoryClass(item.category)}`;

    card.innerHTML = `
      <div class="announcement-present-card-content">
        <span class="announcement-present-category-tag">${item.category}</span>
        <h3>${item.subject}</h3>
        <p>${item.feedback.substring(0, 120)}...</p>
        <div class="announcement-present-card-meta">
          <span><i class="fas fa-user"></i> ${userMap[item.userId] || 'Unknown User'}</span>
          <span>${item.date}</span>
        </div>
      </div>
    `;

    feedbackGrid.appendChild(card);
  });
});
