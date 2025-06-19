const fetchEvents = async () => {
    try {
        const response = await fetch('http://localhost:5503/events')
        .then(res => res.json())
        return response;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

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
                class="nav-link px-3 ${navLinks.admin[i].title==='Events'?'active':''} text-white text-center"
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
                class="nav-link px-3 ${navLinks.student[i].title==='Events'?'active':''} text-white text-center"
                aria-current="page"
            >
                ${navLinks.student[i].title}
            </a>
            </li>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM fully loaded and parsed"); // Debugging log

    displayNavContents();
    // Sample announcements data (without images)
    const announcements = await fetchEvents();

    // DOM elements with updated class names
    const announcementGrid = document.querySelector('.announcement-present-grid');
    const filterButtons = document.querySelectorAll('.announcement-present-filter-btn');
    const announcementModal = document.getElementById('announcement-modal');
    const addAnnouncementModal = document.getElementById('add-announcement-modal');
    const closeButtons = document.querySelectorAll('.announcement-present-close-btn');
    const announcementForm = document.getElementById('announcement-form');
    const addAnnouncementBtn = document.getElementById('add-announcement-btn');

    // Debugging: Check if elements are found
    console.log('Grid element:', announcementGrid);
    console.log('Filter buttons:', filterButtons);
    console.log('Modals:', announcementModal, addAnnouncementModal);

    // For demo purposes, assume user is admin
    const isAdmin = true;

    // Display admin controls if user is admin
    const adminControls = document.querySelector('.announcement-present-admin-controls');
    if (isAdmin && adminControls) {
        adminControls.style.display = 'block';
    }

    // Render announcements
    function renderAnnouncements(filter = 'all') {
        if (!announcementGrid) {
            console.error('Announcement grid element not found');
            return;
        }
        
        announcementGrid.innerHTML = '';
        
        const filteredAnnouncements = filter === 'all' 
            ? announcements 
            : announcements.filter(ann => ann.category === filter);
        
        filteredAnnouncements.forEach(announcement => {
            const card = document.createElement('div');
            card.className = 'announcement-present-card';
            card.dataset.category = announcement.category;
            
            card.innerHTML = `
                <div class="announcement-present-card-content">
                    <h3>${announcement.title}</h3>
                    <p>${announcement.description}...</p>
                    <div class="announcement-present-card-meta">
                        <span>${announcement.location}</span>
                        <span>${announcement.date}</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openAnnouncementModal(announcement));
            announcementGrid.appendChild(card);
        });
    }

    // Open announcement modal with full details
    function openAnnouncementModal(announcement) {
        if (!announcementModal) {
            console.error('Announcement modal not found');
            return;
        }
        
        const modalBody = announcementModal.querySelector('.announcement-present-modal-body');
        if (!modalBody) {
            console.error('Modal body not found');
            return;
        }
        
        modalBody.innerHTML = `
            <h2>${announcement.title}</h2>
            <span class="announcement-present-date">Published on ${announcement.date}</span>
            <p>${announcement.description}</p>
            ${isAdmin ? `<div class="announcement-present-admin-actions">
                <button class="announcement-present-delete-btn" data-id="${announcement.id}">Delete Event</button>
            </div>` : ''}
        `;
        
        announcementModal.style.display = 'block';
        
        // Add event listener for delete button if admin
        if (isAdmin) {
            const deleteBtn = modalBody.querySelector('.announcement-present-delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteAnnouncement(announcement.id);
                });
            }
        }
    }

    // Open add announcement modal
    function openAddAnnouncementModal() {
        if (addAnnouncementModal) {
            addAnnouncementModal.style.display = 'block';
        }
    }

    // Close modal
    function closeModal() {
        if (announcementModal) announcementModal.style.display = 'none';
        if (addAnnouncementModal) addAnnouncementModal.style.display = 'none';
    }

    // Delete announcement
    function deleteAnnouncement(id) {
        if (confirm('Are you sure you want to delete this announcement?')) {
            const index = announcements.findIndex(ann => ann.id === id);
            if (index !== -1) {
                announcements.splice(index, 1);
                const activeFilter = document.querySelector('.announcement-present-filter-btn.active');
                renderAnnouncements(activeFilter ? activeFilter.dataset.filter : 'all');
                closeModal();
            }
        }
    }

    // Add new announcement
    function addAnnouncement(title, category, content) {
        const newAnnouncement = {
            id: announcements.length + 1,
            title,
            content,
            category,
            date: new Date().toLocaleDateString('en-GB')
        };
        
        announcements.unshift(newAnnouncement);
        const activeFilter = document.querySelector('.announcement-present-filter-btn.active');
        renderAnnouncements(activeFilter ? activeFilter.dataset.filter : 'all');
        closeModal();
    }

    // Event listeners with null checks
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderAnnouncements(button.dataset.filter);
            });
        });
    }

    if (closeButtons.length) {
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
    }

    window.addEventListener('click', (e) => {
        if ((announcementModal && e.target === announcementModal) || 
            (addAnnouncementModal && e.target === addAnnouncementModal)) {
            closeModal();
        }
    });

    if (addAnnouncementBtn) {
        addAnnouncementBtn.addEventListener('click', openAddAnnouncementModal);
    }

    if (announcementForm) {
        announcementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title')?.value;
            const category = document.getElementById('category')?.value;
            const content = document.getElementById('content')?.value;
            
            if (title && category && content) {
                addAnnouncement(title, category, content);
                announcementForm.reset();
            }
        });
    }

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(user.role==='staff'){
        document.getElementById("add-button").innerHTML = `<button id="add-announcement-btn" class="announcement-present-admin-btn">
            <i class="fas fa-plus"></i> Add Events
        </button>`
    }

    // Initial render
    renderAnnouncements();
});