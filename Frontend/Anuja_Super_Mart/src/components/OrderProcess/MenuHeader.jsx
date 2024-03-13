import React from "react";
import { Link } from 'react-router-dom';
import './MenuHeader.css';




const  Header2 = () => {
    return ( 

        <>
        <div>
        <h1 color="#FD204F">
            MENU
        </h1>
        </div>
        <div name="Categories">
            <button>Baby Products</button>
            <button>Bevarage</button>
            <button>Snacks</button>
            <button>Cooking Essentails</button>
            <button>Diary Product</button>
            <button>Personal Care</button>



          </div>
        </>

     );
}
 
export default Header2;