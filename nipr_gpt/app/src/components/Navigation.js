import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('supplies');

  return (
    <nav class="nav-bar">
      <Link to="/" onClick={() => setActiveTab('supplies')} className={activeTab === 'supplies' ? 'active' : ''}>
        Supplies
      </Link>
      <Link to="/products" onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>
        Products
      </Link>
    </nav>
  );
};

export default Navigation;
