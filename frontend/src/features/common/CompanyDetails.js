import { useContext, useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Badge from 'react-bootstrap/Badge';
import Table from "../../components/Table";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import * as xlsx from "xlsx";

function CompanyDetailsFields({type,fieldName,fieldDescription}){
    return (
        <>
            {
                type==="text" &&
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <p className="col-7 m-0">{fieldDescription}</p>
                </div>
            }

            {
                type==="badge" && <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <div className="col-7 m-0 d-flex gap-2">
                        {
                            fieldDescription?.map(badge=>(
                                <h6>
                                    <Badge bg="primary">{badge}</Badge>
                                </h6>
                            ))
                        }
                    </div>
                </div>
            }

            {
                type==="checkbox" &&
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <div className="col-7 m-0">
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox" disabled={true} />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox" disabled={true} />No Previous Offer
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const StudentsTable = ({ companyId, columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const context = useContext(AppContext);
  const {updateStudentStatusForCompanyById, getCompanyById} = context;
  
  const rowsPerPage = 2;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatus = (value, id) => {
    // updateStudentStatusForCompanyById(companyId,studentId,value)
    // getCompanyById(companyId)
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data?.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr No.</th>
            {columns?.map((col, index) => (
              <th key={index} scope="col">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData?.map((row, index) => (
            <tr key={index}>
                <td scope="row">{startIndex + index + 1}</td>
                <td scope="row">{row?.student?.firstName}</td>
                <td scope="row">{row?.student?.department?.name}</td>
                <td scope="row">
                    <select className="form-select form-select-sm" value={row?.status} onChange={(e)=>{handleStatus(e.target.value,row.student._id)}} >
                        <option value="Applied">Applied</option>
                        <option value="Placed">Placed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            tabIndex="-1"
          >
            Previous
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </>
  );
};

function CompanyDetails(){
    const [companyDetails,setCompanyDetails] = useState(null)

    const context = useContext(AppContext);
    const {getCompanyById, currentCompany, allCompaines, currentUser} = context;
  console.log(currentUser)
    const {id} = useParams();
    
    useEffect(()=>{
        const company = allCompaines?.filter(c => c._id === id);
        console.log(company)
        if(company?.length>0){
            setCompanyDetails(company[0]);
            return;
        }

        getCompanyById(id);
    },[])

    useEffect(()=>{
        setCompanyDetails(currentCompany);
        console.log(currentCompany)
    }, currentCompany)

    const exportToExcel = () => {
      const filteredData = companyDetails?.appliedStudents?.map(record => {
        return {
          name: record.student.firstName+" "+record.student.lastName,
          department: record.student.department?.name,
          status: record.status
        }
      })

      console.log(filteredData, companyDetails?.appliedStudents)

      const worksheet = xlsx.utils.json_to_sheet(filteredData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook,worksheet, "sheet1");

      xlsx.writeFile(workbook, "PlacementStatus.xlsx")
    }
    console.log(currentUser);
    return(
        <div className="container-fluid p-2 vh-100">
            {companyDetails &&
                <>
                <div className="container-fluid">
                <Link to="/student/placement" className="p-3 m-0 text-secondary text-decoration-none">Back</Link>
                <div className='container-fluid d-flex justify-content-between'>
                    <h1 className="h1 p-0 m-0">{companyDetails.name}</h1>
                        <div>
                            {
                              currentUser?.role && "Admin" ?  <button className='btn btn-outline-primary' onClick={exportToExcel}>Export Data</button> : <button className='btn btn-outline-primary'>Apply</button>
                            }
                        </div>
                    </div>
                    <hr className="border-3" />
                </div>
                <CompanyDetailsFields type="text" fieldName={"Description"} fieldDescription={companyDetails?.description} />
                <CompanyDetailsFields type="badge" fieldName={"Skills"} fieldDescription={companyDetails?.skills} />
                <CompanyDetailsFields type={"text"} fieldName={"Last Registration Date"} fieldDescription={companyDetails?.lastRegisterationDate} />
                <CompanyDetailsFields type="badge" fieldName={"Department"} fieldDescription={companyDetails?.departments} />
                <CompanyDetailsFields type={"text"} fieldName={"Batch"} fieldDescription={companyDetails?.batch?.name} />

                {
                  currentUser?.role === "Admin" && <>
                    <CompanyDetailsFields type={"text"} fieldName={"Applied Students"} fieldDescription={companyDetails?.appliedStudents?.length || 0} />
                    <CompanyDetailsFields type={"checkbox"} fieldName={"Restrictions"} fieldDescription={companyDetails?.appliedStudents?.length || 0} />
                    <StudentsTable companyId={id} columns={["Student Name","Department","Applied Status"]} data={companyDetails?.appliedStudents} />
                  </> 
                }
            </>
            }
        </div>
    )
}

export default CompanyDetails;