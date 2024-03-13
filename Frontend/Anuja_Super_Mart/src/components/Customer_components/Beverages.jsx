import React from 'react';
import './all.css';

const Card = ({ beverage }) => {
    const addToCart = () => {
        // Add your logic here for adding to cart
        console.log(`Added ${beverage.name} to cart`);
    };

    return (
        <div className="card">
            <img className="card-image" src={beverage.image} alt={beverage.name} />
            <div className="card-details">
                <h2>{beverage.name}</h2>
                <p><strong>Price:</strong> {beverage.price}</p>
                <p>{beverage.description}</p>
                <button className="add-to-cart-btn" onClick={addToCart}>
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

const Beverages = () => {
    // Sample list of beverage products
    const beverages = [
        {
            id: 1,
            name: "Coffee",
            image: "https://example.com/coffee.jpg",
            price: "$2.99",
            description: "Delicious coffee to start your day."
        },
        {
            id: 2,
            name: "Tea",
            image: "https://example.com/tea.jpg",
            price: "$1.99",
            description: "A soothing cup of tea for relaxation."
        },
        {
            id: 3,
            name: "Juice",
            image: "https://example.com/juice.jpg",
            price: "$3.49",
            description: "Freshly squeezed juice for a healthy boost."
        },
        {
            id: 4,
            name: "Soda",
            image: "https://example.com/soda.jpg",
            price: "$1.49",
            description: "Refreshing soda for a fizzy treat."
        },
        {
            id: 5,
            name: "Smoothie",
            image: "https://example.com/smoothie.jpg",
            price: "$4.99",
            description: "Nutritious smoothie packed with fruits."
        },
        {
            id: 6,
            name: "Water",
            image: "https://example.com/water.jpg",
            price: "$0.99",
            description: "Pure and refreshing water for hydration."
        },
        {
            id: 7,
            name: "Milkshake",
            image: "https://example.com/milkshake.jpg",
            price: "$3.99",
            description: "Indulgent milkshake for a sweet craving."
        },
        {
            id: 8,
            name: "Mocktail",
            image: "https://example.com/mocktail.jpg",
            price: "$5.99",
            description: "Non-alcoholic mocktail for a special occasion."
        }
    ];

    return (
        <div>
            <center>
            <h1>Beverage Products</h1>
            </center>
            <div className="products">
                {beverages.map(beverage => (
                    <Card key={beverage.id} beverage={beverage} />
                ))}
            </div>
        </div>
    );
};

export default Beverages;
