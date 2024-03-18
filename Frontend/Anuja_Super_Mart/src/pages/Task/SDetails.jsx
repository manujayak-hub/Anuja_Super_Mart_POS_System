import React, { useState } from 'react';
import './Table.css';

const TableView = () => {
  // Sample data
  const [tasks, setTasks] = useState([
    
    {
        
      },
      {
        
      },
      {
        
      },
      {
        
      },
      {
        
      },
      {
        
      },
      {
        
      },
    // Add more tasks as needed
  ]);

  const handleAddButtonClick = () => {
    // Add new task logic here
    console.log('Add button clicked');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Start Date</th>
            <th>Expire Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.supplierName}</td>
              <td>{task.productName}</td>
              <td>{task.quantity}</td>
              <td>{task.startDate}</td>
              <td>{task.expireDate}</td>
              <td>
                <button onClick={handleAddButtonClick}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
