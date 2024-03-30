import React from 'react';
import Navbar from "../components/Nav";

const About = () => {
  return (
    <>
      <Navbar />
      <div>
        <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: "url(images/about.jpg)"}}>
                <a href="https://vimeo.com/45830194" className="icon popup-vimeo d-flex justify-content-center align-items-center">
                  <span className="icon-play"></span>
                </a>
              </div>
              <div className="col-md-7 py-5 wrap-about pb-md-5 ftco-animate">
                <div className="heading-section-bold mb-4 mt-md-5">
                  <div className="ml-md-0">
                    <h2 className="mb-4">Welcome to Vegefoods an eCommerce website</h2>
                  </div>
                </div>
                <div className="pb-md-5">
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p>But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                  <p><a href="#" className="btn btn-primary">Shop now</a></p>
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

        <section className="ftco-section ftco-counter img" id="section-counter" style={{backgroundImage: "url(images/bg_3.jpg)"}}>
          <div className="container">
            <div className="row justify-content-center py-5">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                    <div className="block-18 text-center">
                      <div className="text">
                        <strong className="number" data-number="10000">0</strong>
                        <span>Happy Customers</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                    <div className="block-18 text-center">
                      <div className="text">
                        <strong className="number" data-number="100">0</strong>
                        <span>Branches</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                    <div className="block-18 text-center">
                      <div className="text">
                        <strong className="number" data-number="1000">0</strong>
                        <span>Partner</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                    <div className="block-18 text-center">
                      <div className="text">
                        <strong className="number" data-number="100">0</strong>
                        <span>Awards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ftco-section testimony-section">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-3">
              <div className="col-md-7 heading-section ftco-animate text-center">
                <span className="subheading">Testimony</span>
                <h2 className="mb-4">Our satisfied customer says</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
              </div>
            </div>
            <div className="row ftco-animate">
              <div className="col-md-12">
                <div className="carousel-testimony owl-carousel">
                  <div className="item">
                    <div className="testimony-wrap p-4 pb-5">
                      <div className="user-img mb-5" style={{backgroundImage: "url(images/person_1.jpg)"}}>
                        <span className="quote d-flex align-items-center justify-content-center">
                          <i className="icon-quote-left"></i>
                        </span>
                      </div>
                      <div className="text text-center">
                        <p className="mb-5 pl-4 line">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <p className="name">Garreth Smith</p>
                        <span className="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                  {/* Add more testimonial items as needed */}
                </div>
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
                <h1 className="text-primary mb-0">Fruitables</h1>
                <p className="text-secondary mb-0">Fresh products</p>
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
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3">
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why People Like us!</h4>
              <p className="mb-4">
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the like Aldus
                PageMaker including of Lorem Ipsum.
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
              <p>Address: 1429 Netus Rd, NY 48247</p>
              <p>Email: Example@gmail.com</p>
              <p>Phone: +0123 4567 8910</p>
              <p>Payment Accepted</p>
              <img src="img/payment.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
