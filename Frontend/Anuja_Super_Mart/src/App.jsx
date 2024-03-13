import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useStore } from './stores/authStore'
import Menu from './pages/OrderProcess/Menu'
import List from './pages/OrderProcess/List'




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
            <Route path="Menu" element={<Menu/>} />
            <Route path="List" element={<List/>} />
            
            {user && <Route exact path="/About" render={() => <About />} />}

          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
