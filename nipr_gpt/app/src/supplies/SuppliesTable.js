import React, { useState, useEffect } from 'react';
import SupplyModal from './SupplyModal';

function SuppliesTable() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalClose = () => {
    setIsModalOpen(false);
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
      <table
        style={{
          width: '90%',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            <th style={{alignItems: 'left'}}>Name</th>
            <th style={{alignItems: 'left'}}>In Stock</th>
            <th style={{alignItems: 'left'}}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply, index) => (
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
      {isModalOpen && (
        <SupplyModal
          onClose={handleModalClose}
          supply={selectedSupply}
          onUpdate={handleSupplyUpdate}
        />
      )}
    </div>
  );
}

export default SuppliesTable;
