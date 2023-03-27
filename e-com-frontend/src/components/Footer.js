import React from 'react'
import { Link } from 'react-router-dom'

import Payment from '../assets/images/payment-methods.png'
import Logo from '../assets/images/logo.png'


const Footer = () => {
  return (

    <>
      <div className="tm-footer">
        <ul id="instafeed" className="tm-instaphotos" />
        <div className="tm-footer-toparea tm-padding-section">
          <div className="container">
            <div className="widgets widgets-footer row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-widget widget-info">
                  <Link className="nav-link widget-info-logo" to="/">
                    <img src={Logo} alt="logo" />
                  </Link>

                  {/* <p>Lorem ipsum dolor sit amet, consect etur adipiscing elit.</p>  */}

                  <ul>
                    <li>
                      <b>Address :</b>2726 Avenue Papineau Montreal, QC, Canada
                    </li>
                    <li>
                      <b>Phone :</b>
                      <Link to="tel:+18009156270">1-800-915-6270</Link>
                    </li>
                    <li>
                      <b>Email :</b>
                      <Link to="mailto:info@example.com">info@example.com</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-widget widget-quicklinks">
                  <h6 className="widget-title">Useful Link</h6>
                  <ul>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="#">Delivery Info</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy &amp; Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Returns &amp; Refunds</Link>
                    </li>
                    <li>
                      <Link to="#">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-widget widget-quicklinks">
                  <h6 className="widget-title">My Account</h6>
                  <ul>
                    <li>
                      <Link to="/myaccount">My account</Link>
                    </li>
                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link to="#">Newsletter</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Check out</Link>
                    </li>
                    <li>
                      <Link to="#">Frequently Questions</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-widget widget-newsletter">
                  <h6 className="widget-title">Join Our Newsletter</h6>
                  <p>
                    Get Business news, tip and solutions to your problems from our
                    experts.
                  </p>
                  <form id="tm-mailchimp-form" className="widget-newsletter-form">
                    <input
                      id="mc-email"
                      type="text"
                      placeholder="Enter email address"
                    />
                    <button id="mc-submit" type="submit" className="tm-button">
                      Subscribe Now
                      <b />
                    </button>
                  </form>
                  <div className="tm-mailchimp-alerts">
                    <div className="tm-mailchimp-submitting" />
                    <div className="mailchimp-success" />
                    <div className="tm-mailchimp-error" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-footer-bottomarea">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <p className="tm-footer-copyright">
                  © 2023. Designed by <Link to="#">JTSY Jewel </Link>
                </p>
              </div>
              <div className="col-md-5">
                <div className="tm-footer-payment">
                  <img src={Payment} alt="payment methods" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Footer
