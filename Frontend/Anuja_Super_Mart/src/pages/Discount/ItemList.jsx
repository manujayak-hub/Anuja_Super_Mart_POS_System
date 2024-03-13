import React from 'react';
import './ItemList.css';

const items = [
  {
    id: 1,
    name: 'Floor 1 kg packet',
    details: '10% Discount',
    image: 'item1.jpg',
  },
  {
    id: 2,
    name: 'Anchor 400g',
    details: '15% Discount',
    image: 'item2.jpg',
  },
  {
    id: 3,
    name: 'Cream Cracker',
    details: '5% Discount',
    image: 'item2.jpg',
  },
  {
    id: 4,
    name: 'Lemon Puff',
    details: '25% Discount',
    image: 'item2.jpg',
  },
  {
    id: 5,
    name: 'Soap',
    details: '50% Discount',
    image: 'item2.jpg',
  },
  {
    id: 6,
    name: 'Kitz Sause',
    details: '10% Discount',
    image: 'item2.jpg',
  },
  {
    id: 7,
    name: 'Pasta',
    details: '75% Discount',
    image: 'item2.jpg',
  },
  {
    id: 8,
    name: 'Ceylon Tea',
    details: '50% Discount',
    image: 'item2.jpg',
  },

];

const ItemList = () => {
  return (
    <div>
      <h1><center>Discounted Items</center></h1>
      <br></br>
      <br></br>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.name} />
            <div className="details">
              <h2>{item.name}</h2>
              <p>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
