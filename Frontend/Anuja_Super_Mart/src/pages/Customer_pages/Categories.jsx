import React, { useState } from 'react';
import BabyProducts from '../../components/Customer_components/BabyProducts';
import Beverage from '../../components/Customer_components/Beverages';
import Snacks from '../../components/Customer_components/Snacks';
import CookingEssential from '../../components/Customer_components/CookingEssential';
import DairyProducts from '../../components/Customer_components/DairyProducts';
import PersonalCare from '../../components/Customer_components/PersonalCare';
import Other from '../../components/Customer_components/Other';
import Navbar from './NavBar';
import './Categories.scss'; // Import your SCSS file

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(true);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowAllCategories(false);
  };

  // Array of category objects for rendering buttons
  const categories = [
    { name: 'Baby Products', id: 'babyProducts', component: <BabyProducts /> },
    { name: 'Beverage', id: 'beverage', component: <Beverage /> },
    { name: 'Snacks', id: 'snacks', component: <Snacks /> },
    { name: 'Cooking Essential', id: 'cookingEssential', component: <CookingEssential /> },
    { name: 'Dairy Products', id: 'dairyProducts', component: <DairyProducts /> },
    { name: 'Personal Care', id: 'personalCare', component: <PersonalCare /> },
    { name: 'Other ', id: 'Other', component: <Other /> },
  ];

  return (
    <div>
      <Navbar />
      <h1 className="text-center mb-4"></h1>
      <div className="row justify-content-center mb-4">
        {categories.map((category) => (
          <div key={category.id} className="col-2">
            <button
              className={`btn btn-primary btn-lg w-100 mb-2 ${selectedCategory === category.id ? 'active btn-animation' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>

      {showAllCategories && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            {categories.map((category) => (
              <div key={category.id} className="mb-4">
              
                {category.component}
              </div>
            ))}
          </div>
        </div>
      )}

      {!showAllCategories && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            {selectedCategory && categories.find((cat) => cat.id === selectedCategory)?.component}
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
