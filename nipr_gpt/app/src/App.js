import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SuppliesTable from './components/supplies/SuppliesTable';
import ProductsTable from './components/products/ProductsTable';
import axios from 'axios';
import './App.css';

const App = () => {
  const [supplies, setSupplies] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/supplies');
        setSupplies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSupplies();

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Router>
      <Header />
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/supplies" element={<SuppliesTable supplies={supplies} />} />
          <Route path="/products" element={<ProductsTable products={products} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

