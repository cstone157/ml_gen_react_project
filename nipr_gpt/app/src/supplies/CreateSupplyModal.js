import React, { useState } from 'react';

function CreateSupplyModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [inStock, setInStock] = useState(0);
  const [cost, setCost] = useState(0);

  const handleCreate = () => {
    const newSupply = { name, inStock, cost };
    onCreate(newSupply);
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
        <h2>Create New Supply</h2>
        <form>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            In Stock:
            <input type="number" value={inStock} onChange={(e) => setInStock(parseInt(e.target.value))} />
          </label>
          <br />
          <label>
            Cost:
            <input type="number" value={cost} onChange={(e) => setCost(parseFloat(e.target.value))} />
          </label>
          <br />
          <button onClick={handleCreate}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateSupplyModal;
