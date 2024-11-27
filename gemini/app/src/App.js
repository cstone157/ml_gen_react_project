import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/supplies'); // API URL
        setSupplies(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App"> {/* Added className */}
      <header className="header"> {/* Added className */}
        <h1>Custom Manufacturing App</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost Per Item</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply) => (
            <tr key={supply._id}>
              <td>{supply.name}</td>
              <td>{supply.costPerItem}</td>
              <td>{supply.inStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;