import React, { useState } from 'react';
import axios from '../../api/axios'; // Import axios for making HTTP requests
import './Card.scss'; // Import SCSS file for custom styling

const Card = ({ product, addToOrder }) => {
  const { imageUrl, productName, retailPrice } = product;
  
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      // Make a POST request to your backend API to add the product to the cart
      await axios.post('/Cart', {
        ItemName: productName, // Match the field name in your backend
        ItemPrice: parseFloat(retailPrice), // Assuming retailPrice is the price per unit
        Quantity: 1, // Assuming default quantity is 1
        // Add any other relevant data you need to send to the backend
      });

      // Call addToOrder function to update the cart locally if needed
      addToOrder(product);

      // Update state to indicate the product has been added to the cart
      setAddedToCart(true);

      // You can also show a success message or perform any other action upon successful addition to the cart
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className={`card custom-card ${addedToCart ? 'pulse-animation' : ''}`} style={{ width: '15rem' }}>
      <img src={imageUrl} className="card-img-top" alt="Product" />
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          <strong>Retail Price:</strong> Rs.{retailPrice}
        </p>
        <button
          className={`btn btn-primary custom-btn ${addedToCart ? 'added-to-cart' : ''}`}
          style={{ backgroundColor: addedToCart ? '#198751' : '#198754' }}
          onClick={handleAddToCart}
          disabled={addedToCart} // Disable button after adding to cart
        >
          {addedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Card;
