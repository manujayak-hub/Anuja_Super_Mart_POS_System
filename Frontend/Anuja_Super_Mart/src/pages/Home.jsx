import React from "react";
import Navbar from "../components/Nav";
import snacksImage from "../assets/Customer/snacks.png";
import beverageImage from "../assets/Customer/beverage.png";
import freeImage from "../assets/Customer/free.png";
import secImage from "../assets/Customer/sec.png";
import dayImage from "../assets/Customer/day.png";
import twoImage from "../assets/Customer/two.png";
import snaImage from "../assets/Customer/sna.png";

const Home = () => {
    return (
        <>
            <Navbar/>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}

            {/* Hero Start */}
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">The lowest price just for you</h4>
                            <h1 className="mb-5 display-3 text-primary">Anuja Super Mart</h1>
                            <div className="position-relative mx-auto">
                                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: "25%" }}>Submit Now</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active rounded">
                                <img src={snacksImage} className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                <a href="#" className="btn px-4 py-2 text-white rounded">Baby Products</a>
                              </div>
                                    <div className="carousel-item rounded">
                                        <img src={beverageImage} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <a href="#" className="btn px-4 py-2 text-white rounded">Beverage</a>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero End */}

            {/* Features Section Start */}
            <div className="container-fluid features py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="features-item text-center rounded bg-light p-4">
                                <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <img src={freeImage} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <i className="fas fa-car-side fa-3x text-white"></i>
                                </div>
                                <div className="features-content text-center">
                                    <h5>Free Shipping</h5>
                                    <p className="mb-0">Free on order over Rs.10000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="features-item text-center rounded bg-light p-4">
                                <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <img src={secImage} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <i className="fas fa-user-shield fa-3x text-white"></i>
                                </div>
                                <div className="features-content text-center">
                                    <h5>Security Payment</h5>
                                    <p className="mb-0">100% security payment</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="features-item text-center rounded bg-light p-4">
                                <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <img src={dayImage} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <i className="fas fa-exchange-alt fa-3x text-white"></i>
                                </div>
                                <div className="features-content text-center">
                                    <h5>30 Day Return</h5>
                                    <p className="mb-0">30 day money guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="features-item text-center rounded bg-light p-4">
                                <div className="features-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <img src={twoImage} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                    <i className="fa fa-phone-alt fa-3x text-white"></i>
                                </div>
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


      <div className="container-fluid banner bg-secondary my-5">
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="py-4">
              <h1 className="display-3 text-white">Best Snacks</h1>
              <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
              <p className="mb-4 text-dark">Let's Browse our range of Products to pick and add your most favourite ones to the cart</p>
              <a href="#" className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img src={snaImage} className="img-fluid w-100 rounded" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid py-5">
  <div className="container">
    <div className="bg-light p-5 rounded">
      <div className="row g-4 justify-content-center">
        <div className="col-md-6 col-lg-6 col-xl-3">
          <div className="counter bg-white rounded p-5 text-center">
            <i className="fas fa-users fa-4x text-secondary mb-4"></i>
            <h4 className="text-secondary">Satisfied Customers</h4>
            <h1 className="mb-0">1,963</h1>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3">
          <div className="counter bg-white rounded p-5 text-center">
            <i className="fas fa-star fa-4x text-secondary mb-4"></i>
            <h4 className="text-secondary">Quality of Service</h4>
            <h1 className="mb-0">99%</h1>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3">
          <div className="counter bg-white rounded p-5 text-center">
            <i className="fas fa-certificate fa-4x text-secondary mb-4"></i>
            <h4 className="text-secondary">Quality Certificates</h4>
            <h1 className="mb-0">33</h1>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3">
          <div className="counter bg-white rounded p-5 text-center">
            <i className="fas fa-shopping-cart fa-4x text-secondary mb-4"></i>
            <h4 className="text-secondary">Available Products</h4>
            <h1 className="mb-0">789</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
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

export default Home;
