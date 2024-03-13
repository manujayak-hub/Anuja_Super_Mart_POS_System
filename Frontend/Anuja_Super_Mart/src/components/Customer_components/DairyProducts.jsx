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

const DairyProducts = () => {
    // Sample list of dairy products
    const dairyProducts = [
        {
            id: 1,
            name: "Milk (1 Gallon)",
            image: "https://example.com/milk.jpg",
            price: "$2.99",
            description: "Fresh and nutritious whole milk for your daily needs."
        },
        {
            id: 2,
            name: "Eggs (Dozen)",
            image: "https://example.com/eggs.jpg",
            price: "$1.99",
            description: "Farm-fresh eggs for baking or cooking."
        },
        {
            id: 3,
            name: "Butter (1 lb)",
            image: "https://example.com/butter.jpg",
            price: "$3.49",
            description: "Creamy and delicious butter for cooking and baking."
        },
        {
            id: 4,
            name: "Yogurt (32 oz)",
            image: "https://example.com/yogurt.jpg",
            price: "$4.99",
            description: "Smooth and creamy yogurt in various flavors."
        },
        {
            id: 5,
            name: "Cheese (8 oz)",
            image: "https://example.com/cheese.jpg",
            price: "$2.99",
            description: "Assorted cheese varieties for snacks or recipes."
        },
        {
            id: 6,
            name: "Sour Cream (16 oz)",
            image: "https://example.com/sour-cream.jpg",
            price: "$1.49",
            description: "Rich and tangy sour cream for dips or recipes."
        },
        {
            id: 7,
            name: "Heavy Cream (1 Pint)",
            image: "https://example.com/heavy-cream.jpg",
            price: "$2.79",
            description: "Creamy and thick heavy cream for cooking or baking."
        },
        {
            id: 8,
            name: "Cottage Cheese (24 oz)",
            image: "https://example.com/cottage-cheese.jpg",
            price: "$3.99",
            description: "Smooth and creamy cottage cheese for snacks or salads."
        },
        {
            id: 9,
            name: "Whipped Cream (8 oz)",
            image: "https://example.com/whipped-cream.jpg",
            price: "$1.99",
            description: "Light and fluffy whipped cream for desserts or beverages."
        },
        {
            id: 10,
            name: "Almond Milk (32 oz)",
            image: "https://example.com/almond-milk.jpg",
            price: "$3.29",
            description: "Dairy-free almond milk for those with lactose intolerance."
        }
    ];

    return (
        <div>
            <center>
            <h1>Dairy Products</h1>
            </center>
            <div className="products">
                {dairyProducts.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default DairyProducts;
