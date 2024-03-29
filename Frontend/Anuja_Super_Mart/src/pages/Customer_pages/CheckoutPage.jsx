import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutPage({ cartItems }) {
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
                            <button className="btn btn-link px-2" onClick={() => updateQuantity(index, item.Quantity - 1)}>
                              <i className="fas fa-minus"></i>
                            </button>

                            <input
                              id={`quantity-${index}`}
                              min="0"
                              name="quantity"
                              value={item.Quantity}
                              type="number"
                              className="form-control form-control-sm"
                              onChange={(e) => updateQuantity(index, e.target.value)}
                            />

                            <button className="btn btn-link px-2" onClick={() => updateQuantity(index, item.Quantity + 1)}>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">€ {item.TotalAmount}</h6>
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
                        <h5>€ {cartItems.reduce((acc, item) => acc + item.TotalAmount, 0)}</h5>
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
                        <h5>€ {cartItems.reduce((acc, item) => acc + item.TotalAmount, 0)}</h5>
                      </div>

                      <button type="button" className="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark">Add to Pick Up</button>

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
