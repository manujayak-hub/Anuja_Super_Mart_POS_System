import React from "react";
import Navbar from "../components/Nav";
import { Carousel } from "react-bootstrap";
import discountImage from "../assets/Customer/discount.png";
import shopImage from "../assets/Customer/shop.png";
import brand1Image from "../assets/Customer/brand1.png";
import brand2Image from "../assets/Customer/brand2.png";
import brand3Image from "../assets/Customer/brand3.png";
import item1Image from "../assets/Customer/item1.png";
import item2Image from "../assets/Customer/item2.png";
import item3Image from "../assets/Customer/item3.png";
import item4Image from "../assets/Customer/item4.png";
import item5Image from "../assets/Customer/item5.png";
import "../styles/home.scss"; // Import your SCSS file here

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container first-carousel">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={discountImage} alt="discount" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={shopImage} alt="shop" />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="container second-carousel">
        <center>
        <h2 className="discount-heading">Discount</h2>
        </center>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={brand1Image} alt="brand1" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={brand2Image} alt="brand2" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={brand3Image} alt="brand3" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Features Section Start */}
      <div className="container-fluid features py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="features-item text-center rounded bg-light p-4">
                <div className="features-content text-center">
                  <h5>Free Shipping</h5>
                  <p className="mb-0">Free on order over Rs.10000</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="features-item text-center rounded bg-light p-4">
                <div className="features-content text-center">
                  <h5>Security Payment</h5>
                  <p className="mb-0">100% security payment</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="features-item text-center rounded bg-light p-4">
                <div className="features-content text-center">
                  <h5>30 Day Return</h5>
                  <p className="mb-0">30 day money guarantee</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="features-item text-center rounded bg-light p-4">
                <div className="features-content text-center">
                  <h5>24/7 Support</h5>
                  <p className="mb-0">Support every time fast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section End */}

      <div className="container second-carousel">
        <center>
          <h2>Item in our shop</h2>
        </center>
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={item1Image} alt="item1" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={item2Image} alt="item2" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={item3Image} alt="item3" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={item4Image} alt="item4" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={item5Image} alt="item5" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>


      

      <div className="container-fluid footer py-5 mt-5" style={{ backgroundColor: "#198754" }}>
        <div className="container text-white">
        <h3 className="mb-3">Anuja Super Mart</h3>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  Anuja Supe Mart: Trusted for over a decade in Marawila, Sri Lanka. We're loved for quality, service, and a friendly smile!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="mb-3">Shop Info</h4>
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
                <h4 className="mb-3">Account</h4>
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
                <h4 className="mb-3">Contact</h4>
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
};

export default Home;
