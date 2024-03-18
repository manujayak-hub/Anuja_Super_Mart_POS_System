import React, { useState } from 'react';

const EmployeeDetails = ({ employee, onUpdate }) => {
  const [editedDetails, setEditedDetails] = useState({ ...employee });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(editedDetails);
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={employee.empID} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="empName" value={editedDetails.empName} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input type="text" className="form-control" name="empRole" value={editedDetails.empRole} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="empAddress" value={editedDetails.empAddress} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="text" className="form-control" name="empContactNum" value={editedDetails.empContactNum} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Joined Date</label>
          <input type="text" className="form-control" name="empJoinedDate" value={editedDetails.empJoinedDate} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Basic Salary</label>
          <input type="text" className="form-control" name="empBasicSalary" value={editedDetails.empBasicSalary} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Remaining Leaves</label>
          <input type="text" className="form-control" name="empRemainingLeaves" value={editedDetails.empRemainingLeaves} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Final Salary</label>
          <input type="text" className="form-control" name="empFinalSalary" value={editedDetails.empFinalSalary} onChange={handleInputChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EmployeeDetails;