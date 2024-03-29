

import React, { useState } from "react";

const ProductUpdateForm = () => {
  const [formData, setFormData] = useState({
    productId: "",
    // Add more fields as needed for product update
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, like updating the product details
    // You can use APIs or any state management library for this purpose
    // For now, let's just log the form data
    console.log(formData);
  };

  return (
    <div className="ProductUpdateForm">
      <h2>Update Product Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more input fields for other product details */}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
