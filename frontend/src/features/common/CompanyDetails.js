import { useState } from "react";
import Heading from "../../components/Heading";
import Badge from 'react-bootstrap/Badge';
import Table from "../../components/Table";

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
                            fieldDescription.map(badge=>(
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
                            <input type="checkbox" disabled={true} />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox" disabled={true} />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox" disabled={true} />No Active Backlog
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

function CompanyDetails(){
    const [companyDetails,setCompanyDetails] = useState({
            "id": "company1",
            "name": "CTS",
            "description": "Leading IT services company offering a wide range of solutions.",
            "skills": ["JavaScript", "HTML", "CSS", "Node.js"],
            "lastRegisterationDate": "27-08-2025",
            "Restrictions": ["Must have a CGPA above 7.0", "No active backlogs"],
            "appliedStudents": ["user1"],
            "departments": ["Computer","IT"],
            "batch":[2025]
        })

    return(
        <div className="container-fluid p-2 vh-100">
            <Heading back={true} link={""} buttons={["Export Data"]} heading={companyDetails.name} />
            <CompanyDetailsFields type="text" fieldName={"Description"} fieldDescription={companyDetails.description} />
            <CompanyDetailsFields type="badge" fieldName={"Skills"} fieldDescription={companyDetails.skills} />
            <CompanyDetailsFields type={"text"} fieldName={"Last Registration Date"} fieldDescription={companyDetails.lastRegisterationDate} />
            <CompanyDetailsFields type="badge" fieldName={"Department"} fieldDescription={companyDetails.departments} />
            <CompanyDetailsFields type={"text"} fieldName={"Applied Students"} fieldDescription={companyDetails.appliedStudents?.length || 0} />
            <CompanyDetailsFields type={"badge"} fieldName={"Batch"} fieldDescription={companyDetails.batch} />
            <CompanyDetailsFields type={"checkbox"} fieldName={"Restrictions"} fieldDescription={companyDetails.appliedStudents?.length || 0} />
        
            <Table columns={["Student Name","Department","Applied Status"]} />
        </div>
    )
}

export default CompanyDetails;