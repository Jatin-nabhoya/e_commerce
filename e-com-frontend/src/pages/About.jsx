import React from 'react'
import { Link } from 'react-router-dom'

import Frreshipping from '../assets/images/icons/icon-free-shipping.png'
import Fastdelivery from '../assets/images/icons/icon-fast-delivery.png'
import Support from '../assets/images/icons/icon-247-support.png'

import Brandlogo1 from '../assets/images/brandlogo-1.png';
import Brandlogo2 from '../assets/images/brandlogo-2.png';
import Brandlogo3 from '../assets/images/brandlogo-3.png';
import Brandlogo4 from '../assets/images/brandlogo-4.png';
import Brandlogo5 from '../assets/images/brandlogo-5.png';

import Ab from "../assets/images/about-image.jpg"; 

import TM1 from '../assets/images/team-member-1.jpg'
import TM2 from '../assets/images/team-member-2.jpg'
import TM3 from '../assets/images/team-member-3.jpg'
import TM4 from '../assets/images/team-member-4.jpg'
const About = () => {

  const BL = [ 
    Brandlogo1 , Brandlogo2, Brandlogo3, Brandlogo4, Brandlogo5,Brandlogo1
  ]

  return (
    <div>
      <br />
      <br />
      <div
        className="tm-breadcrumb-area tm-padding-section bg-grey"
        data-bgimage="assets/images/breadcrumb-bg.jpg"
      >
        <div className="container">
          <div className="tm-breadcrumb">
            <h2>About Us</h2>
            <ul>
              <li>
                <Link to="/">
                  Home</Link>
              </li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content ">
        <div className="tm-section tm-feature-area bg-grey">

          <div className="container">
            <div className="row mt-30-reverse">
              {/* Single Feature */}
              <div className="col-lg-4 mt-30">
                <div className="tm-feature">
                  <span className="tm-feature-icon">
                    <img
                      src={Frreshipping}
                      alt="free shipping"
                    />
                  </span>
                  <div className="tm-feature-content">
                    <h6>Free Shipping</h6>
                    <p>We provide free shipping for all order over $200.00</p>
                  </div>
                </div>
              </div>
              {/*// Single Feature */}
              {/* Single Feature */}
              <div className="col-lg-4 mt-30">
                <div className="tm-feature">
                  <span className="tm-feature-icon">
                    <img
                      src={Fastdelivery}
                      alt="fast delivery"
                    />
                  </span>
                  <div className="tm-feature-content">
                    <h6>Fast Delivery</h6>
                    <p>We always deliver our customers very quickly.</p>
                  </div>
                </div>
              </div>
              {/*// Single Feature */}
              {/* Single Feature */}
              <div className="col-lg-4 mt-30">
                <div className="tm-feature">
                  <span className="tm-feature-icon">
                    <img
                      src={Support}
                      alt="24/7 Support"
                    />
                  </span>
                  <div className="tm-feature-content">
                    <h6>24/7 Support</h6>
                    <p>We provide support to our customers within 24 hours. </p>
                  </div>
                </div>
              </div>
              {/*// Single Feature */}
            </div>
          </div>

          <div className="tm-about-area tm-padding-section bg-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="tm-about-image">
                    <img src={Ab} alt="about image" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tm-about-content">
                    <h4>WELCOME TO SUROSE STORE</h4>
                    <h6>
                      Lorem ipsum dolor sit amet consectetur adipisicing elitsed do
                      eiusmod ncididunt ametfh consectetur.
                    </h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quisnos trud exercitation ullamco
                      laboris nisi ut aliquip ex ea com modo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur.
                    </p>
                    <p>
                      Excepteur sint occaecat cupidatat non proident.sunt in culpa
                      qui officia deserunt mollit anim id est laborum consectetur
                      adipiscing elit, sed do eiusmod tempor incid idunt ut labore
                      et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tm-team-members tm-padding-section bg-grey">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-12">
                  <div className="tm-sectiontitle text-center">
                    <h3>MEET OUR TEAM</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed
                      aci erat dales vitakse dalesnon estin vitae egestas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row tm-member-slider">
                <div className="col-3">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src={TM4}
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <i className="ion-social-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Jatin nabhoya</h6>
                      <p>Founder &amp; CEO</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src={TM1}
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <i className="ion-social-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Priyal Sagar</h6>
                      <p>Managing Director</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src={TM2}
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <i className="ion-social-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Meet Mangukiya</h6>
                      <p>Sales Director</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src={TM4}
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a href="#">
                            <i className="ion-social-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Priyesh Bhalala</h6>
                      <p>Support Guru</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tm-section tm-brandlogo-area tm-padding-section bg-grey">
          <div className="container">
            <div className="row  tm-brandlogo-slider">
             {BL.map(data => (

               <div className="col-2  tm-brandlogo">
                <a href="#">
                  <img src={data} alt="brand-logo" />
                </a>
              </div>
                ))}
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>

  );
}

export default About;
