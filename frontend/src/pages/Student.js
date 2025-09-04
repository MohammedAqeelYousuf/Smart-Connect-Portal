import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Student({ children }) {
  return (
     <div className="container-fluid p-0 d-flex main">
            {/* <Navbar /> */}
            <Sidebar />
        

        <div className="flex-grow-1 content">
            <Outlet />
        </div>
    </div>
  );
}

export default Student;