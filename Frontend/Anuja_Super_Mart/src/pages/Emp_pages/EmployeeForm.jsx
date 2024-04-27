import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';

const EmployeeForm = ({ employee, handleClose }) => {
  const initialValues = {
    empName: employee.empName || '',
    empRole: employee.empRole || '',
    empAddress: employee.empAddress || '',
    empContactNum: employee.empContactNum || '',
    empJoinedDate: employee.empJoinedDate || '',
    empBasicSalary: employee.empBasicSalary || '',
  };

  const validationSchema = Yup.object().shape({
    empName: Yup.string().required('Name is required'),
    empRole: Yup.string().required('Role is required'),
    empAddress: Yup.string().required('Address is required'),
    empContactNum: Yup.string().matches(/^\d{10}$/, 'Contact number must be a 10-digit number').required('Contact number is required'),
    empJoinedDate: Yup.date().max(new Date(), 'Joined Date cannot be a future date').required('Joined Date is required'),
    empBasicSalary: Yup.number().positive('Basic salary must be a positive number').required('Basic Salary is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.patch(`/emp/${employee._id}`, values);
      if (response.status === 200) {
        // Handle success
        handleClose();
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
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
            <label htmlFor="empName" className="form-label">Name</label>
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
          <button type="submit" className="btn btn-danger" style={{ backgroundColor: '#FD204F', borderColor: '#FD204F' }} disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
