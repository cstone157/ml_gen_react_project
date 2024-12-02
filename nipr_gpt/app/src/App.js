import React from 'react';
import SuppliesTable from './supplies/SuppliesTable';
import ProductsTable from './products/ProductsTable';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = React.useState('supplies');

  return (
    <div className="App">
      <div className="tab-bar">
        <button
          className={activeTab === 'supplies' ? 'active' : ''}
          onClick={() => setActiveTab('supplies')}
        >
          Supplies
        </button>
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </div>
      {activeTab === 'supplies' ? <SuppliesTable /> : <ProductsTable />}
    </div>
  );
}

export default App;
