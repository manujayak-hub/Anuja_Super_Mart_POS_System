import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import CheckoutPage from '../Customer_pages/CheckoutPage';
import './NavBar.scss'; // Import SCSS file

function NavBar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutClicked, setCheckoutClicked] = useState(false); // State to track checkout click
  const [totalValue, setTotalValue] = useState(0);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const removeFromCart = async (index, id) => {
    try {
      const response = await axios.delete(`/cart/${id}`);
      if (response.status === 200) {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    const newCartItems = [...cartItems];
    const item = newCartItems[index];
    const pricePerUnit = item.ItemPrice / item.Quantity; // Calculate the price per unit
    item.Quantity = newQuantity;
    item.ItemPrice = pricePerUnit * newQuantity; // Calculate the total price based on the new quantity
    newCartItems[index] = item;
    setCartItems(newCartItems);
  };
  


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart');
        const cartItemsData = response.data;
        setCartItems(cartItemsData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate total amount of all items in the cart
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.ItemPrice || (item.ItemPrice * item.Quantity));
    }, 0);

    // Update the state with the calculated total
    setTotalValue(total);
  }, [cartItems]);

  const handleCheckout = () => {
    // Set checkoutClicked to true to render CheckoutPage
    setCheckoutClicked(true);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#198754' }}>
        <div className="container"> 
          <Link className="navbar-brand" to="/">Anuja Super Mart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/categories">Categories</Link>
              </li>
            </ul>
            <div className="navbar-right">
            <button
  className="btn btn-white"
  type="button"
  onClick={toggleCart}
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasCart"
  aria-controls="offcanvasCart"
>
<img src="/src/assets/Customer/cart.png" alt="" style={{ width: '20px', height: '20px' }} />
  <span className="badge bg-danger">{cartItems.length}</span>
</button>

          </div>
            <div className="navbar-right dropdown">
              {/* Profile Dropdown */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                  className="rounded-circle"
                  height="22"
                  alt="Portrait of a Woman"
                  loading="lazy"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/profile">My Profile</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">Logout</Link>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </nav>

      <div
        className={`offcanvas offcanvas-end`}
        id="offcanvasCart"
        aria-labelledby="offcanvasCartLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasCartLabel">Shopping Cart</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleCart}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li className="list-group-item" key={index}>
                <div>
                  <p><strong>Item Name:</strong> {item.ItemName}</p>
                  <p><strong>Quantity:</strong>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateQuantity(index, item.Quantity + 1)}
                    >
                      +
                    </button>
                    {item.Quantity}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (item.Quantity > 1) {
                          updateQuantity(index, item.Quantity - 1)
                        }
                      }}
                    >
                      -
                    </button>
                  </p>
                  <p><strong>Price:</strong> Rs.{item.ItemPrice || (item.ItemPrice * item.Quantity)}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index, item._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Display Total Amount */}
        <div className="offcanvas-footer">
          <p><strong>Total:</strong> {typeof totalValue === 'number' ? `Rs.${totalValue.toFixed(2)}` : 'Rs.0.00'}</p>
          <button
            className="btn btn-success"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
      {/* Conditional rendering of CheckoutPage */}
      {checkoutClicked && <CheckoutPage cartItems={cartItems} />}
    </header>
  );
}

export default NavBar;
