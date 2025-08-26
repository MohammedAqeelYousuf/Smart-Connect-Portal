import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Heading from "../../components/Heading";
import Table from "../../components/Table";

const StudentPlacement = () => {
    const context = useContext(AppContext);
    const {allCompanies, getAllCompanies} = context;

    useEffect(()=>{
        getAllCompanies();
    },[])

    return <>
        <Heading heading="Placement" />

        <Table columns={["Company Name","Last Reg. Date"]} actions={true} data={allCompanies?.map((d,i)=>{return {_id:d._id,name:d.name,lastDate:d.lastRegisterationDate,batch:d.batch.name}})} parentRoute={"/student/company"} />
    </>

}

export default StudentPlacement;