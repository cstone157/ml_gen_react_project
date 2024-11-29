import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../Modal';
import './SupplyForm.css';

const SupplyForm = ({ isOpen, onClose, supply, handleSubmit }) => {
  const [name, setName] = useState(supply.name || '');
  const [costPerSupply, setCostPerSupply] = useState(supply.costPerSupply || 0);
  const [currentNumberInStock, setCurrentNumberInStock] = useState(supply.currentNumberInStock || 0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCostPerSupplyChange = (event) => {
    setCostPerSupply(event.target.value);
  };

  const handleCurrentNumberInStockChange = (event) => {
    setCurrentNumberInStock(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const supplyData = {
      name,
      costPerSupply,
      currentNumberInStock,
    };

    if (supply._id) {
      await axios.put(`http://localhost:3000/supplies/${supply._id}`, supplyData);
    } else {
      await axios.post('http://localhost:3000/supplies', supplyData);
    }
    handleSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{supply._id ? 'Edit Supply' : 'Create Supply'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Cost per supply:
          <input type="number" value={costPerSupply} onChange={handleCostPerSupplyChange} />
        </label>
        <br />
        <label>
          Current number in stock:
          <input type="number" value={currentNumberInStock} onChange={handleCurrentNumberInStockChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default SupplyForm;
