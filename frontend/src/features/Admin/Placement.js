import { useContext, useEffect } from 'react'
import Heading from '../../components/Heading'
import Table from '../../components/Table'
import AppContext from '../../context/AppContext'

function Placement(){
    const context = useContext(AppContext);
    const {allBatches, getAllBatches, getAllCompanies, allCompanies} = context;


    useEffect(()=>{
        getAllBatches();
        getAllCompanies();
        console.log(allCompanies)
    },[])

    return (
        <div className="container-fluid p-2 vh-100">
            <Heading back={false} heading={"Placement Data"} />
            <div className="p-2">
                <div className="container-fluid d-flex justify-content-between">
                    <h4 className="h4 p-0">Batches</h4>
                    <div className="d-flex gap-2">
                        <form role="search">
                            <input class="form-control" type="search" placeholder="Enter Batch Year" aria-label="Enter Batch Year"/>
                        </form>
                        <button className="btn bg-primary text-white">Add +</button>
                    </div>
                </div>
                <Table columns={["Batch Name","Students Enrolled"," Students PLaced"]} actions={true} data={allBatches?.map((d,i)=>{return {_id:d._id, name:d.name,enrolled:d.students.length,placed:d.placedStudents}})} parentRoute={"/admin/batch"} isAdmin={true} />
            </div>
            <div className="p-2">
                <div className="container-fluid d-flex justify-content-between">
                    <h4 className="h4 p-0">Companies</h4>
                    <div className="d-flex gap-2">
                        <form role="search">
                            <input class="form-control" type="search" placeholder="Enter Company Name" aria-label="Enter Batch Year"/>
                        </form>
                        <button className="btn bg-primary text-white">Add +</button>
                    </div>
                </div>
                <Table columns={["Company Name","Last Reg. Date","Batch"]} actions={true} data={allCompanies?.map((d,i)=>{return {_id:d._id,name:d.name,lastDate:d.lastRegisterationDate,batch:d.batch.name}})} parentRoute={"/admin/company"} isAdmin={true} />
            </div>
        </div>
    )
}

export default Placement;