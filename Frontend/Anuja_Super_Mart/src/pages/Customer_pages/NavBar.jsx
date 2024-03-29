import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import CheckoutPage from '../Customer_pages/CheckoutPage';

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
    newCartItems[index].Quantity = newQuantity;
    newCartItems[index].TotalAmount = newQuantity * newCartItems[index].Price;
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
      return acc + (item.TotalAmount || (item.Price * item.Quantity));
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Anuja Super Mart</span>

          <div className="navbar-right">
            <button
              className="btn btn-dark"
              type="button"
              onClick={toggleCart}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasCart"
              aria-controls="offcanvasCart"
            >
              Cart ({cartItems.length})
            </button>
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
                  <p><strong>Price:</strong> ${item.TotalAmount || (item.Price * item.Quantity)}</p>
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
          <p><strong>Total:</strong> {typeof totalValue === 'number' ? `$${totalValue.toFixed(2)}` : '$0.00'}</p>
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
