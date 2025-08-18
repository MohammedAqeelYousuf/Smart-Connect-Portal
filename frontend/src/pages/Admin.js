import Sidebar from "../components/Sidebar";
import Placement from "../features/Admin/Placement";
import UpdateCompanyDetails from "../features/Admin/UpdateCompanyDetails";
import CompanyDetails from "../features/common/CompanyDetails";

function Admin() {
    return (
        <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh' }}>
            
            <div style={{ width: "75px", position: 'fixed', height: '100vh' }}>
                <Sidebar />
            </div>
            

            <div className="flex-grow-1" style={{ marginLeft: '75px', padding: '1rem' }}>
                <h2>Welcome, Admin!</h2>
                <p>This is the admin dashboard page.</p>
                
               
                {/* <Placement /> */}
                {/* <CompanyDetails /> */}
                {/* <UpdateCompanyDetails /> */}
            </div>
        </div>
    );
}

export default Admin;