import React, { useState, useEffect } from 'react';

function SupplySelector({ supplies, value, onChange }) {
  const [selectedSupply, setSelectedSupply] = useState(value);

  useEffect(() => {
    setSelectedSupply(value);
  }, [value]);

  const handleSelect = (event) => {
    setSelectedSupply(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selectedSupply} onChange={handleSelect}>
      <option value="">Select a supply</option>
      {supplies.map((supply) => (
        <option key={supply.id} value={supply.id}>
          {supply.name}
        </option>
      ))}
    </select>
  );
}

export default SupplySelector;