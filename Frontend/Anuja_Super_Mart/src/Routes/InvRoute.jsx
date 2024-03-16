import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryDash from '../pages/inventory_Pages/inventoryDash';
import InvSideBar from '../components/InventoryComponents/InvSideBar';
import AddItem from '../pages/inventory_Pages/Add_itemDash';
import InvDelete from '../pages/inventory_Pages/inventory_Delete'

const InventoryRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/inventory" element={<InventoryDash />} />
        <Route path="/inventory/sidebar" element={<InvSideBar />} />
        <Route path="/inventory/delete" element={<InvDelete />} />
        <Route path="/inventory/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default InventoryRoute;
