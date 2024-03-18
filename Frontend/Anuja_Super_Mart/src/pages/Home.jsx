

import Navbar from "../components/Nav";

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="Hero">

                <h1>Your Title Goes Here</h1>
                <p>Your description or tagline goes here.</p>
                <a href="#learn-more" class="btn">Learn More</a>


                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-secondary">Secondary</button>
                <button type="button" class="btn btn-success">Success</button>
                <button type="button" class="btn btn-danger">Danger</button>
                <button type="button" class="btn btn-warning">Warning</button>
                <button type="button" class="btn btn-info">Info</button>
                <button type="button" class="btn btn-light">Light</button>
                <button type="button" class="btn btn-dark">Dark</button>

                <button type="button" class="btn btn-link">Link</button>

            </div>
        </>
    );

}

export default Home;
