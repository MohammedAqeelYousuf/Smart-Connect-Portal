import { Link } from "react-router-dom";
import { FaBullhorn, FaUser, FaClipboardList, FaBriefcase, FaChartBar, FaComment } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div style={{
      backgroundColor: "#3f62c2",
      width: "60px",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "35px"
    }}>
     <Link to="/student/announcement" title="Announcements">
  <FaBullhorn size={30} color="white" style={{ marginBottom: "30px", cursor: "pointer" }} />
</Link>

<Link to="/student/feedback" title="Feedback">
  <FaComment size={30} color="white" style={{ marginBottom: "30px", cursor: "pointer" }} />
</Link>

<Link to="/student/examschedule" title="Exams">
  <FaClipboardList size={30} color="white" style={{ marginBottom: "30px", cursor: "pointer" }} />
</Link>

<Link to="/student/placement" title="Jobs">
  <FaBriefcase size={30} color="white" style={{ cursor: "pointer" }} />
</Link>

    </div>
  );
}
