import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import useTransactionStore from '../../stores/accountantStore';

const TransactionForm = () => {
  const formik = useFormik({
    initialValues: {
      transactionID: '',          
      transactionDateTime: '',   
      transactionType: '',       
      transactionAmount: '',     
      transactionMethod: '',     
    },
    validationSchema: Yup.object({
      transactionID: Yup.string().required('Transaction ID is required'),
      transactionDateTime: Yup.date().required('Transaction date and time is required'),
      transactionType: Yup.string().required('Transaction type is required'),
      transactionAmount: Yup.number().required('Transaction amount is required').positive('Transaction amount must be positive'),
      transactionMethod: Yup.string().required('Transaction method is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post('/transactions', values);
        useTransactionStore.getState().addTransaction(response.data);
        resetForm();
        window.alert('Transaction submitted successfully!');
      } catch (error) {
        console.error('Error creating transaction:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container">
      <h2>Transaction Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="transactionID" className="form-label">Transaction ID</label>
          <input
            type="text"
            className="form-control"
            id="transactionID"
            {...formik.getFieldProps('transactionID')}
            value={formik.values.transactionID}  
          />
          {formik.touched.transactionID && formik.errors.transactionID ? (
            <div className="text-danger">{formik.errors.transactionID}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="transactionDateTime" className="form-label">Transaction Date and Time</label>
          <input
            type="date"
            className="form-control"
            id="transactionDateTime"
            {...formik.getFieldProps('transactionDateTime')}
            value={formik.values.transactionDateTime}  
          />
          {formik.touched.transactionDateTime && formik.errors.transactionDateTime ? (
            <div className="text-danger">{formik.errors.transactionDateTime}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="transactionType" className="form-label">Transaction Type</label>
          <select
            className="form-select"
            id="transactionType"
            {...formik.getFieldProps('transactionType')}
            value={formik.values.transactionType}  
          >
            <option value="">Select Transaction Type</option>
            <option value="inventory">Inventory</option>
            <option value="sales">Sales</option>
            <option value="utility">Utility</option>
            <option value="salary">Salary</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.transactionType && formik.errors.transactionType ? (
            <div className="text-danger">{formik.errors.transactionType}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="transactionAmount" className="form-label">Transaction Amount</label>
          <input
            type="number"
            className="form-control"
            id="transactionAmount"
            {...formik.getFieldProps('transactionAmount')}
            value={formik.values.transactionAmount}  
          />
          {formik.touched.transactionAmount && formik.errors.transactionAmount ? (
            <div className="text-danger">{formik.errors.transactionAmount}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="transactionMethod" className="form-label">Transaction Method</label>
          <select
            className="form-select"
            id="transactionMethod"
            {...formik.getFieldProps('transactionMethod')}
            value={formik.values.transactionMethod}  
          >
            <option value="">Select Transaction Method</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
          {formik.touched.transactionMethod && formik.errors.transactionMethod ? (
            <div className="text-danger">{formik.errors.transactionMethod}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
}

export default TransactionForm;
