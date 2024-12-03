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
    <div className='modal'>
      <div className='content'>
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
