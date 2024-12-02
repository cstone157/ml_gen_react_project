import React, { useState, useEffect } from 'react';
import Modal from './ProductsModal';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProductUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${updatedProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      const updatedProducts = products.map((product) => (product.id === data.id ? data : product));
      setProducts(updatedProducts);
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
            <th>Name</th>
            <th>In Stock</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(product)}
              style={{
                cursor: 'pointer',
              }}
            >
              <td>{product.name}</td>
              <td>{product.inStock}</td>
              <td>${product.salePrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          onClose={handleModalClose}
          product={selectedProduct}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
}

export default ProductsTable;
