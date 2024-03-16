import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryDash from '../pages/inventory_Pages/inventoryDash';
import AddItem from '../pages/inventory_Pages/Add_itemDash';
import InventoryDelete from '../pages/inventory_Pages/inventory_Delete'
import EditInv from '../pages/inventory_Pages/Edit_inv'
import InvProfile from '../pages/inventory_Pages/invprofile'

const InventoryRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/inventory" element={<InventoryDash />} />
        <Route path="/inventory/delete" element={<InventoryDelete />} />
        <Route path="/inventory/add" element={<AddItem />} />
        <Route path="/inventory/edit" element={<EditInv />} />
        <Route path="/invprofile" element={<InvProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default InventoryRoute;
