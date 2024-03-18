import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

function NavBar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/Cart'); // Assuming this endpoint fetches all cart items
        const cartItemsData = response.data;
        setCartItems(cartItemsData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Your Shop Name</span>

          <div className="navbar-right">
            <button className="navbar-toggler" type="button" onClick={toggleCart}>
              Cart ({cartItems.length})
              
            </button>
            <div className={`collapse navbar-collapse ${cartOpen ? 'show' : ''}`}>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <button className="nav-link" onClick={toggleCart}>
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={toggleCart}>
                    Cart ({cartItems.length})
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {cartOpen && (
          <div className="cart">
            <div className="container">
              <h3>Shopping Cart</h3>
              <ul className="list-group">
                {cartItems.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <div>
                      <p><strong>Item Name:</strong> {item.ItemName}</p>
                      <p><strong>Quantity:</strong> {item.Quantity}</p>
                      <p><strong>Total Amount:</strong> ${item.TotalAmount}</p>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
