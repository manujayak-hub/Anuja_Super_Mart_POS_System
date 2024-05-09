import React, { useState } from 'react';
import './SProfile.css';

const SupplierProfile = () => {
  const [supplierName, setSupplierName] = useState('');
  const [targetQuantity, setTargetQuantity] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  
  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submitted:', supplierName,targetQuantity, timeDuration);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Deleted:', supplierName);
  };

  return (
    <div>
      <h2>Supplier Profile</h2>
      <div>
        <label>Supplier Name:</label>
        <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
      </div>
      <div>
        <label>Target Quantity:</label>
        <input type="number" value={targetQuantity} onChange={(e) => setTargetQuantity(e.target.value)} />
      </div>
      <div>
        <label>Time Duration:</label>
        <input type="text" value={timeDuration} onChange={(e) => setTimeDuration(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default SupplierProfile;
