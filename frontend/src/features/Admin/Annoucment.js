import React, { useEffect, useState } from "react";
import "../../styles/Announcement.css";
import AnnouncementCard from "../../components/AnnouncementCard";
import Sidebar from "../../components/Sidebar";



function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [cat, setCat] = useState("");
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [edate, setEdate] = useState("");
  const [loc, setLoc] = useState("");
  const [lastdate, setLastdate] = useState("");

  // Form states for Create Announcement
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formLocation, setFormLocation] = useState("");

  useEffect(() => {
    fetch("http://localhost:5500/announcements")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
        setFilteredAnnouncements(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredAnnouncements(announcements);
    } else {
      setFilteredAnnouncements(
        announcements.filter(
          (ann) => ann.category.toLowerCase() === filter.toLowerCase()
        )
      );
    }
  };

  const openViewModal = (announcement) => {
    setHeading(announcement.title);
    setDesc(announcement.description);
    setCat(announcement.category);
    setEdate(announcement.eventDate);
    setLoc(announcement.location);

    if (announcement.category === "Event") {
      setLastdate(announcement.lastRegisterationDate);
    }
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    const newAnnouncement = {
      id: Date.now(),
      title: formTitle,
      description: formDesc,
      eventDate: formStartDate,
      location: formLocation,
      endDate: formEndDate,
      category: "General", // you can later add dropdown for category
    };

    // Save to backend (JSON server or API)
    fetch("http://localhost:5500/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements([...announcements, data]);
        setFilteredAnnouncements([...filteredAnnouncements, data]);
        closeCreateModal();
        // Reset form
        setFormTitle("");
        setFormDesc("");
        setFormStartDate("");
        setFormEndDate("");
        setFormLocation("");
      });
  };

  return (
    <div className="announcement-present-container">
      <header className="announcement-present-header"  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Announcements</h1>

        {/* Create Announcement Button */}
        <button
          type="button"
          className="create-announcement-btn"
          onClick={openCreateModal}
        >
          + Create Announcement
        </button>
      </header>

      <div className="announcement-filters">
        <button
          type="button"
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-btn ${
            activeFilter === "academic" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("academic")}
        >
          Academic
        </button>
        <button
          type="button"
          className={`filter-btn ${activeFilter === "event" ? "active" : ""}`}
          onClick={() => handleFilterChange("event")}
        >
          Events
        </button>
        <button
          type="button"
          className={`filter-btn ${
            activeFilter === "general" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("general")}
        >
          General
        </button>
      </div>

      <div className="announcement-present-grid">
        {filteredAnnouncements.length > 0 ? (
          [...filteredAnnouncements].reverse().map((announcement) => (
            <div onClick={() => openViewModal(announcement)} key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            {loading
              ? "Loading announcements..."
              : "No announcements available for this filter."}
          </p>
        )}
      </div>

      {/* View Modal with delete ui*/}
     {showViewModal && (
  <div className="announcement-present-modal">
    <div className="announcement-present-modal-content">
      <div className="announcement-present-action-buttons">
       
        <button
          type="button"
          className="announcement-present-close-btn"
          onClick={closeViewModal}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      <div className="announcement-present-modal-body">
        <div>
          <h2>{heading}</h2>
          <p>{cat}</p>
        </div>
        <p className="announcement-present-date">{desc}</p>
        <p>Event Date: {edate}</p>
        <p>Location: {loc}</p>
      </div>
      {cat === "Event" && (
        <div>
          <p>Last date for Registration: {lastdate}</p>
        </div>
      )}
       
        <button
          type="button"
          className="announcement-present-delete-btn"
         // 🔹 implement this handler
        >
          DELETE
        </button>
    </div>
  </div>
)}


      {/* Create Announcement Modal */}
      {showCreateModal && (
  <div className="announcement-present-modal">
    <div className="announcement-present-modal-content">
      <button
        type="button"
        className="announcement-present-close-btn"
        onClick={closeCreateModal}
        aria-label="Close modal"
      >
        &times;
      </button>
      <h2>Create New Announcements</h2>
      <form onSubmit={handleCreateSubmit} className="create-announcement-form">
        
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={formDesc}
          onChange={(e) => setFormDesc(e.target.value)}
          required
        />

        <label>Start Date</label>
        <input
          type="date"
          value={formStartDate}
          onChange={(e) => setFormStartDate(e.target.value)}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          value={formEndDate}
          onChange={(e) => setFormEndDate(e.target.value)}
          required
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={formLocation}
          onChange={(e) => setFormLocation(e.target.value)}
          required
        />

        <button type="submit" className="create-announcement-btn">
          Save
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default Announcements;
