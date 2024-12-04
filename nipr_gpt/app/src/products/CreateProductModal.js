import React, { useState, useEffect } from 'react';
import SupplySelector from '../supplies/SupplySelector';

function CreateProductModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inStock, setInStock] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [supplies, setSupplies] = useState([]);
  const [allSupplies, setAllSupplies] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/supplies');
        const data = await response.json();
        setAllSupplies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchSupplies();
  }, []);

  const handleCreate = () => {
    const newProduct = { name, inStock, salePrice, supplies };
    onCreate(newProduct);
  };

  const handleAddSupply = () => {
    setSupplies([...supplies, { supply: { id: '', name: '' }, quantityRequired: 0 }]);
  };

  const handleRemoveSupply = (index) => {
    setSupplies(supplies.filter((supply, i) => i !== index));
  };

  const handleSupplyChange = (index, supply) => {
    setSupplies(supplies.map((s, i) => (i === index ? supply : s)));
  };

  return (
    <div className='modal'>
      <div className='content'>
        <h2>Create New Product</h2>
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
            Sale Price:
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(parseFloat(e.target.value))} />
          </label>
          <br />
          <h3>Supplies:</h3>
          {supplies.map((supply, index) => (
            <div key={index}>
              <label>
              <SupplySelector
                supplies={allSupplies}
                //value={supply.supply.id}
                value={supply.id}
                onChange={(value) => handleSupplyChange(index, value)}
              />
              </label>
              <br />
              <label>
                Quantity Required:
                <input
                  type="number"
                  value={supply.quantityRequired}
                  onChange={(e) => handleSupplyChange(index, { ...supply, quantityRequired: parseInt(e.target.value) })}
                />
              </label>
              <br />
              <button onClick={() => handleRemoveSupply(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddSupply}>Add Supply</button>
          <button type="button" onClick={handleCreate}>Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;
