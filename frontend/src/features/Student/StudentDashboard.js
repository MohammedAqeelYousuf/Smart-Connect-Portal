import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/StudentDashboard.css";
import "../../components/Sidebar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  const announcements = [
    { title: "Exam Schedule Released", date: "Aug 20, 2025" },
    { title: "Workshop on AI", date: "Aug 22, 2025" },
    { title: "Holiday Notice", date: "Aug 24, 2025" },
  ];

  const companies = [
    { name: "Google", date: "Aug 25, 2025" },
    { name: "Microsoft", date: "Aug 28, 2025" },
    { name: "Amazon", date: "Aug 30, 2025" },
  ];

  return (
    <Container fluid className="dashboard-container">
      {/* Welcome Section */}
      <div className="mb-4">
        <h1>Welcome, Student!</h1>
        <p className="text-muted">Your personalized dashboard</p>
      </div>

      <Row>
        {/* Recent Announcements */}
        <Col md={6} className="mb-4" >
          <Card className="custom-card border-secondary" style={{backgroundColor: '#CCDCEB'}}>
            <Card.Header className="fw-bold bg-light">
              Recent Announcements ➡️
            </Card.Header>
            <Card.Body className="d-flex justify-content-between flex-wrap">
              {announcements.map((a, idx) => (
                <div key={idx} className="announcement-box">
                  <h6 className="fw-bold">{a.title}</h6>
                  <small className="date-text">{a.date}</small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Companies */}
        <Col md={6} className="mb-4">
          <Card className="custom-card border-secondary" style={{backgroundColor: '#CCDCEB'}}>
            <Card.Header className="fw-bold bg-light">
              Recent Companies ➡️
            </Card.Header>
            <Card.Body className="d-flex justify-content-between flex-wrap">
              {companies.map((c, idx) => (
                <div key={idx} className="company-box">
                  <h6 className="fw-bold">{c.name}</h6>
                  <small className="date-text">{c.date}</small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SmartCon Tips */}
      <Card className="custom-card border-secondary mb-4">
        <Card.Header className="fw-bold bg-light">SmartCon Tips 💡</Card.Header>
        <Card.Body style={{backgroundColor: '#CCDCEB'}}>
          <Row>
            <Col md={6} className="d-flex flex-column gap-3 tips-left" >
              <span className="tip-badge">
                Use Dashboard to navigate smoothly.
              </span>
              <span className="tip-badge">
                Submit Feedback to help us improve.
              </span>
              <span className="tip-badge">
                Apply for an on-campus placement.
              </span>
            </Col>
            <Col md={6} className="d-flex flex-column gap-3 tips-right">
              <span className="tip-badge">
                Filter Announcements by category.
              </span>
              <span className="tip-badge">
                Keep checking your exam schedules daily.
              </span>
              <span className="tip-badge">
                Keep your profile info up to date.
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Need Help Section */}
      <Card className="custom-card border-secondary" style={{backgroundColor: '#CCDCEB'}}>
        <Card.Header className="fw-bold bg-light">Need Help?</Card.Header>
        <Card.Body>
          <p className="mb-1">📞 Helpline Number: +91-98765-43210</p>
          <p className="mb-1">📧 Email Support: support@smartcon.edu.in</p>
          <p className="mb-0">
            💡 For urgent login issues: Contact the admin in the college IT
            office during working hours.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentDashboard;