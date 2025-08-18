import React from "react";

const AdminDashboard = () => {
  return (
    <>
      {/* Top Welcome Banner */}
      <div className=" py-4 text-center ">
        <h2 className="fw-bold mb-1">Welcome, Admin !</h2>
        <p className="text-muted mb-0">Here's the overview</p>
      </div>

      {/* Dashboard Content */}
      <div className="container my-5">
        {/* Stats Cards */}
        <div className="row g-3 mb-5">
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body bg-success bg-opacity-25 rounded">
                <h3 className="fw-bold">40</h3>
                <p className="mb-0">Students</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body bg-primary bg-opacity-25 rounded">
                <h3 className="fw-bold">15</h3>
                <p className="mb-0">Feedback</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body bg-success bg-opacity-25 rounded">
                <h3 className="fw-bold">25</h3>
                <p className="mb-0">Announcements</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body bg-primary bg-opacity-25 rounded">
                <h3 className="fw-bold">20</h3>
                <p className="mb-0">Companies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback & Companies Section */}
        <div className="row g-3">
          {/* Latest Feedback */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-light fw-bold">Latest Feedback</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <span className="badge bg-primary me-2">40</span> Elevator is not working
                  </span>
                  <span className="text-muted small">Facilities</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <span className="badge bg-primary me-2">39</span> Water quality issue
                  </span>
                  <span className="text-muted small">Facilities</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <span className="badge bg-primary me-2">38</span> Computers are not working
                  </span>
                  <span className="text-muted small">Facilities</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <span className="badge bg-primary me-2">37</span> Food quality issue
                  </span>
                  <span className="text-muted small">Facilities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Upcoming Companies */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-light fw-bold">Upcoming Companies</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Cognizant Technology Solutions</span>
                  <span className="text-muted small">25-07-2025</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>ABC Tech</span>
                  <span className="text-muted small">26-09-2025</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>XYZ Tech Hub</span>
                  <span className="text-muted small">25-07-2025</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>POR Services</span>
                  <span className="text-muted small">25-07-2025</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
