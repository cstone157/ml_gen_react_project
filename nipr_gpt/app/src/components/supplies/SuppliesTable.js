import React from 'react';
import SupplyForm from './SupplyForm'

const SuppliesTable = ({ supplies, handleEditSupply, handleDeleteSupply }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost per supply</th>
          <th>Current number in stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {supplies.map((supply) => (
          <tr key={supply._id}>
            <td>{supply.name}</td>
            <td>{supply.costPerSupply}</td>
            <td>{supply.currentNumberInStock}</td>
            <td>
              <button onClick={() => handleEditSupply(supply)}>Edit</button>
              <button onClick={() => handleDeleteSupply(supply._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <th>
          <button onClick={() => setIsOpen(true)}>Create Supply</button>
          {isOpen && (
            <SupplyForm
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              supplies={supplies}
              handleSubmit={handleFormSubmit}
            />
          )}
        </th>
        <th colSpan={3}></th>
      </tfoot>
    </table>
  );
};

export default SuppliesTable;
