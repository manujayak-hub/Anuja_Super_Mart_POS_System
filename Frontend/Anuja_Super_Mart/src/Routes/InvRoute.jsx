import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryDash from '../pages/inventory_Pages/inventoryDash';
import InvSideBar from '../components/InventoryComponents/InvSideBar';
import AddItem from '../pages/inventory_Pages/Add_itemDash';

const InventoryRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for inventory dashboard */}
        <Route path="/inventory" element={<InventoryDash />} />

        {/* Route for inventory sidebar */}
        <Route path="/inventory/sidebar" element={<InvSideBar />} />

        {/* Route for adding an item */}
        <Route path="/inventory/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default InventoryRoute;
