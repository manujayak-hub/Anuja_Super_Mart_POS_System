import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderRetrieve from '../pages/OrderProcess/OrderRetrieve'
import PickupOrders from '../pages/OrderProcess/PickupOrders'
import Menu from '../pages/OrderProcess/Menu'
import List from '../pages/OrderProcess/List'


const OrderRoute = () => {
    return (  

        <BrowserRouter>
        <Routes>
         <Route path="/Menu" element={<Menu/>} />
         <Route path="/List" element={<List/>} />
         <Route path="/OrderRetrieve" element={<OrderRetrieve/>} />
         <Route path="/PickupOrders" element={<PickupOrders/>} />
        </Routes>
      </BrowserRouter>
    );
};
 
export default OrderRoute;
