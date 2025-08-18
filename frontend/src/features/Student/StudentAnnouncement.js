import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import "../../styles/Announcement.css";
import AnnouncementCard from "../../components/AnnouncementCard";

function StudentAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [cat, setCat] = useState("");
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [edate, setEdate] = useState("");
  const [loc, setLoc] = useState("");
  const [lastdate, setLastdate] = useState("");

  // const location = useLocation();
  // const roleFromURL = location.pathname.includes("/student")
  //   ? "Student"
  //   : "Admin";

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

  const openModal = (announcement) => {
    setHeading(announcement.title);
    setDesc(announcement.description);
    setCat(announcement.category);
    setEdate(announcement.eventDate);
    setLoc(announcement.location);

    if (announcement.category === "Event") {
      setLastdate(announcement.lastRegisterationDate);
    }
    setShowModal(true);
  };

  useEffect(() => {
    console.log("cat updated:", cat);
  }, [cat]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="announcement-present-container">
      <header className="announcement-present-header">
        <h1>Announcements</h1>
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
      </header>

      <div className="announcement-present-grid">
        {filteredAnnouncements.length > 0 ? (
          [...filteredAnnouncements].reverse().map((announcement) => (
            <div onClick={() => openModal(announcement)}>
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

      {/* View Modal */}
      {showModal && (
        <div className="announcement-present-modal">
          <div className="announcement-present-modal-content">
            <button
              type="button"
              className="announcement-present-close-btn"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="announcement-present-modal-body">
              <div>
                <h2>{heading}</h2>
                <p>{cat}</p>
              </div>
              <p className="announcement-present-date">{desc}</p>
              <p>Event Date: {edate}</p>
              <p>Location: {loc}</p>
            </div>
            <div>
              {cat === "Event" && (
                <div>
                  <p>Last date for Registration: {lastdate}</p>
                  <button>Register</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentAnnouncement;
