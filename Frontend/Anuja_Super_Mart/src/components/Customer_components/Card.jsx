import axios from '../../api/axios'; // Import axios for making HTTP requests
import './Card.scss'; // Import SCSS file for custom styling

const Card = ({ product, addToOrder }) => {
  const { productName, wholesalePrice, retailPrice, quantityInStock } = product;

  const handleAddToCart = async () => {
    try {
      // Make a POST request to your backend API to add the product to the cart
      await axios.post('/Cart', {
        ItemName: productName, // Match the field name in your backend
        TotalAmount: retailPrice, // Assuming retailPrice is the total amount
        Quantity: 1, // Assuming default quantity is 1
        // Add any other relevant data you need to send to the backend
      });
      
      // Call addToOrder function to update the cart locally if needed
      addToOrder(product);
      
      // You can also show a success message or perform any other action upon successful addition to the cart
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="card custom-card" style={{ width: '15rem' }}>
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          <strong>Wholesale Price:</strong> ${wholesalePrice}
        </p>
        <p className="card-text">
          <strong>Retail Price:</strong> ${retailPrice}
        </p>
        <button className="btn btn-primary custom-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
