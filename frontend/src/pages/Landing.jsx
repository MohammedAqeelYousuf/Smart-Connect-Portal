import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

export default function SmartCon() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
    
      <section
        id="home"
        className="landing-hero-section landing-text-center text-white d-flex align-items-center justify-content-center"
      >
        <div className="landing-hero-content">
          <h1 className="fw-bold">Welcome To SmartCon</h1>
          <p className="lead">
            A Smart Connect Portal. <br />
            Your digital gateway to stay updated with all campus happenings, announcements and more!
          </p>
          <button
            className="btn btn-primary landing-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </section>

      <section id="about" className="landing-about-section py-5">
        <div className="landing-container-box landing-text-center">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p className="landing-text-center mb-5 landing-text">
            SmartCon is a unified digital platform designed to streamline communication, collaboration,
            and campus engagement for students, faculty, and administrators. Our goal is to centralize essential
            academic services—like announcements, placements, results, and feedback—into one easy-to-use interface.
            Built with simplicity and efficiency in mind, SmartCon empowers students to stay informed, participate
            actively in campus events, and take charge of their academic journey.
          </p>
        </div>
      </section>

      <section id="services" className="landing-services-section py-5">
        <div className="landing-container-box landing-text-center">
          <h2 className="fw-bold mb-3">Services</h2>
          <p className="mb-5 landing-text">
            Comprehensive digital solutions for students and faculty to streamline campus life and academic excellence.
          </p>

          <div className="row g-4 landing-service-row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="landing-service-card p-4 h-100">
                <i className="bi bi-calendar-event fs-1 mb-3"></i>
                <h5>Events</h5>
                <p>Stay updated with college events, workshops, seminars, and cultural activities happening around campus.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="landing-service-card p-4 h-100">
                <i className="bi bi-journal-text fs-1 mb-3"></i>
                <h5>Exams</h5>
                <p>Access exam timetables, important dates, result announcements, and academic calendar updates.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="landing-service-card p-4 h-100">
                <i className="bi bi-briefcase fs-1 mb-3"></i>
                <h5>Placements</h5>
                <p>Get notified about job openings, campus recruitment drives, company visits, and placement statistics.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="landing-service-card p-4 h-100">
                <i className="bi bi-chat-dots fs-1 mb-3"></i>
                <h5>Feedback</h5>
                <p>Share feedback about courses, faculty, facilities, and help improve the college experience for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="landing-faq-section py-5">
        <div className="landing-container-box">
          <h2 className="fw-bold landing-text-center mb-4">Frequently Asked Questions</h2>
          <p className="landing-text-center mb-5 landing-text">
            Find answers to common questions about using SmartCon for your college experience.
          </p>

          <div className="accordion" id="faqAccordion">
            <div className="accordion-item landing-faq-card">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  How do I get notifications for exam schedules?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You will receive push notifications and email updates for exam schedules through SmartCon.
                </div>
              </div>
            </div>

            <div className="accordion-item landing-faq-card">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  Can I track placement opportunities for my specific course?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, placement opportunities are filtered based on your course and department preferences.
                </div>
              </div>
            </div>

            <div className="accordion-item landing-faq-card">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                  Where can I submit feedback about college facilities?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Feedback can be submitted directly via the SmartCon feedback form available on the dashboard.
                </div>
              </div>
            </div>

            <div className="accordion-item landing-faq-card">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                  How are campus events and activities announced?
                </button>
              </h2>
              <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Campus events and activities are announced through SmartCon’s events section and push notifications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-text-center text-white py-3 landing-footer">
        <p className="mb-0">2025 Smart Connect Portal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
