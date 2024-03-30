import React, { useState } from 'react';
import BabyProducts from '../../components/Customer_components/BabyProducts';
import Beverage from '../../components/Customer_components/Beverages';
import Snacks from '../../components/Customer_components/Snacks';
import CookingEssential from '../../components/Customer_components/CookingEssential';
import DairyProducts from '../../components/Customer_components/DairyProducts';
import PersonalCare from '../../components/Customer_components/PersonalCare';
import Navbar from '../../components/Nav'

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">

        <h1 className="text-center mb-4">Categories</h1>
        <div className="row justify-content-center mb-4">
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'babyProducts' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('babyProducts')}
            >
              Baby Products
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'beverage' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('beverage')}
            >
              Beverage
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'snacks' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('snacks')}
            >
              Snacks
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'cookingEssential' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('cookingEssential')}
            >
              Cooking Essential
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'dairyProducts' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('dairyProducts')}
            >
              Dairy Products
            </button>
          </div>
          <div className="col-6 col-md-4">
            <button
              className={`btn btn-primary w-100 mb-2 ${selectedCategory === 'personalCare' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('personalCare')}
            >
              Personal Care
            </button>
          </div>
          <div className="col-6 col-md-4">

          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            {selectedCategory === 'babyProducts' && <BabyProducts />}
            {selectedCategory === 'beverage' && <Beverage />}
            {selectedCategory === 'snacks' && <Snacks />}
            {selectedCategory === 'cookingEssential' && <CookingEssential />}
            {selectedCategory === 'dairyProducts' && <DairyProducts />}
            {selectedCategory === 'personalCare' && <PersonalCare />}
          </div>
        </div>
      </div>

    </>

  );
}

export default Categories;
