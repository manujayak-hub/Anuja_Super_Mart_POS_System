import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios'; // Import Axios for making HTTP requests

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

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
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
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.image} // Use your actual image URL here
                              className="img-fluid rounded-3" alt={item.ItemName}
                            />
                          </div>
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
                        <Link to="/shop" className="text-body">
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
                        <h5>Rs. {cartItems.reduce((acc, item) => acc + item.ItemPrice, 0)}</h5>
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
