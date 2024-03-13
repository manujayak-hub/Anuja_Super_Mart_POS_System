import React from 'react';
import './all.css';

const Card = ({ product }) => {
    const addToCart = () => {
        // Add your logic here for adding to cart
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <div className="card">
            <img className="card-image" src={product.image} alt={product.name} />
            <div className="card-details">
                <h2>{product.name}</h2>
                <p><strong>Price:</strong> {product.price}</p>
                <p>{product.description}</p>
                <button className="add-to-cart-btn" onClick={addToCart}>
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

const BabyProducts = () => {
    // Sample list of baby products
    const products = [
        {
            id: 1,
            name: "Baby Bottle",
            image: "https://example.com/baby-bottle.jpg",
            price: "$9.99",
            description: "A high-quality baby bottle for feeding infants."
        },
        {
            id: 2,
            name: "Baby Diapers",
            image: "https://example.com/baby-diapers.jpg",
            price: "$19.99",
            description: "Soft and comfortable diapers for babies of all sizes."
        },
        {
            id: 3,
            name: "Baby Stroller",
            image: "https://example.com/baby-stroller.jpg",
            price: "$129.99",
            description: "A lightweight and durable stroller for easy travel with your baby."
        },
        {
            id: 12,
            name: "Baby Stroller",
            image: "https://example.com/baby-stroller.jpg",
            price: "$129.99",
            description: "A lightweight and durable stroller for easy travel with your baby."
        },
        {
            id: 4,
            name: "Baby Blanket",
            image: "https://example.com/baby-blanket.jpg",
            price: "$24.99",
            description: "Soft and cozy blanket for keeping your baby warm and comfortable."
        },
        {
            id: 5,
            name: "Baby Bath Tub",
            image: "https://example.com/baby-bath-tub.jpg",
            price: "$39.99",
            description: "A safe and ergonomic baby bath tub with non-slip design."
        },
        {
            id: 6,
            name: "Baby Monitor",
            image: "https://example.com/baby-monitor.jpg",
            price: "$79.99",
            description: "Keep an eye on your baby with this video and audio baby monitor."
        },
        {
            id: 7,
            name: "Baby Onesies (Pack of 5)",
            image: "https://example.com/baby-onesies.jpg",
            price: "$29.99",
            description: "Adorable and comfortable onesies for everyday wear."
        },
        {
            id: 8,
            name: "Baby Teething Toys (Set of 3)",
            image: "https://example.com/baby-teething-toys.jpg",
            price: "$12.99",
            description: "Soothe your baby's gums with these safe and BPA-free teething toys."
        },
        {
            id: 9,
            name: "Baby Swaddle Blankets (Pack of 2)",
            image: "https://example.com/baby-swaddle-blankets.jpg",
            price: "$19.99",
            description: "Wrap your baby in comfort with these soft and breathable swaddle blankets."
        },
        {
            id: 10,
            name: "Baby High Chair",
            image: "https://example.com/baby-high-chair.jpg",
            price: "$69.99",
            description: "A sturdy and adjustable high chair for mealtime with your little one."
        },
        {
            id: 11,
            name: "Baby High Chair",
            image: "https://example.com/baby-high-chair.jpg",
            price: "$69.99",
            description: "A sturdy and adjustable high chair for mealtime with your little one."
        }
        

    ];

    return (
        <div>
            <center>
            <h1>Baby Products</h1>
            </center>
            <div className="products">
                {products.map(product => (
                    <div key={product.id} className="product">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default BabyProducts;
