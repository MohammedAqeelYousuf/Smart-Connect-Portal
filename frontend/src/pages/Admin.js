import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Placement from "../features/Admin/Placement";
import UpdateCompanyDetails from "../features/Admin/UpdateCompanyDetails";
import CompanyDetails from "../features/common/CompanyDetails";

function Admin() {
    return (
        <div className="container-fluid p-0 d-flex main">
            <Sidebar />
            

            <div className="flex-grow-1 content">
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;