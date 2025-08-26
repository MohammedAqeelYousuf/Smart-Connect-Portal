function Sidebar() {
    return (
                <aside className="bg-primary text-white p-3 d-none d-lg-flex flex-column" style={{ width: '80px', minWidth: '80px',alignItems:"center", height:"92vh" }}>
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1" aria-current="true">
                            <i className="bi bi-megaphone me-2"style={{fontSize:"1.5rem"}}></i>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1">
                            <i className="bi bi-bell me-3"style={{fontSize:"1.5rem"}}></i>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1">
                            <i className="bi bi-briefcase-fill me-2" style={{fontSize:"1.5rem"}}></i>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action bg-primary text-white border-0 rounded my-1">
                            <i className="bi bi-calendar-check me-2" style={{fontSize:"1.5rem"}}></i>
                        </a>
                    </div>
                </aside>
            );
}
export default Sidebar;
