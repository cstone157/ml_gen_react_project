import React, { useState, useEffect } from 'react';
import SupplyModal from './SupplyModal';
import CreateSupplyModal from './CreateSupplyModal';

function SuppliesTable() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/supplies');
        const data = await response.json();
        setSupplies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchSupplies();
  }, []);

  const handleRowClick = (supply) => {
    setSelectedSupply(supply);
    setIsModalOpen(true);
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateSupply = async (newSupply) => {
    try {
      const response = await fetch('http://localhost:3000/api/supplies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupply),
      });
      const data = await response.json();
      setSupplies([...supplies, data]);
    } catch (error) {
      console.error(error);
    }
    handleCreateModalClose();
  };

  const handleSupplyUpdate = async (updatedSupply) => {
    try {
      const response = await fetch(`http://localhost:3000/api/supplies/${updatedSupply.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSupply),
      });
      const data = await response.json();
      const updatedSupplies = supplies.map((supply) => (supply.id === data.id ? data : supply));
      setSupplies(updatedSupplies);
    } catch (error) {
      console.error(error);
    }
    handleModalClose();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPageNumber(0);
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      
      <div
        style={{
          width: '90%',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        <div style={{
            alignItems: 'right',
            textAlign: 'right'
        }}>
          <button onClick={() => setIsCreateModalOpen(true)}>New</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>In Stock</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {supplies
              .slice(pageNumber * rowsPerPage, (pageNumber + 1) * rowsPerPage)
              .map((supply, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(supply)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <td>{supply.name}</td>
                  <td>{supply.inStock}</td>
                  <td>${supply.cost.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <div>
            <label>
              Rows per page:
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Page: {pageNumber + 1} of {Math.ceil(supplies.length / rowsPerPage)}
            </label>
            <button onClick={() => handleChangePage(null, 0)}>First</button>
            <button onClick={() => handleChangePage(null, pageNumber - 1)}>Prev</button>
            <button onClick={() => handleChangePage(null, pageNumber + 1)}>Next</button>
            <button onClick={() => handleChangePage(null, Math.ceil(supplies.length / rowsPerPage) - 1)}>Last</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SupplyModal
          onClose={handleModalClose}
          supply={selectedSupply}
          onUpdate={handleSupplyUpdate}
        />
      )}
      {isCreateModalOpen && (
        <CreateSupplyModal
          onClose={handleCreateModalClose}
          onCreate={handleCreateSupply}
        />
      )}
    </div>
  );
}

export default SuppliesTable;
