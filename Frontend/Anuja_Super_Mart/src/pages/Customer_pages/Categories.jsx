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
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);

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

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

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
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-dark'} ${selectedCategory === category.id ? 'active btn-animation' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              style={{ backgroundColor: selectedCategory === category.id ? '#198754' : '' }}
            >
              {category.name}
            </button>
          ))}
        </div>
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


      {!showAllCategories && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            {selectedCategory && categories.find((cat) => cat.id === selectedCategory)?.component}
          </div>
        </div>
      )}

<style>
        {`
    /* Pagination styles */
    .pagination {
        margin-top: 20px;
    }

    .pagination .page-link {
        color: #198754;
        background-color: #fff;
        border: 1px solid #dee2e6;
    }

    .pagination .page-link:hover {
        z-index: 2;
        color: #157347; /* Darker shade for hover effect */
        background-color: #e9ecef;
        border-color: #dee2e6;
    }

    .pagination .page-item.active .page-link {
        z-index: 1;
        color: #fff;
        background-color: #198754;
        border-color: #198754;
    }

    .pagination .page-item.disabled .page-link {
        color: #6c757d;
        pointer-events: none;
        cursor: auto;
        background-color: #fff;
        border-color: #dee2e6;
    }
  `}
      </style>


      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">{number}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(categories.length / categoriesPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Categories;
