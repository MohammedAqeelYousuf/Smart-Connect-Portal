import { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Badge from "react-bootstrap/Badge";
import Table from "../../components/Table";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import * as xlsx from "xlsx";

function CompanyDetailsFields({ type, fieldName, fieldDescription }) {
  return (
    <>
      {type === "text" && (
        <div className="row align-items-center ps-4 pe-2 py-2">
          <h5 className="col-5 m-0">{fieldName}</h5>
          <p className="col-7 m-0">{fieldDescription}</p>
        </div>
      )}

      {type === "badge" && (
        <div className="row align-items-center ps-4 pe-2 py-2">
          <h5 className="col-5 m-0">{fieldName}</h5>
          <div className="col-7 d-flex flex-wrap gap-2">
            {fieldDescription?.map((badge, i) => (
              <Badge key={i} bg="primary">{badge}</Badge>
            ))}
          </div>
        </div>
      )}

      {type === "checkbox" && (
        <div className="row align-items-center ps-4 pe-2 py-2">
          <h5 className="col-5 m-0">{fieldName}</h5>
          <div className="col-7">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" disabled />
              <label className="form-check-label">No Active Backlog</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" disabled />
              <label className="form-check-label">No Previous Offer</label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const StudentsTable = ({ companyId, columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const context = useContext(AppContext);
  const { updateStudentStatusForCompanyById, getCompanyById } = context;

  const rowsPerPage = 5;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data?.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const handleStatus = async (value, studentId) => {
    await updateStudentStatusForCompanyById(companyId, studentId, value);
    await getCompanyById(companyId);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData?.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{row?.student?.firstName} {row?.student?.lastName}</td>
                  <td>{row?.student?.department?.name}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={row?.status}
                      onChange={(e) => handleStatus(e.target.value, row.student._id)}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Placed">Placed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center text-muted">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState(null);
  const { id } = useParams();
  const context = useContext(AppContext);
  const { getCompanyById, currentCompany, allCompaines, currentUser } = context;

  console.log(currentUser)
  useEffect(() => {
    const matched = allCompaines?.find(c => c._id === id);
    if (matched) {
      setCompanyDetails(matched);
    } else {
      getCompanyById(id);
    }
  }, [id]);

  useEffect(() => {
    setCompanyDetails(currentCompany);
  }, [currentCompany]);

  const exportToExcel = () => {
    const filteredData = companyDetails?.appliedStudents?.map(record => ({
      name: `${record.student.firstName} ${record.student.lastName}`,
      department: record.student.department?.name,
      status: record.status
    }));

    const worksheet = xlsx.utils.json_to_sheet(filteredData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "sheet1");
    xlsx.writeFile(workbook, "PlacementStatus.xlsx");
  };

  return (
    <div className="container-fluid py-3">
      {companyDetails && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Link to={`/${currentUser?.role === "admin" || currentUser?.role === "staff" ?"admin":"student"}/placement`} className="text-decoration-none text-secondary">← Back</Link>
              <h2 className="mt-2">{companyDetails.name}</h2>
            </div>
            <div>
              {currentUser?.role === "Admin" ? (
                <button className="btn btn-outline-primary" onClick={exportToExcel}>
                  Export Data
                </button>
              ) : (
                <button className="btn btn-outline-success">Apply</button>
              )}
            </div>
          </div>

          <hr />

          <CompanyDetailsFields type="text" fieldName="Description" fieldDescription={companyDetails?.description} />
          <CompanyDetailsFields type="badge" fieldName="Skills" fieldDescription={companyDetails?.skills} />
          <CompanyDetailsFields type="text" fieldName="Last Registration Date" fieldDescription={companyDetails?.lastRegisterationDate} />
          <CompanyDetailsFields type="badge" fieldName="Departments Allowed" fieldDescription={companyDetails?.departments} />
          <CompanyDetailsFields type="badge" fieldName="Batches" fieldDescription={companyDetails?.batch?.map(b => b.name)} />


          {currentUser?.role === "admin" || currentUser?.role === "staff" && (
            <>
              <CompanyDetailsFields type="text" fieldName="Applied Students" fieldDescription={companyDetails?.appliedStudents?.length || 0} />
              <CompanyDetailsFields type="checkbox" fieldName="Restrictions" />
              <StudentsTable
                companyId={id}
                columns={["Student Name", "Department", "Application Status"]}
                data={companyDetails?.appliedStudents}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CompanyDetails;
