import React from "react";

function AnnouncementCard({ announcement }) {
  return (
    <>
      <button
        key={announcement.id}
        type="button"
        className="announcement-present-card announcement-present-events text-decoration-none"
      >
        <div className="announcement-present-card-content">
          <span>{announcement.category}</span>
          <h3>{announcement.title}</h3>
          <p>Click to read more..</p>
          <div className="announcement-present-card-meta">
            <span>📍{announcement.location}</span>
            <span>📅{announcement.eventDate}</span>
          </div>
        </div>
      </button>
    </>
  );
}

export default AnnouncementCard;
