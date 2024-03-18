import React from 'react';
import './all.css';

const Card = ({ item }) => {
    const addToCart = () => {
        // Add your logic here for adding to cart
        console.log(`Added ${item.name} to cart`);
    };

    return (
        <div className="card">
            <img className="card-image" src={item.image} alt={item.name} />
            <div className="card-details">
                <h2>{item.name}</h2>
                <p><strong>Price:</strong> {item.price}</p>
                <p>{item.description}</p>
                <button className="add-to-cart-btn" onClick={addToCart}>
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

const PersonalCare = () => {
    // Sample list of personal care products
    const personalCareProducts = [
        {
            id: 1,
            name: "Shampoo",
            image: "https://example.com/shampoo.jpg",
            price: "$5.99",
            description: "Moisturizing shampoo for clean and healthy hair."
        },
        {
            id: 2,
            name: "Conditioner",
            image: "https://example.com/conditioner.jpg",
            price: "$5.99",
            description: "Nourishing conditioner for smooth and silky hair."
        },
        {
            id: 3,
            name: "Body Wash",
            image: "https://example.com/body-wash.jpg",
            price: "$3.99",
            description: "Refreshing body wash for a clean and invigorating shower."
        },
        {
            id: 4,
            name: "Hand Soap (Pack of 2)",
            image: "https://example.com/hand-soap.jpg",
            price: "$4.99",
            description: "Gentle hand soap to keep hands clean and moisturized."
        },
        {
            id: 5,
            name: "Deodorant",
            image: "https://example.com/deodorant.jpg",
            price: "$2.99",
            description: "Long-lasting deodorant for all-day freshness."
        },
        {
            id: 6,
            name: "Toothpaste",
            image: "https://example.com/toothpaste.jpg",
            price: "$3.49",
            description: "Cavity-fighting toothpaste for strong and healthy teeth."
        },
        {
            id: 7,
            name: "Body Lotion",
            image: "https://example.com/body-lotion.jpg",
            price: "$6.99",
            description: "Hydrating body lotion for soft and smooth skin."
        },
        {
            id: 8,
            name: "Facial Cleanser",
            image: "https://example.com/facial-cleanser.jpg",
            price: "$8.99",
            description: "Gentle facial cleanser to remove dirt and impurities."
        },
        {
            id: 9,
            name: "Sunscreen",
            image: "https://example.com/sunscreen.jpg",
            price: "$9.99",
            description: "Broad-spectrum sunscreen for protection against harmful UV rays."
        },
        {
            id: 10,
            name: "Shaving Cream",
            image: "https://example.com/shaving-cream.jpg",
            price: "$4.49",
            description: "Smooth and creamy shaving cream for a comfortable shave."
        }
    ];

    return (
        <div>
            <center>
            <h1>Personal Care Products</h1>
            </center>
            <div className="products">
                {personalCareProducts.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default PersonalCare;
