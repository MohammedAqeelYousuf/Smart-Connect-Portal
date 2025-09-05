import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ columns, data = [], actions, parentRoute, isAdmin = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              {columns.map((col, index) => (
                <th key={index} scope="col">{col}</th>
              ))}
              {actions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center text-muted">
                  No data available
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  {Object.entries(row).map(([key, value], idx) => {
                    if (key !== '_id') return <td key={idx}>{value}</td>;
                    return null;
                  })}
                  {actions && (
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-info"
                          onClick={() => navigate(`${parentRoute}/${row._id}`)}
                        >
                          View
                        </button>
                        {isAdmin && (
                          <>
                            <button className="btn btn-outline-warning">Edit</button>
                            <button className="btn btn-outline-danger">Delete</button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Table;
