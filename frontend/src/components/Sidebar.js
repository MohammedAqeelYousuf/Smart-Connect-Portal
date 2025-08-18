function Sidebar() {
  return (
    <div
      className="d-flex flex-column p-3"
      style={{ width: "250px", height: "100vh", backgroundColor: "powderblue" }}
    >
      <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span className="fs-4">Sidebar</span>
      </a>
     
      {/* <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active bg-primary text-white" aria-current="page">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark">
            Customers
          </a>
        </li>
      </ul> */}
      <hr />
      {/* <div>
        <a href="#" className="d-flex align-items-center text-dark text-decoration-none">
          <strong>User</strong>
        </a>
      </div> */}
    </div>
  );
}

export default Sidebar;
