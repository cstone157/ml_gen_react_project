import React, { useState } from 'react';

function CreateProductModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [inStock, setInStock] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [supplies, setSupplies] = useState([]);

  const handleCreate = () => {
    const newProduct = { name, inStock, salePrice, supplies };
    onCreate(newProduct);
  };

  const handleAddSupply = () => {
    setSupplies([...supplies, { supply: { name: '' }, quantityRequired: 0 }]);
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
                Supply:
                <input
                  type="text"
                  value={supply.supply.name}
                  onChange={(e) => handleSupplyChange(index, { ...supply, supply: { name: e.target.value } })}
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
          <button onClick={handleAddSupply}>Add Supply</button>
          <button onClick={handleCreate}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;
