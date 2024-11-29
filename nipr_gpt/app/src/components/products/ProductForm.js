import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ isOpen, onClose, product, handleSubmit }) => {
  const [name, setName] = useState(product.name || '');
  const [sellCost, setSellCost] = useState(product.sellCost || 0);
  const [timeToBuild, setTimeToBuild] = useState(product.timeToBuild || 0);
  const [requiredSupplies, setRequiredSupplies] = useState(product.requiredSupplies || []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSellCostChange = (event) => {
    setSellCost(event.target.value);
  };

  const handleTimeToBuildChange = (event) => {
    setTimeToBuild(event.target.value);
  };

  const handleRequiredSuppliesChange = (event) => {
    setRequiredSupplies(event.target.value.split(','));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      name,
      sellCost,
      timeToBuild,
      requiredSupplies,
    };

    if (product._id) {
      await axios.put(`http://localhost:3000/products/${product._id}`, productData);
    } else {
      await axios.post('http://localhost:3000/products', productData);
    }
    handleSubmit();
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Sell Cost:
        <input type="number" value={sellCost} onChange={handleSellCostChange} />
      </label>
      <br />
      <label>
        Time to Build:
        <input type="number" value={timeToBuild} onChange={handleTimeToBuildChange} />
      </label>
      <br />
      <label>
        Required Supplies (comma-separated):
        <input type="text" value={requiredSupplies.join(',')} onChange={handleRequiredSuppliesChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
