import { useState } from "react";
import Heading from "../../components/Heading";
import Badge from 'react-bootstrap/Badge';
import Table from "../../components/Table";

function UpdateCompanyDetailsFields({type,fieldName,fieldDescription}){
    return (
        <>
            {
                type==="text" &&
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <div className="col-7"> 
                        <input className="form-control" type="text" placeholder="Default input" aria-label="default input example" value={fieldDescription} />
                    </div>
                </div>
            }

            {
                type==="badge" && <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <div className="col-7"> 
                        <input className="form-control" type="text" placeholder="Default input" aria-label="default input example" value={fieldDescription.join(", ")} />
                    </div>
                </div>
            }

            {
                type==="checkbox" &&
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">{fieldName}</h4>
                    <div className="col-7 m-0">
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox"  />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox"  />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox"  />No Active Backlog
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox"  />No Active Backlog
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

function UpdateCompanyDetails(){
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
            <Heading back={true} link={""} heading={companyDetails.name} />
            <UpdateCompanyDetailsFields type="text" fieldName={"Description"} fieldDescription={companyDetails.description} />
            <UpdateCompanyDetailsFields type="badge" fieldName={"Skills"} fieldDescription={companyDetails.skills} />
            <UpdateCompanyDetailsFields type={"text"} fieldName={"Last Registration Date"} fieldDescription={companyDetails.lastRegisterationDate} />
            <UpdateCompanyDetailsFields type="badge" fieldName={"Department"} fieldDescription={companyDetails.departments} />
            <UpdateCompanyDetailsFields type={"badge"} fieldName={"Batch"} fieldDescription={companyDetails.batch} />
            <UpdateCompanyDetailsFields type={"checkbox"} fieldName={"Restrictions"} fieldDescription={companyDetails.appliedStudents?.length || 0} />
            <div className="contianer-fluid d-flex gap-2 justify-item-center align-item-center">
                <button type="button" className="btn btn-outline-primary">Save</button>
                <button type="button" className="btn btn-outline-danger">Reset</button>
            </div>
        </div>
    )
}

export default UpdateCompanyDetails;