import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Sidebar() {
  const { currentUser } = useContext(AppContext);
  const role = currentUser?.role;
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = {
    student: [
      { to: "/student/announcement", icon: "bi-megaphone", title: "Announcements" },
      { to: "/student/examschedule", icon: "bi-calendar-check", title: "Exam Schedule" },
      { to: "/student/placement", icon: "bi-briefcase-fill", title: "Placements" },
      { to: "/student/feedback", icon: "bi-chat-dots", title: "Feedback" },
    ],
    staff: [
      { to: "/admin/announcement", icon: "bi-megaphone", title: "Announcements" },
      { to: "/admin/examschedule", icon: "bi-calendar-check", title: "Exam Schedule" },
      { to: "/admin/placement", icon: "bi-briefcase-fill", title: "Placements" },
    ],
  };

  if (!role) return null;

  const handleNavClick = (to) => {
    navigate(to);
    // Close offcanvas programmatically
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  };

  return (
    <>
      {/* Sidebar for desktop */}
      <aside
        className="bg-primary text-white p-3 d-none d-lg-flex flex-column"
        style={{
          width: "80px",
          minWidth: "80px",
          alignItems: "center",
          height: "92vh",
        }}
      >
        <div className="list-group list-group-flush">
          {menuItems[role]?.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1 ${
                location.pathname === item.to ? "active" : ""
              }`}
              title={item.title}
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: "1.5rem" }}></i>
            </Link>
          ))}
        </div>
      </aside>

      {/* Offcanvas for mobile */}
      <div
        className="offcanvas offcanvas-start bg-primary text-white"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group list-group-flush">
            {menuItems[role]?.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.to)}
                className={`list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1 ${
                  location.pathname === item.to ? "active" : ""
                }`}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

