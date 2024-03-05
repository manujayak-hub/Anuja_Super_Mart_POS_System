import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="About" element={<About/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="Login" element={<Login/>} />
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
