import { useContext, useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import AppContext from '../../context/AppContext';

function Placement() {
  const context = useContext(AppContext);
  const { allBatches, getAllBatches, getAllCompanies, allCompanies } = context;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllBatches();
      await getAllCompanies();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid py-4 px-3 bg-light min-vh-100">
      <Heading back={false} heading="Placement Dashboard" />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h5 className="mb-0">🎓 Batches</h5>
              <div className="d-flex gap-2">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Enter Batch Year"
                  aria-label="Search Batch"
                />
                <button className="btn btn-sm btn-primary">
                  Add +
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <Table
                columns={['Batch Name', 'Students Enrolled', 'Students Placed']}
                actions={true}
                data={allBatches?.map((d) => ({
                  _id: d._id,
                  name: d.name,
                  enrolled: d.students.length,
                  placed: d.placedStudents,
                }))}
                parentRoute="/admin/batch"
                isAdmin={true}
              />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h5 className="mb-0">🏢 Companies</h5>
              <div className="d-flex gap-2">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Enter Company Name"
                  aria-label="Search Company"
                />
                <button className="btn btn-sm btn-primary">
                  Add +
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <Table
                columns={['Company Name', 'Last Reg. Date', 'Batch']}
                actions={true}
                data={allCompanies?.map((d) => ({
                  _id: d._id,
                  name: d.name,
                  lastDate: d.lastRegisterationDate,
                  batch: d.batch.name,
                }))}
                parentRoute="/admin/company/view"
                isAdmin={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Placement;
