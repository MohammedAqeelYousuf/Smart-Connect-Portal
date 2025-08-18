import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/Sidebar";

const ExamSchedule = ({ role }) => {
  const [schedules, setSchedules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    department: "",
    class: "",
    examName: "",
    subject: "",
    date: "",
    timing: "",
  });
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semester: "",
    examName: "",
  });
  const [showModal, setShowModal] = useState(false);

  const examTypes = ["Mid 1", "Mid 2", "End Semester"];

  // Fetch all data from db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesRes, deptRes, classRes, subjectRes] = await Promise.all([
          fetch("http://localhost:8000/examSchedules"),
          fetch("http://localhost:8000/department"),
          fetch("http://localhost:8000/class"),
          fetch("http://localhost:8000/subjects"),
        ]);
        setSchedules(await schedulesRes.json());
        setDepartments(await deptRes.json());
        setClasses(await classRes.json());
        setSubjects(await subjectRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Add schedule (POST to json-server)
  const addSchedule = async () => {
    if (
      !formData.year ||
      !formData.semester ||
      !formData.department ||
      !formData.class ||
      !formData.examName ||
      !formData.subject ||
      !formData.date ||
      !formData.timing
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newSchedule = { ...formData };
      const res = await fetch("http://localhost:5500/examSchedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });
      const data = await res.json();
      setSchedules([...schedules, data]); // update state
      setFormData({
        year: "",
        semester: "",
        department: "",
        class: "",
        examName: "",
        subject: "",
        date: "",
        timing: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Error adding schedule:", err);
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    return (
      (!filters.department || schedule.department === filters.department) &&
      (!filters.year || schedule.year === filters.year) &&
      (!filters.semester || schedule.semester === filters.semester) &&
      (!filters.examName || schedule.examName === filters.examName)
    );
  });

  // Utility to resolve names from IDs
  const getDeptName = (id) =>
    departments.find((d) => d.id === id)?.name || id;

  const getClassName = (id) =>
    classes.find((c) => c.id === id)?.name || id;

  const getSubjectName = (id) =>
    subjects.find((s) => s.id === id)?.name || id;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Exam Schedule</h2>
        
      {/* Admin Add Button */}
      {role === "admin" && (
        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add Exam Schedule
          </button>
        </div>
      )}

      {/* Filters for students */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          Filter Exam Schedule
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="year"
                placeholder="Year"
                value={filters.year}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="semester"
                placeholder="Semester"
                value={filters.semester}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="examName"
                value={filters.examName}
                onChange={handleFilterChange}
              >
                <option value="">All Exams</option>
                {examTypes.map((exam) => (
                  <option key={exam} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Year</th>
            <th>Semester</th>
            <th>Department</th>
            <th>Class</th>
            <th>Exam</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Timing</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((sch) => (
              <tr key={sch.id}>
                <td>{sch.year}</td>
                <td>{sch.semester}</td>
                <td>{getDeptName(sch.department)}</td>
                <td>{getClassName(sch.class)}</td>
                <td>{sch.examName}</td>
                <td>{getSubjectName(sch.subject)}</td>
                <td>{sch.date}</td>
                <td>{sch.timing}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No schedules found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Exam Schedule</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      placeholder="Year"
                      value={formData.year}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      className="form-control"
                      name="semester"
                      placeholder="Semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Dept</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      name="examName"
                      value={formData.examName}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Exam</option>
                      {examTypes.map((exam) => (
                        <option key={exam} value={exam}>
                          {exam}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="time"
                      className="form-control"
                      name="timing"
                      value={formData.timing}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={addSchedule}>
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSchedule;
