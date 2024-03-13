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

const CookingEssential = () => {
    // Sample list of cooking essentials
    const cookingEssentials = [
        {
            id: 1,
            name: "Cookware Set",
            image: "https://example.com/cookware-set.jpg",
            price: "$49.99",
            description: "A complete set of non-stick cookware for all your cooking needs."
        },
        {
            id: 2,
            name: "Knife Set",
            image: "https://example.com/knife-set.jpg",
            price: "$29.99",
            description: "High-quality stainless steel knives for precise and effortless cutting."
        },
        {
            id: 3,
            name: "Cutting Board",
            image: "https://example.com/cutting-board.jpg",
            price: "$14.99",
            description: "Durable and eco-friendly bamboo cutting board for meal preparation."
        },
        {
            id: 4,
            name: "Mixing Bowls (Set of 3)",
            image: "https://example.com/mixing-bowls.jpg",
            price: "$19.99",
            description: "Nesting mixing bowls with lids for easy storage and food preparation."
        },
        {
            id: 5,
            name: "Measuring Cups and Spoons Set",
            image: "https://example.com/measuring-cups-spoons.jpg",
            price: "$9.99",
            description: "Accurate and easy-to-read measuring cups and spoons for precise cooking."
        },
        {
            id: 6,
            name: "Cooking Utensil Set",
            image: "https://example.com/cooking-utensils.jpg",
            price: "$24.99",
            description: "Silicone cooking utensils that are heat-resistant and non-stick."
        },
        {
            id: 7,
            name: "Cast Iron Skillet",
            image: "https://example.com/cast-iron-skillet.jpg",
            price: "$39.99",
            description: "Pre-seasoned cast iron skillet for versatile cooking on any stovetop."
        },
        {
            id: 8,
            name: "Baking Sheet Set",
            image: "https://example.com/baking-sheet-set.jpg",
            price: "$17.99",
            description: "Non-stick baking sheets for baking cookies, pastries, and more."
        },
        {
            id: 9,
            name: "Pressure Cooker",
            image: "https://example.com/pressure-cooker.jpg",
            price: "$59.99",
            description: "Multi-function pressure cooker for fast and easy cooking of meals."
        },
        {
            id: 10,
            name: "Spice Rack Organizer",
            image: "https://example.com/spice-rack.jpg",
            price: "$12.99",
            description: "Wall-mounted spice rack for organizing and easy access to spices."
        }
    ];

    return (
        <div>
            <center>
            <h1>Cooking Essentials</h1>
            </center>
            <div className="products">
                {cookingEssentials.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CookingEssential;
