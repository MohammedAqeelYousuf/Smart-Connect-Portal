import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Student({ children }) {
  return (
    <div className="container-fluid p-0 d-flex flex-column" style={{ minHeight: '100vh',position: 'fixed' }}>
  
      <Navbar />
      
      <div className="d-flex flex-grow-1">
 
        <div style={{ width: "75px", position: 'fixed', height: 'calc(100vh - 56px)', top: '56px' }}>
          <Sidebar role="student" />
        </div>
        
      
        <div className="flex-grow-1" style={{ marginLeft: '75px', padding: '1rem', marginTop: '56px'  }}>
          {children || (
            <>
              <h2>Welcome, Student!</h2>
              <p>This is your student dashboard.</p>
              {/* Default content when no children are provided */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;