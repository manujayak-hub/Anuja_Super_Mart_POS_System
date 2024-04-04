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
import Dash from'./pages/Accountant/Accountantdash'
import Menu from './pages/OrderProcess/Menu'
import List from './pages/OrderProcess/List'
import Customer from './pages/SalesAnalytics/Customer'
import Report from './pages/SalesAnalytics/Report'
import Hamper from './pages/Discount/Hamper'
import TotalSaving from './pages/Discount/TotalSaving'
import ItemList from './pages/Discount/ItemList'
import ButtonComponent from './components/Discount/ButtonComponent'
import Emp_list from './pages/Emp_pages/emp_list'
import Emp_Dashboard from './pages/Emp_pages/emp_dashboard'
import Emp_Attendance from './pages/Emp_pages/emp_attendance'
import Emp_Salary from './pages/Emp_pages/emp_salary'

import InventoryRoute from './Routes/InvRoute'
import 'bootstrap/dist/css/bootstrap.min.css';


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

            <Route path="Form" element={<Form/>}/>
            <Route path="SProfile" element={<SProfile/>}/>
            <Route path="SDetails" element={<SDetails/>}/>
            <Route path="Categories" element={<Categories/>} />
            <Route path="Dash" element={<Dash/>}/>

            <Route path="Transactions" element={<TransactionsList/>}/>
            <Route path="Menu" element={<Menu/>} />
            <Route path="List" element={<List/>} />
            <Route path="Customer" element={<Customer/>}/>
            <Route path="Report" element={<Report/>}/>
            <Route path="Promoting" element={<ItemList/>}/>
            <Route path="Hamper" element={<Hamper/>}/>
            <Route path="ItemList" element={<ItemList/>}/>
            <Route path="TotalSaving" element={<TotalSaving/>}/>
            <Route path="ButtonComponent" element={<ButtonComponent/>}/>

            <Route path="emp_list" element={<Emp_list/>} />
            <Route path="emp_dashboard" element={<Emp_Dashboard/>} />
            <Route path="emp_attendance" element={<Emp_Attendance/>} />
            <Route path="emp_salary" element={<Emp_Salary/>} />
            


            {user && <Route exact path="/About" render={() => <About />} />}
            

          </Route>
        </Routes>
     </BrowserRouter>
     <InventoryRoute/>
    </>
  )
}

export default App;
