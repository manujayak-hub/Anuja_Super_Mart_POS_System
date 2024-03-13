import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useStore } from './stores/authStore'
import Dash from './components/AccountantComponents/Sidebar'
import TransactionsList from './pages/Accountant/Transactions'
import Menu from './pages/OrderProcess/Menu'
import List from './pages/OrderProcess/List'
import Customer from './pages/SalesAnalytics/Customer'
import Report from './pages/SalesAnalytics/Report'
import InventoryDash from './pages/inventory_Pages/inventoryDash'
import Hamper from './pages/Discount/Hamper'
import TotalSaving from './pages/Discount/TotalSaving'
import ItemList from './pages/Discount/ItemList'
import ButtonComponent from './components/Discount/ButtonComponent'


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
            <Route path="Login" element={<Login/>} />
            <Route path="Signup" element={<Signup/>}/>
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
            <Route path="inventory" element={<InventoryDash/>} />
            {user && <Route exact path="/About" render={() => <About />} />}

          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
