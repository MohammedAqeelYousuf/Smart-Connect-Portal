const fetchAnnouncements = async () => {
    try {
        const response = await fetch('http://localhost:5503/announcements');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching announcements:', error);
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const sidebarLinks = document.getElementById('sidebar-links');
    if (!sidebarLinks) return;

    const links = currentUser.role === "staff" ? navLinks.admin : navLinks.student;
    sidebarLinks.innerHTML = links.map(link => `
        <li class="nav-item">
            <a href="${link.url}"
               class="nav-link px-3 ${link.title === 'Announcements' ? 'active' : ''} text-white text-center"
               aria-current="page">
                ${link.title}
            </a>
        </li>
    `).join('');
};

document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM fully loaded and parsed");

    displayNavContents();
    const announcements = await fetchAnnouncements();
    console.log('Announcements loaded:', announcements);

    const announcementGrid = document.querySelector('.announcement-present-grid');
    if (!announcementGrid) {
        console.error('Announcement grid element not found');
        return;
    }

    // DOM elements
    const filterButtons = document.querySelectorAll('.announcement-present-filter-btn');
    const announcementModal = document.getElementById('announcement-modal');
    const addAnnouncementModal = document.getElementById('add-announcement-modal');
    const closeButtons = document.querySelectorAll('.announcement-present-close-btn');
    const announcementForm = document.getElementById('announcement-form');
    const addAnnouncementBtn = document.getElementById('add-announcement-btn');

    // For demo purposes, assume user is admin
    const isAdmin = true;

    // Display admin controls if user is admin
    const adminControls = document.querySelector('.announcement-present-admin-controls');
    if (isAdmin && adminControls) {
        adminControls.style.display = 'block';
    }

    // Render announcements
    function renderAnnouncements(filter = 'all') {
        if (!announcementGrid) return;
        
        const filteredAnnouncements = filter === 'all' 
            ? announcements 
            : announcements.filter(ann => ann.category === filter);
        
        if (filteredAnnouncements.length === 0) {
            announcementGrid.innerHTML = '<p class="no-announcements">No announcements found</p>';
            return;
        }
        
        announcementGrid.innerHTML = filteredAnnouncements.map(announcement => `
            <div class="announcement-present-card" data-category="${announcement.category}">
                <div class="announcement-present-card-content">
                    <span class="announcement-present-category-tag announcement-present-${announcement.category}">
                        ${announcement.category}
                    </span>
                    <h3>${announcement.title}</h3>
                    <p>${announcement.content.substring(0, 100)}...</p>
                    <div class="announcement-present-card-meta">
                        <span>${announcement.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Reattach event listeners to new cards
        document.querySelectorAll('.announcement-present-card').forEach(card => {
            const announcement = announcements.find(a => a.title === card.querySelector('h3').textContent);
            if (announcement) {
                card.addEventListener('click', () => openAnnouncementModal(announcement));
            }
        });
    }

    // Open announcement modal with full details
    function openAnnouncementModal(announcement) {
        if (!announcementModal) return;
        
        const modalBody = announcementModal.querySelector('.announcement-present-modal-body');
        if (!modalBody) return;
        
        modalBody.innerHTML = `
            <h2>${announcement.title}</h2>
            <span class="announcement-present-date">Published on ${announcement.date}</span>
            <p>${announcement.content}</p>
            ${isAdmin ? `
            <div class="announcement-present-admin-actions">
                <button class="announcement-present-edit-btn" data-id="${announcement.id}">Edit</button>
                <button class="announcement-present-delete-btn" data-id="${announcement.id}">Delete</button>
            </div>` : ''}
        `;
        
        announcementModal.style.display = 'block';
        
        if (isAdmin) {
            const deleteBtn = modalBody.querySelector('.announcement-present-delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteAnnouncement(announcement.id);
                });
            }
            
            const editBtn = modalBody.querySelector('.announcement-present-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeModal();
                    openEditAnnouncementModal(announcement);
                });
            }
        }
    }

    // Edit announcement modal
    function openEditAnnouncementModal(announcement) {
        if (!addAnnouncementModal) return;
        
        addAnnouncementModal.querySelector('h2').textContent = 'Edit Announcement';
        document.getElementById('title').value = announcement.title;
        document.getElementById('category').value = announcement.category;
        document.getElementById('content').value = announcement.content;
        addAnnouncementModal.dataset.editingId = announcement.id;
        
        const submitBtn = addAnnouncementModal.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Announcement';
        
        addAnnouncementModal.style.display = 'block';
    }

    // Close modal
    function closeModal() {
        if (announcementModal) announcementModal.style.display = 'none';
        if (addAnnouncementModal) addAnnouncementModal.style.display = 'none';
    }

    // CRUD operations
    function deleteAnnouncement(id) {
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        
        const index = announcements.findIndex(ann => ann.id === id);
        if (index !== -1) {
            announcements.splice(index, 1);
            renderAnnouncements(document.querySelector('.announcement-present-filter-btn.active')?.dataset.filter || 'all');
            closeModal();
        }
    }

    function updateAnnouncement(id, title, category, content) {
        const announcement = announcements.find(ann => ann.id === id);
        if (announcement) {
            announcement.title = title;
            announcement.category = category;
            announcement.content = content;
            announcement.date = new Date().toLocaleDateString('en-GB');
            renderAnnouncements(document.querySelector('.announcement-present-filter-btn.active')?.dataset.filter || 'all');
            closeModal();
        }
    }

    function addAnnouncement(title, category, content) {
        const newAnnouncement = {
            id: announcements.length + 1,
            title,
            content,
            category,
            date: new Date().toLocaleDateString('en-GB')
        };
        announcements.unshift(newAnnouncement);
        renderAnnouncements(document.querySelector('.announcement-present-filter-btn.active')?.dataset.filter || 'all');
        closeModal();
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderAnnouncements(button.dataset.filter);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target === announcementModal || e.target === addAnnouncementModal) {
            closeModal();
        }
    });

    if (addAnnouncementBtn) {
        addAnnouncementBtn.addEventListener('click', () => {
            addAnnouncementModal.querySelector('h2').textContent = 'Add New Announcement';
            addAnnouncementModal.querySelector('button[type="submit"]').textContent = 'Publish Announcement';
            addAnnouncementModal.style.display = 'block';
        });
    }

    if (announcementForm) {
        announcementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title')?.value;
            const category = document.getElementById('category')?.value;
            const content = document.getElementById('content')?.value;
            
            if (title && category && content) {
                const editingId = addAnnouncementModal.dataset.editingId;
                if (editingId) {
                    updateAnnouncement(parseInt(editingId), title, category, content);
                    delete addAnnouncementModal.dataset.editingId;
                } else {
                    addAnnouncement(title, category, content);
                }
                announcementForm.reset();
            }
        });
    }

    // Initial render - THIS WAS THE MAIN FIX NEEDED
    // Activate the 'All' filter by default
    const allFilter = document.querySelector('.announcement-present-filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }
    renderAnnouncements('all'); // Explicitly render with 'all' filter
});