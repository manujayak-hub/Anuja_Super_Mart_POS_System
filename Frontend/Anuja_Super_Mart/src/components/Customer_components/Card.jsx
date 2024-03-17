// Card.js

import React from 'react';

const Card = ({ product, addToOrder }) => {
  const { productName, wholesalePrice } = product;


  return (
    <div className="card">

      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">
          <strong>Wholesale Price:</strong> ${product.wholesalePrice}
        </p>
        <p className="card-text">
          <strong>Retail Price:</strong> ${product.retailPrice}
        </p>
        <p className="card-text">
          <strong>Quantity in Stock:</strong> {product.quantityInStock}
        </p>
        <button className="btn btn-primary" onClick={() => addToOrder(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
