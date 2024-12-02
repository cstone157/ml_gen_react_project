import React, { useState, useEffect } from 'react';
import ProductsModal from './ProductsModal';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPageNumber(0);
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
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
      <div
        style={{
          width: '90%',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>In Stock</th>
              <th>Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice(pageNumber * rowsPerPage, (pageNumber + 1) * rowsPerPage)
              .map((product, index) => (
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <div>
            <label>
              Rows per page:
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Page: {pageNumber + 1} of {Math.ceil(products.length / rowsPerPage)}
            </label>
            <button onClick={() => handleChangePage(null, 0)}>First</button>
            <button onClick={() => handleChangePage(null, pageNumber - 1)}>Prev</button>
            <button onClick={() => handleChangePage(null, pageNumber + 1)}>Next</button>
            <button onClick={() => handleChangePage(null, Math.ceil(products.length / rowsPerPage) - 1)}>Last</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductsModal
          onClose={handleModalClose}
          product={selectedProduct}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
}

export default ProductsTable;
