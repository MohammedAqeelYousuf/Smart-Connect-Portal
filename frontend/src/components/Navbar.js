import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import logoSC from "../assets/logoSC.png";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const role = currentUser?.role;

  const handleLogoClick = () => {
    if (role === "student") {
      navigate("/student");
    } else if (role === "staff") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  const handleNavClick = (to) => {
    navigate(to);
    const offcanvasElement = document.getElementById("sidebarOffcanvas");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="navbar-brand d-flex align-items-center btn btn-link text-white text-decoration-none"
        >
          <img src={logoSC} alt="logo" className="me-2" style={{ height: "40px" }} />
          <span className="fw-bold">SmartCon</span>
        </button>

        {/* Hamburger for offcanvas */}
        <button
          className="btn btn-light d-lg-none ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
        </button>

        {/* Desktop Right Section */}
        <div className="ms-auto d-none d-lg-flex align-items-center">
          {currentUser ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="btn btn-link text-white me-2"
                title="Profile"
              >
                👤
              </button>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-light btn-sm">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Offcanvas Sidebar for Mobile */}
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
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          {/* Role-based Menu Items */}
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

          <hr className="border-light" />

          {/* Profile + Logout/Login at bottom */}
          <div>
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="btn btn-link text-white mb-2"
                >
                  👤 Profile
                </button>
                <button onClick={handleLogout} className="btn btn-danger w-100">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-light w-100"
                data-bs-dismiss="offcanvas"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
