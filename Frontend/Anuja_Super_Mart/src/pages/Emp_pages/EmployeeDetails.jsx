import React, { useState, useEffect } from 'react';

const EmployeeDetails = ({ employee, handleRemove }) => {
  const [editedDetails, setEditedDetails] = useState({ ...employee });

  useEffect(() => {
    setEditedDetails({ ...employee });
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleRemoveEmployee = () => {
    handleRemove(employee._id);
  };

  

  return  (
    <div>
     
      <form>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" className="form-control" value={editedDetails.empID} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="empName" value={editedDetails.empName} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input type="text" className="form-control" name="empRole" value={editedDetails.empRole} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="empAddress" value={editedDetails.empAddress} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input type="text" className="form-control" name="empContactNum" value={editedDetails.empContactNum} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Joined Date</label>
          <input type="string" className="form-control" name="empJoinedDate" value={editedDetails.empJoinedDate} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Basic Salary</label>
          <input type="text" className="form-control" name="empBasicSalary" value={editedDetails.empBasicSalary} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Remaining Leaves</label>
          <input type="text" className="form-control" name="empRemainingLeaves" value={editedDetails.empRemainingLeaves} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Final Salary</label>
          <input type="text" className="form-control" name="empFinalSalary" value={editedDetails.empFinalSalary} onChange={handleInputChange} />
        </div>
        <button type="button" className="btn btn-danger ms-2" style={{ backgroundColor: '#FD204F', borderColor: '#FD204F' }} onClick={handleRemoveEmployee}>Remove Employee</button>

        
      </form>
    </div>
  );
};

export default EmployeeDetails;