import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import useTransactionStore from '../../stores/accountantStore';
import Sidebar from '../../components/AccountantComponents/Sidebar';

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
    <div>
      <Sidebar />
      <div
        style={{
          width: 'calc(100vw - 240px)',
          margin: '20px auto',
          backgroundColor: 'white',
          
        }}
        className="transaction-list-container"
      >
        <h1 className="text-danger">Add Transaction</h1>
        <div style={{ borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} className="card">
          <div style={{ padding: '100px' , width: 'calc(70vw - 240px)'}} className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label style={{ fontWeight: 'bold', color: 'black' }} htmlFor="transactionID" className="form-label">Transaction ID</label>
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
                <label style={{ fontWeight: 'bold', color: 'black' }} htmlFor="transactionDateTime" className="form-label">Transaction Date and Time</label>
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
                <label style={{ fontWeight: 'bold', color: 'black' }} htmlFor="transactionType" className="form-label">Transaction Type</label>
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
                <label style={{ fontWeight: 'bold', color: 'black' }} htmlFor="transactionAmount" className="form-label">Transaction Amount</label>
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
                <label style={{ fontWeight: 'bold', color: 'black' }} htmlFor="transactionMethod" className="form-label">Transaction Method</label>
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
                style={{ marginTop: '10px', width: '100%', backgroundColor: 'red', borderColor: 'red' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
