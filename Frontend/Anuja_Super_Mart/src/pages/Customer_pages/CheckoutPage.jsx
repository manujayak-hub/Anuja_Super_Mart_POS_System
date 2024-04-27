import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios'; // Import Axios for making HTTP requests
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register fonts - You can use any font you prefer
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CheckoutPage({ cartItems }) {
  
  const [pickupSuccess, setPickupSuccess] = useState(false);

  const handlePickup = async () => {
    try {
      // Calculate total price of all items in the cart
      const totalPrice = cartItems.reduce((acc, item) => acc + item.ItemPrice, 0);

      // Map cartItems to match the fields in the Pickup model
      const pickupData = {
        Pickupid: '', // Assign a unique pickup ID if needed
        userid: '', // Assign a user ID if needed
        items: cartItems.map(item => ({
          itemName: item.ItemName,
          quantity: item.Quantity,
          itemPrice: item.ItemPrice,
          // Add other fields as needed
        })),
        TotalPrice: totalPrice
      };

      // Make a POST request to the /pickup endpoint with pickupData
      await axios.post('/pickup', pickupData);
      
      // Show success message
      setPickupSuccess(true);
      
      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Error sending cart items to pickup:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };
  
  const clearCart = async () => {
    try {
      await axios.delete('/cart'); // Assuming you have an endpoint to clear the cart
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };

  const generatePDF = () => {
    const currentDate = new Date().toLocaleString(); // Get current date and time
    const shopName = "Anuja Super Mart";
    // Assume you have a logo image file named 'shop_logo.png' in the same directory

    const total = cartItems.reduce((acc, item) => acc + item.ItemPrice, 0);

    const docDefinition = {
      content: [
          {
              text: 'Receipt',
              style: 'header',
              alignment: 'center',
              margin: [0, 0, 0, 20] // Add margin to separate from border
          },
          {
              text: shopName,
              style: 'shopNameLabel',
              alignment: 'center',
              margin: [0, 0, 0, 10] // Add margin below shop name
          },
          {
              columns: [
                  {
                      text: `Date: ${currentDate}`,
                      alignment: 'left',
                      margin: [40, 0] // Adjust margin for date
                  },
                  {
                      text: `Time: ${currentDate.split(',')[1]}`, // Extract time from current date
                      alignment: 'right',
                      margin: [0, 0, 40, 0] // Adjust margin for time
                  }
              ]
          },
          {
              canvas: [{ type: 'line', x1: 0, y1: 10, x2: 600, y2: 10, lineWidth: 1 }] // Add line separator
          },
          {
              style: 'table',
              table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 'auto'],
                  body: [
                      [
                          { text: 'Item Name', style: 'tableHeader' },
                          { text: 'Quantity', style: 'tableHeader' },
                          { text: 'Price (Rs.)', style: 'tableHeader' }
                      ],
                      ...cartItems.map((item, index) => [
                          { text: item.ItemName, style: index % 2 === 0 ? 'evenRow' : 'oddRow' },
                          { text: item.Quantity, style: index % 2 === 0 ? 'evenRow' : 'oddRow' },
                          { text: `Rs. ${item.Quantity * item.ItemPrice}`, style: index % 2 === 0 ? 'evenRow' : 'oddRow', alignment: 'right' }
                      ])
                  ]
              }
          },
          {
              text: `Total: Rs. ${total.toFixed(2)}`,
              style: 'total',
              alignment: 'right',
              margin: [0, 20, 0, 0] // Margin for space below the table
          }
      ],
      styles: {
          header: {
              fontSize: 24,
              bold: true,
              margin: [0, 0, 0, 20],
              color: '#333'
          },
          shopNameLabel: {
              fontSize: 18,
              bold: true,
              color: 'green'
          },
          table: {
              margin: [0, 10, 0, 10]
          },
          tableHeader: {
              bold: true,
              fontSize: 12,
              color: '#ffffff',
              fillColor: '#333333'
          },
          evenRow: {
              fillColor: '#e0ffe0', // Light green
              fontSize: 10,
              color: '#333333'
          },
          oddRow: {
              fillColor: '#ffffff', // White
              fontSize: 10,
              color: '#333333'
          },
          total: {
              fontSize: 16,
              bold: true,
              margin: [0, 20, 0, 0],
              color: '#333'
          }
      },
      pageSize: 'A4', // Set page size to A4
      pageMargins: [40, 60] // Set page margins
  };
  
    pdfMake.createPdf(docDefinition).download('checkout_items.pdf');
  };


  
  
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#dee2e6' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
                      </div>
                      <hr className="my-4" />

                      {cartItems.map((item, index) => (
                        <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-muted">{item.Category}</h6>
                            <h6 className="text-black mb-0">{item.ItemName}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <h6 className="text-black mb-0">{item.Quantity}</h6>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">Rs. {item.ItemPrice}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" className="text-muted" onClick={() => removeFromCart(index, item._id)}>
                              <i className="fas fa-times"></i>
                            </a>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />
                      <div className="pt-5">
                        {/* Use Link from react-router-dom for the button */}
                        <Link to="/" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {cartItems.length}</h5>
                        {/* Calculate total price */}
                        <h5>Rs. {cartItems.reduce((acc, item) => acc +  item.ItemPrice, 0)}</h5>
                      </div>
                      <h5 className="text-uppercase mb-3">Give code</h5>

                      <div className="mb-5">
                        <div className="form-outline">
                          <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        {/* Calculate total price */}
                        <h5>Rs. {cartItems.reduce((acc, item) => acc + item.ItemPrice, 0)}</h5>
                      </div>

                      <button type="button" className="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark" onClick={handlePickup}>
                        Add to Pick Up
                      </button>

                      {/* "Download PDF" button */}
                      <button type="button" className="btn btn-danger btn-block btn-lg" data-mdb-ripple-color="dark" onClick={generatePDF}>
                        Download PDF
                      </button>
                      {pickupSuccess && <p className="text-success mt-3">Items added to pickup successfully!</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
