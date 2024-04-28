import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';

const AddEmployeeForm = ({ handleClose }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    empID: Yup.string()
      .required('Employee ID is required')
      .matches(/^EMP.*$/, 'Employee ID must start with EMP'),
    empName: Yup.string().required('Employee Name is required'),
    empRole: Yup.string().required('Role is required'),
    empAddress: Yup.string().required('Address is required'),
    empContactNum: Yup.string()
      .required('Contact Number is required')
      .matches(/^\d{10}$/, 'Contact Number must be 10 digits'),
    empJoinedDate: Yup.date().max(new Date(), 'Joined Date cannot be a future date').required('Joined Date is required'),
    empBasicSalary: Yup.number().required('Basic Salary is required'),
    empRemainingLeaves: Yup.number()
      .required('Monthly Leaves is required')
      .min(0, 'Monthly Leaves must be at least 0')
      .max(10, 'Monthly Leaves cannot exceed 10'),
  });

  // Initial form values
  const initialValues = {
    empID: '',
    empName: '',
    empRole: '',
    empAddress: '',
    empContactNum: '',
    empJoinedDate: '',
    empRemainingLeaves: '',
    empBasicSalary: ''
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      await axios.post('/emp', values);
      handleClose(); // Close the modal after successful submission
      resetForm();
    } catch (error) {
      console.error('Error adding employee:', error);
      if (error.response && error.response.status === 409) {
        // Employee ID already exists
        setErrors({ empID: 'Employee ID already exists' });
      } else {
        // Other error
        // Handle error
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="empID" className="form-label">Employee ID</label>
            <Field type="text" className="form-control" id="empID" name="empID" />
            <ErrorMessage name="empID" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empName" className="form-label">Employee Name</label>
            <Field type="text" className="form-control" id="empName" name="empName" />
            <ErrorMessage name="empName" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empRole" className="form-label">Role</label>
            <Field type="text" className="form-control" id="empRole" name="empRole" />
            <ErrorMessage name="empRole" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empAddress" className="form-label">Address</label>
            <Field type="text" className="form-control" id="empAddress" name="empAddress" />
            <ErrorMessage name="empAddress" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empContactNum" className="form-label">Contact Number</label>
            <Field type="text" className="form-control" id="empContactNum" name="empContactNum" />
            <ErrorMessage name="empContactNum" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empJoinedDate" className="form-label">Joined Date</label>
            <Field type="date" className="form-control" id="empJoinedDate" name="empJoinedDate" />
            <ErrorMessage name="empJoinedDate" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empBasicSalary" className="form-label">Basic Salary</label>
            <Field type="number" className="form-control" id="empBasicSalary" name="empBasicSalary" />
            <ErrorMessage name="empBasicSalary" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="empRemainingLeaves" className="form-label">Monthly Leaves</label>
            <Field type="number" className="form-control" id="empRemainingLeaves" name="empRemainingLeaves" />
            <ErrorMessage name="empRemainingLeaves" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-danger" style={{backgroundColor: '#FD204F'}} disabled={isSubmitting}>Add Employee</button>

        </Form>
      )}
    </Formik>
  );
};

export default AddEmployeeForm;
