document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed"); // Debugging log

    // Sample announcements data (without images)
    const announcements = [
        {
            id: 1,
            title: "Update for Smart Connect Portal",
            content: "We have updated the portal with new features to enhance your experience. Check out the new dashboard layout and improved navigation.",
            category: "general",
            date: "26.12.2023"
        },
        {
            id: 2,
            title: "Midterm Exam Schedule",
            content: "The midterm exam schedule for all courses has been published. Please check your department notice board or the online portal for details.",
            category: "academic",
            date: "24.12.2023"
        },
        {
            id: 3,
            title: "Annual Sports Week",
            content: "Join us for the annual sports week starting next Monday. Registrations are open for various competitions including cricket, football, and athletics.",
            category: "events",
            date: "20.12.2023"
        },
        {
            id: 4,
            title: "Library Hours Extended",
            content: "The central library will remain open until 10 PM during exam preparation weeks. Please make use of the extended hours for your studies.",
            category: "academic",
            date: "18.12.2023"
        },
        {
            id: 5,
            title: "Career Counseling Session",
            content: "A career counseling session will be held next Friday for final year students. Industry experts will be present to guide you about career opportunities.",
            category: "events",
            date: "15.12.2023"
        },
        {
            id: 6,
            title: "New Course Offerings",
            content: "The department is introducing three new elective courses next semester. Check the course catalog for details and prerequisites.",
            category: "academic",
            date: "12.12.2023"
        },
          {
            id: 7,
            title: "New Course Offerings",
            content: "The department is introducing three new elective courses next semester. Check the course catalog for details and prerequisites.",
            category: "academic",
            date: "12.12.2023"
        },
          {
            id: 8,
            title: "New Course Offerings",
            content: "The department is introducing three new elective courses next semester. Check the course catalog for details and prerequisites.",
            category: "academic",
            date: "12.12.2023"
        },
          {
            id: 9,
            title: "New Course Offerings",
            content: "The department is introducing three new elective courses next semester. Check the course catalog for details and prerequisites.",
            category: "academic",
            date: "12.12.2023"
        },
          {
            id: 10,
            title: "New Course Offerings",
            content: "The department is introducing three new elective courses next semester. Check the course catalog for details and prerequisites.",
            category: "academic",
            date: "12.12.2023"
        }
    ];

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
                    <span class="announcement-present-category-tag announcement-present-${announcement.category}">${announcement.category}</span>
                    <h3>${announcement.title}</h3>
                    <p>${announcement.content.substring(0, 100)}...</p>
                    <div class="announcement-present-card-meta">
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
            <p>${announcement.content}</p>
            ${isAdmin ? `<div class="announcement-present-admin-actions">
                <button class="announcement-present-delete-btn" data-id="${announcement.id}">Delete Announcement</button>
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

    // Initial render
    renderAnnouncements();
});