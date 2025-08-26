import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Table from "../../components/Table";

const ViewBatch = () => {
    const [batch, setBatch] = useState([])

    const context = useContext(AppContext);
    const {getBatchById, selectedBatch, allBatches} = context;
    const {id} = useParams();

    useEffect(()=>{
        getBatchById(id)
    }, [])

    useEffect(()=>{
        setBatch(selectedBatch)
    }, [selectedBatch])

    return <div className="container-fluid">
            <Link to="/admin/placement" className="p-3 m-0 text-secondary text-decoration-none">Back</Link>
            <div className='container-fluid d-flex justify-content-between'>
                <h1 className="h1 p-0 m-0">Batch - {batch?.name}</h1>
            </div>
            <hr className="border-3" />
            <div className="container-fluid ">
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">Students Enrolled:</h4>
                    <p className="col-7 m-0">{batch?.students?.length || 0}</p>
                </div>
                <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
                    <h4 className="col-5 h4 m-0">Placed Students:</h4>
                    <p className="col-7 m-0">{batch?.placedStudents || 0}</p>
                </div>
                <div className="mt-2">
                    <Table columns={["Student Name", "Department"]} data={batch?.students?.map(student => {return {_id:student._id,name:student.firstName+" "+student.lastName,department:student.department?.name}})} isAdmin={true} />
                </div>
            </div>
        </div>
}

export default ViewBatch;