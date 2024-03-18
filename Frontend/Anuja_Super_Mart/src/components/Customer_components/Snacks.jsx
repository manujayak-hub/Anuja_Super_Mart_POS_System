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

const Snacks = () => {
    // Sample list of snacks
    const snacks = [
        {
            id: 1,
            name: "Potato Chips",
            image: "https://example.com/potato-chips.jpg",
            price: "$2.49",
            description: "Classic potato chips for a crunchy snack."
        },
        {
            id: 2,
            name: "Popcorn",
            image: "https://example.com/popcorn.jpg",
            price: "$1.99",
            description: "Buttery and salty popcorn for movie nights."
        },
        {
            id: 3,
            name: "Trail Mix",
            image: "https://example.com/trail-mix.jpg",
            price: "$3.99",
            description: "Healthy trail mix with nuts, dried fruits, and seeds."
        },
        {
            id: 4,
            name: "Granola Bars (Pack of 6)",
            image: "https://example.com/granola-bars.jpg",
            price: "$5.99",
            description: "Variety pack of granola bars for a quick energy boost."
        },
        {
            id: 5,
            name: "Chocolate Cookies",
            image: "https://example.com/chocolate-cookies.jpg",
            price: "$3.49",
            description: "Rich and indulgent chocolate cookies."
        },
        {
            id: 6,
            name: "Mixed Nuts",
            image: "https://example.com/mixed-nuts.jpg",
            price: "$4.99",
            description: "Assorted nuts for a protein-packed snack."
        },
        {
            id: 7,
            name: "Pretzels",
            image: "https://example.com/pretzels.jpg",
            price: "$2.99",
            description: "Crunchy and salty pretzels for snacking."
        },
        {
            id: 8,
            name: "Dried Fruit Mix",
            image: "https://example.com/dried-fruit.jpg",
            price: "$3.79",
            description: "Variety pack of dried fruits for a sweet and tangy snack."
        },
        {
            id: 9,
            name: "Cheese Crackers",
            image: "https://example.com/cheese-crackers.jpg",
            price: "$2.49",
            description: "Cheesy and crispy crackers for snacking or pairing with dips."
        },
        {
            id: 10,
            name: "Gummy Bears",
            image: "https://example.com/gummy-bears.jpg",
            price: "$1.99",
            description: "Chewy and fruity gummy bears for a fun treat."
        }
    ];

    return (
        <div>
            <center>
            <h1>Snacks</h1>
            </center>
            <div className="products">
                {snacks.map(item => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Snacks;
