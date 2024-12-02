import React, { useState } from 'react';

function ProductsModal({ onClose, product, onUpdate }) {
  const [inStock, setInStock] = useState(product.inStock);
  const [salePrice, setSalePrice] = useState(product.salePrice);
  const [supplies, setSupplies] = useState(product.supplies);

  const handleUpdate = () => {
    const updatedProduct = { ...product, inStock, salePrice, supplies };
    onUpdate(updatedProduct);
  };

  const handleQuantityChange = (index, value) => {
    const updatedSupplies = [...supplies];
    updatedSupplies[index].quantityRequired = parseInt(value);
    setSupplies(updatedSupplies);
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
          maxWidth: '800px',
        }}
      >
        <h2>Edit {product.name}</h2>
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
            Sale Price:
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(parseFloat(e.target.value))}
            />
          </label>
          <br />
          <h3>Supplies:</h3>
          {supplies.map((supply, index) => (
            <div key={index}>
              <label>
                {supply.supply.name}:
                <input
                  type="number"
                  value={supply.quantityRequired}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button onClick={handleUpdate}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default ProductsModal;
