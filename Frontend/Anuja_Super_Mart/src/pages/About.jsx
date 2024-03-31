import React from 'react';
import Navbar from "../components/Nav";
import aboutImage from "../assets/Customer/about.png";

const About = () => {
  return (
    <>
      <Navbar />
      <div>
        <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${aboutImage})`}}>
                <a href={aboutImage} className="icon popup-vimeo d-flex justify-content-center align-items-center">
                  <span className="icon-play"></span>
                </a>
              </div>
              <div className="col-md-7 py-5 wrap-about pb-md-5 ftco-animate">
                <div className="heading-section-bold mb-4 mt-md-5">
                  <div className="ml-md-0">
                    <h2 className="mb-4">Welcome to Anuja Super Mart</h2>
                  </div>
                </div>
                <div className="pb-md-5">
                  <p>Welcome to Anuja Super Mart - Your Local Grocery Destination in Marawila, Sri Lanka!
                  Far away from the hustle and bustle, amidst the serene lands of Marawila, nestled in the heart of Sri Lanka, lies Anuja Super Mart. Here, amidst the lush landscapes and vibrant community, we bring you the finest selection of groceries and essentials.
                  Just like the hidden gem that Marawila is, our store offers you a world of culinary delights. From the freshest produce to pantry staples, we have everything you need to create delicious meals and cherished memories.
                  As you journey through the aisles of Anuja Super Mart, you'll find yourself surrounded by the bounty of Sri Lanka. Our shelves are adorned with the colors and flavors of the island, offering you a taste of its rich culture and heritage.
                  So come, wander through our store, where each product tells a story, and each aisle beckons with promise. Let Anuja Super Mart be your guide as you embark on a culinary adventure unlike any other.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
          <div className="container py-4">
            <div className="row d-flex justify-content-center py-5">
              <div className="col-md-6">
                <h2 style={{fontSize: "22px"}} className="mb-0">Subcribe to our Newsletter</h2>
                <span>Get e-mail updates about our latest shops and special offers</span>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <form action="#" className="subscribe-form">
                  <div className="form-group d-flex">
                    <input type="text" className="form-control" placeholder="Enter email address" />
                    <input type="submit" value="Subscribe" className="submit px-3" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
            <div className="row g-4">
              <div className="col-lg-3">
                <a href="#">
                  <h1 className="text-primary mb-0">Anuja Super Mart</h1>
                  <p className="text-secondary mb-0">Best products</p>
                </a>
              </div>
              <div className="col-lg-6">
                <div className="position-relative mx-auto">
                  <input
                    className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Your Email"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                    style={{ top: 0, right: 0 }}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  Anuja Supe Mart: Trusted for over a decade in Marawila, Sri Lanka. We're loved for quality, service, and a friendly smile!
                </p>
                <a href="#" className="btn border-secondary py-2 px-4 rounded-pill text-primary">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>
                <a className="btn-link" href="#">
                  About Us
                </a>
                <a className="btn-link" href="#">
                  Contact Us
                </a>
                <a className="btn-link" href="#">
                  Privacy Policy
                </a>
                <a className="btn-link" href="#">
                  Terms & Condition
                </a>
                <a className="btn-link" href="#">
                  Return Policy
                </a>
                <a className="btn-link" href="#">
                  FAQs & Help
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <a className="btn-link" href="#">
                  My Account
                </a>
                <a className="btn-link" href="#">
                  Shop details
                </a>
                <a className="btn-link" href="#">
                  Shopping Cart
                </a>
                <a className="btn-link" href="#">
                  Wishlist
                </a>
                <a className="btn-link" href="#">
                  Order History
                </a>
                <a className="btn-link" href="#">
                  International Orders
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: "Anuja Super Mart", Nattandiya Road, Marawila</p>
                <p>Email: AnujaSuper@gmail.com</p>
                <p>Phone: 032 225 3234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
