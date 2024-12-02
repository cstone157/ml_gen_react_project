import React, { useState } from 'react';

function SupplyModal({ onClose, supply, onUpdate }) {
  const [inStock, setInStock] = useState(supply.inStock);
  const [cost, setCost] = useState(supply.cost);

  const handleUpdate = () => {
    const updatedSupply = { ...supply, inStock, cost };
    onUpdate(updatedSupply);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2>Edit {supply.name}</h2>
        <form>
          <label>
            In Stock:
            <input
              type="number"
              value={inStock}
              onChange={(e) => setInStock(parseInt(e.target.value))}
            />
          </label>
          <br />
          <label>
            Cost:
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(parseFloat(e.target.value))}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default SupplyModal;