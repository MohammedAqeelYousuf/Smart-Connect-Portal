import { useContext, useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import Table from '../../components/Table';
import AppContext from '../../context/AppContext';

function Placement() {
  const context = useContext(AppContext);
  const { allBatches, getAllBatches, getAllCompanies, allCompanies } = context;

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editedBatchName, setEditedBatchName] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  const [filteredBatches, setFilteredBatches] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllBatches();
      await getAllCompanies();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredBatches(
      allBatches?.filter((b) =>
        b.name.toLowerCase().includes(batchFilter.toLowerCase())
      ) || []
    );
  }, [batchFilter, allBatches]);

  useEffect(() => {
    setFilteredCompanies(
      allCompanies?.filter((c) =>
        c.name.toLowerCase().includes(companyFilter.toLowerCase())
      ) || []
    );
  }, [companyFilter, allCompanies]);

  const handleUpdateBatch = async () => {
    if (!selectedBatch) return;

    try {
      throw new Error('Update failed');

      await getAllBatches();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update batch');
    }
  };

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
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                />
                <button className="btn btn-sm btn-primary">Add +</button>
              </div>
            </div>
            <div className="card-body p-0">
              <Table
                columns={['Batch Name', 'Students Enrolled', 'Students Placed']}
                actions={true}
                data={filteredBatches?.map((d) => ({
                  _id: d._id,
                  name: d.name,
                  enrolled: d.students.length,
                  placed: d.placedStudents,
                }))}
                parentRoute="/admin/batch"
                isAdmin={true}
                onEdit={(batch) => {
                  setSelectedBatch(batch);
                  setEditedBatchName(batch.name);
                  setShowModal(true);
                }}
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
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                />
                <button className="btn btn-sm btn-primary">Add +</button>
              </div>
            </div>
            <div className="card-body p-0">
              <Table
                columns={['Company Name', 'Last Reg. Date', 'Batch']}
                actions={true}
                data={filteredCompanies?.map((d) => ({
                  _id: d._id,
                  name: d.name,
                  lastDate: d.lastRegisterationDate,
                  batch: d.batch.name,
                }))}
                parentRoute="/admin/company"
                isAdmin={true}
              />
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Batch</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Batch Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedBatchName}
                  onChange={(e) => setEditedBatchName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateBatch}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Placement;
