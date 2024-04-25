import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Form from './pages/Task/Form';
import SProfile from './pages/Task/SProfile';
import SDetails from './pages/Task/SDetails';
import Categories from './pages/Customer_pages/Categories';
import { useStore } from './stores/authStore'
import TransactionForm from './pages/Accountant/Add_new_form'
import TransactionsList from './pages/Accountant/Transactions'
import UserProfile from './pages/Accountant/UserProfile'
import Dash from'./pages/Accountant/Accountantdash'

import Customer from './pages/SalesAnalytics/Customer'
import Report from './pages/SalesAnalytics/Report'
import Hamper from './pages/Discount/Hamper'
import TotalSaving from './pages/Discount/TotalSaving'
import ItemList from './pages/Discount/ItemList'
import ButtonComponent from './components/Discount/ButtonComponent'
import InventoryRoute from './Routes/InvRoute'

import 'bootstrap/dist/css/bootstrap.min.css';
import OrderRoute from './Routes/OrderRoute'



import 'bootstrap/dist/css/bootstrap.min.css'
import OrderRetrieve from './pages/OrderProcess/OrderRetrieve'
import PickupOrders from './pages/OrderProcess/PickupOrders'
import EmpRoute from './Routes/empRoute';



function App() {
  const user = useStore(state => state.user);
  

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="About" element={<About/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="Login" element={<Login/>}/>
            <Route path="Signup" element={<Signup/>}/>

            <Route path="TransactionForm" element={<TransactionForm/>}/>  
            <Route path="AccountantDash" element={<Dash/>}/>
            <Route path="Transactions" element={<TransactionsList/>}/>
            <Route path="UserProfile" element={<UserProfile/>}/>
            
            <Route path="Form" element={<Form/>}/>
            <Route path="SProfile" element={<SProfile/>}/>
            <Route path="SDetails" element={<SDetails/>}/>
            <Route path="Categories" element={<Categories/>} />
            <Route path="Dash" element={<Dash/>}/>

            
          
            <Route path="Customer" element={<Customer/>}/>
            <Route path="Report" element={<Report/>}/>
            <Route path="Promoting" element={<ItemList/>}/>
            <Route path="Hamper" element={<Hamper/>}/>
            <Route path="ItemList" element={<ItemList/>}/>
            <Route path="TotalSaving" element={<TotalSaving/>}/>
            <Route path="ButtonComponent" element={<ButtonComponent/>}/>


           
           

           
            <Route path="OrderRetrieve" element={<OrderRetrieve/>} />
            <Route path="PickupOrders" element={<PickupOrders/>} />



            
            


            {user && <Route exact path="/About" render={() => <About />} />}
            

          </Route>
        </Routes>
     </BrowserRouter>
     <InventoryRoute/>

     <OrderRoute/>

     <EmpRoute/>

    </>
  )
}

export default App;
