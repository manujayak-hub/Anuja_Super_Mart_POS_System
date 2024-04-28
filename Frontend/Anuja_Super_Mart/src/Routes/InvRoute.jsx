import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryDash from '../pages/inventory_Pages/inventoryDash';
import AddItem from '../pages/inventory_Pages/Add_itemDash';
import InventoryDelete from '../pages/inventory_Pages/inventory_Delete'
import EditInv from '../pages/inventory_Pages/Edit_inv'
import InvProfile from '../pages/inventory_Pages/invprofile'
import SupDash from '../pages/inventory_Pages/prod_supplier/Supplier_Dash'
import AddSupplierForm from '../pages/inventory_Pages/prod_supplier/Add_Supp_Dash'
const InventoryRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/inventory" element={<InventoryDash />} />
        <Route path="/inventory/delete" element={<InventoryDelete />} />
        <Route path="/inventory/add" element={<AddItem />} />
        <Route path="/inventory/edit" element={<EditInv />} />
        <Route path="/invprofile" element={<InvProfile />} />
        <Route path="/supplier" element={<SupDash />} />
        <Route path="/supplier/add" element={<AddSupplierForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default InventoryRoute;
