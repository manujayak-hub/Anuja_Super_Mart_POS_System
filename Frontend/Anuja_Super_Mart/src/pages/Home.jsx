

import Navbar from "../components/Nav";

const Home = () => {
    return ( 
       <>
        <Navbar/>
        <div className="Hero">
            
            <h1>Your Title Goes Here</h1>
            <p>Your description or tagline goes here.</p>
            
            <a href="#learn-more" class="btn">Learn More</a>
        </div>
       </>
     );
}
 
export default Home;
