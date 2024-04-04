import React, { useState } from 'react';
import BabyProducts from '../../components/Customer_components/BabyProducts';
import Beverage from '../../components/Customer_components/Beverages';
import Snacks from '../../components/Customer_components/Snacks';
import CookingEssential from '../../components/Customer_components/CookingEssential';
import DairyProducts from '../../components/Customer_components/DairyProducts';
import PersonalCare from '../../components/Customer_components/PersonalCare';
import Other from '../../components/Customer_components/Other';
import Navbar from './NavBar';
import { Pagination } from 'react-bootstrap';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowAllCategories(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowAllCategories(true); // Show all categories when starting a new search
    setCurrentPage(1); // Reset to first page on new search
  };

  const filterCategories = (categories) => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filterCategories(categories).slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <h1 className="text-center mb-4"></h1>
      <div className="d-flex justify-content-center">
        <div className="btn-group mb-3" role="group">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`btn btn-primary ${selectedCategory === category.id ? 'active btn-animation' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <form className="d-flex input-group w-auto">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </form>
      </div>
      <div className="container-fluid">
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {showAllCategories &&
            currentCategories.map((category) => (
              <div key={category.id} className="mb-4">
                {category.component}
              </div>
            ))}
        </div>
      </div>

      {showAllCategories && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: Math.ceil(filterCategories(categories).length / categoriesPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
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
