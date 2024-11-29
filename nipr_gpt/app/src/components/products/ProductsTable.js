import React from 'react';
import axios from 'axios';

const ProductsTable = ({ products, handleEditProduct, handleDeleteProduct }) => {
  const [productList, setProductList] = React.useState(products);

  React.useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sell Cost</th>
          <th>Time to Build</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.sellCost}</td>
            <td>{product.timeToBuild}</td>
            <td>
              <button onClick={() => handleEditProduct(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
