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
    <div className='modal'>
      <div className='content'>
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
