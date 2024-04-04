import React, { useState } from 'react';
import axios from '../../api/axios';

const EmployeeForm = ({ employee, handleClose }) => {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/emp/${employee._id}`, formData);
      if (response.status === 200) {
        // Handle success
        handleClose();
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="empName" className="form-label">Name</label>
        <input type="text" className="form-control" id="empName" name="empName" value={formData.empName} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="empRole" className="form-label">Role</label>
        <input type="text" className="form-control" id="empRole" name="empRole" value={formData.empRole} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="empAddress" className="form-label">Address</label>
        <input type="text" className="form-control" id="empAddress" name="empAddress" value={formData.empAddress} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="empContactNum" className="form-label">Contact Number</label>
        <input type="text" className="form-control" id="empContactNum" name="empContactNum" value={formData.empContactNum} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="empJoinedDate" className="form-label">Joined Date</label>
        <input type="date" className="form-control" id="empJoinedDate" name="empJoinedDate" value={formData.empJoinedDate} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="empBasicSalary" className="form-label">Basic Salary</label>
        <input type="number" className="form-control" id="empBasicSalary" name="empBasicSalary" value={formData.empBasicSalary} onChange={handleChange} />
      </div>
      
      
      <button type="submit" className="btn btn-danger" style={{ backgroundColor: '#FD204F', borderColor: '#FD204F' }}>Submit</button>

    </form>
  );
};

export default EmployeeForm;
