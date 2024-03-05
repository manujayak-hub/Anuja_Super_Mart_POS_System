
import React from 'react';
import Navbar from "../components/Nav";

const Login = () => {
    return ( 
        <>
        <Navbar/>
            <div className="App">
            <h1>Login Page</h1>
            <form >
                <label>
                Username:
                <input type="text"  />
                
                </label>
                <br />
                <label>
                Password:
                <input type="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            </div>
   
        </>

        //<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
        //<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
     );
}
 
export default Login;