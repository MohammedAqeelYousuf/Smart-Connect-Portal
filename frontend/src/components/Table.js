import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Table = ({ columns, data, actions, parentRoute, isAdmin = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data?.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(data?.length / rowsPerPage);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr No.</th>
            {columns?.map((col, index) => (
              <th key={index} scope="col">{col}</th>
            ))}
            {actions && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData?.map((row, index) => (
            <tr key={index}>
              <td scope="row">{startIndex + index + 1}</td>
              {Object.entries(row)?.map(([key, value], idx) => {
                if(key!=="_id")
                 return <td key={idx}>{value}</td>
                })}
              {
            actions && <td className='d-flex gap-2 jusitfy-items-center align-items-center'>
              <button className='btn btn-sm m-0 btn-info' style={{fontSize:"10px"}} onClick={()=>{console.log(`${parentRoute}/${row._id}`);navigate(`${parentRoute}/${row._id}`)}}>View</button>
              {
                isAdmin &&  <>
                <button className='btn btn-sm m-0 btn-warning' style={{fontSize:"10px"}}>Edit</button>
                <button className='btn btn-sm m-0 btn-danger' style={{fontSize:"10px"}}>Delete</button>
              </>
              }
            </td>
          }
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            tabIndex="-1"
          >
            Previous
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.bool
};

export default Table;
