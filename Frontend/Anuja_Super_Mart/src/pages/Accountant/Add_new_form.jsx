import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import useTransactionStore from '../../stores/accountantStore';
import Sidebar from '../../components/AccountantComponents/Sidebar';

const TransactionForm = () => {
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(true); 
      } catch (error) {
        console.error('Error creating transaction:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div style={{ display: 'flex', height: '100vh',backgroundColor: 'lightgray' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1 className="text-danger" style={{ textAlign: 'center',marginLeft: '300px'}}>Add Transaction</h1>

        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto', marginLeft: '300px', height: '80vh' }}>
          <div className="card-body" style={{ maxWidth: '1000px', height: '80%' }}>
            <form onSubmit={formik.handleSubmit} style={{ height: '900px' }}>
              <div className="mb-3">
                <label htmlFor="transactionID" className="form-label">Transaction ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="transactionID"
                  {...formik.getFieldProps('transactionID')}
                  value={formik.values.transactionID}  
                  autoComplete="off" 
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
                  autoComplete="off" 
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
                  autoComplete="off" 
                >
                  <option value="">Select Transaction Type</option>
                  <option value="inventory">Inventory</option>
                  <option value="sales">Sales</option>
                  <option value="utility">Utility</option>
                  <option value="salary">Salary</option>
                  <option value="other expenses">Other expenses</option>
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
                  autoComplete="off" 
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
                  autoComplete="off" 
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
                className="btn btn-danger"
                disabled={formik.isSubmitting}
                style={{ marginTop: '10px', width: '100%' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
     
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(0px)'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              width: '500px',
              height: '150px'
            }}
          >
            <h2 style={{ fontSize: '20px' }}>Transaction Added Successfully!</h2>
            <div className="modal-buttons" style={{ marginTop: '10px' }}>
              <button className="btn btn-danger" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionForm;
