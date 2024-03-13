import React, { useState } from 'react';
import BabyProducts from '../../components/Customer_components/BabyProducts';
import Beverage from '../../components/Customer_components/Beverages';
import Snacks from '../../components/Customer_components/Snacks';
import CookingEssential from '../../components/Customer_components/CookingEssential';
import DairyProducts from '../../components/Customer_components/DairyProducts';
import PersonalCare from '../../components/Customer_components/PersonalCare';
import './categories.css';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-header">Categories</h1>
      <div className="categories-buttons">
        <button className="categories-button" onClick={() => handleCategoryClick('babyProducts')}>
          Baby Products
        </button>
        <button className="categories-button" onClick={() => handleCategoryClick('beverage')}>
          Beverage
        </button>
        <button className="categories-button" onClick={() => handleCategoryClick('snacks')}>
          Snacks
        </button>
        <button className="categories-button" onClick={() => handleCategoryClick('cookingEssential')}>
          Cooking Essential
        </button>
        <button className="categories-button" onClick={() => handleCategoryClick('dairyProducts')}>
          Dairy Products
        </button>
        <button className="categories-button" onClick={() => handleCategoryClick('personalCare')}>
          Personal Care
        </button>
      </div>
      <div className="category-images">
        <img
          className={`category-image ${selectedCategory === 'babyProducts' ? 'active' : ''}`}
          src="path_to_baby_products_image.jpg"
          alt="Baby Products"
        />
        <img
          className={`category-image ${selectedCategory === 'beverage' ? 'active' : ''}`}
          src="path_to_beverage_image.jpg"
          alt="Beverage"
        />
        <img
          className={`category-image ${selectedCategory === 'snacks' ? 'active' : ''}`}
          src="path_to_snacks_image.jpg"
          alt="Snacks"
        />
        <img
          className={`category-image ${selectedCategory === 'cookingEssential' ? 'active' : ''}`}
          src="path_to_cooking_essential_image.jpg"
          alt="Cooking Essential"
        />
        <img
          className={`category-image ${selectedCategory === 'dairyProducts' ? 'active' : ''}`}
          src="path_to_dairy_products_image.jpg"
          alt="Dairy Products"
        />
        <img
          className={`category-image ${selectedCategory === 'personalCare' ? 'active' : ''}`}
          src="path_to_personal_care_image.jpg"
          alt="Personal Care"
        />
      </div>
      <div>
        {selectedCategory === 'babyProducts' && <BabyProducts />}
        {selectedCategory === 'beverage' && <Beverage />}
        {selectedCategory === 'snacks' && <Snacks />}
        {selectedCategory === 'cookingEssential' && <CookingEssential />}
        {selectedCategory === 'dairyProducts' && <DairyProducts />}
        {selectedCategory === 'personalCare' && <PersonalCare />}
      </div>
    </div>
  );
}

export default Categories;
