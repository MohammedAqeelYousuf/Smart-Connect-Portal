import Sidebar from "../components/Sidebar";
import Placement from "../features/Admin/Placement";
import UpdateCompanyDetails from "../features/Admin/UpdateCompanyDetails";
import CompanyDetails from "../features/common/CompanyDetails";

function Admin(){
    return (
        <main className="container-fluid p-0">
            <div className="d-flex vh-100">
                <div className="" style={{'width':"75px"}}>
                    <Sidebar />
                </div>
                {/* <Placement /> */}
                {/* <CompanyDetails /> */}
                {/* <UpdateCompanyDetails /> */}
            </div>
        </main>
    )
}

export default Admin;