// import { React, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
// import Carousel from "react-bootstrap/Carousel";


// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'

// import '../assets/css/style.css';
import "../App.css";
// Image 

import Frreshipping from '../assets/images/icons/icon-free-shipping.png'
import Fastdelivery from '../assets/images/icons/icon-fast-delivery.png'
import Support from '../assets/images/icons/icon-247-support.png'

import Ba1 from "../assets/images/banner-image-1.jpg"
import Ba2 from "../assets/images/banner-image-2.jpg"
import Ba3 from "../assets/images/banner-image-3.jpg"

import Product from "../components/Product";

import Brandlogo1 from '../assets/images/brandlogo-1.png';
import Brandlogo2 from '../assets/images/brandlogo-2.png';
import Brandlogo3 from '../assets/images/brandlogo-3.png';
import Brandlogo4 from '../assets/images/brandlogo-4.png';
import Brandlogo5 from '../assets/images/brandlogo-5.png';
import OI from "../assets/images/offer-image-1.png";



import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import Carousel from "../components/Carousel";


const Home = () => {

  const BL = [ 
    Brandlogo1 , Brandlogo2, Brandlogo3, Brandlogo4, Brandlogo5,Brandlogo1
  ]


  let { user, logoutUser, authToken } = useContext(AuthContext);
  let [product, setProduct] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  let getProducts = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/products/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    console.log(data)
    setProduct(data)

  }

  return (
    <>
      <div>
        <br /><br />
        <div className="slider_area slider_black owl-carousel_a">
          <Carousel />
        </div>
      </div>

      {/* ===================================================== */}
      <main class="page-content">
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
        </div>

        {/* ==================================== */}

        <div id="tm-popular-products-area" class="tm-section tm-popular-products-area tm-padding-section bg-white">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-6 col-12">
                <div class="tm-sectiontitle text-center">
                  <h3>POPULAR PRODUCTS</h3>
                  <p>Our popular products are so beautyful to see that the shoppers are easily attracted
                    to them.</p>
                </div>
              </div>
            </div>
            <div class="row tm-products-slider">
              <div className="container"></div>
              <div className="main row">

                {product.map(data => (


                  <div className="col-4 mb-3 mt-2 col-lg-4 col-md-6 col-sm-6 col-12">
                    <Link to={`/ProductDetail/${data.slug}`} className="nav-link">
                      <Product data={data} />
                    </Link>

                  </div>
                ))}
              </div>

            </div>
            <div class="tm-product-loadmore text-center mt-50">
                        <Link to="Products" class="tm-button nav-link">All Products</Link>
                    </div>
          </div>
        </div>


        {/* ==================================== */}

        <div className="tm-section tm-banners-area">
          <div className="container">
            <div className="row mt-30-reverse">
              {/* Single Banner */}
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                <a href="#" className="tm-banner ">
                  <img src={Ba1} alt="banner image" />
                </a>
              </div>
              {/*// Single Banner */}
              {/* Single Banner */}
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                <a href="#" className="tm-banner ">
                  <img src={Ba2} alt="banner image" />
                </a>
              </div>
              {/*// Single Banner */}
              {/* Single Banner */}
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                <a href="#" className="tm-banner ">
                  <img src={Ba3} alt="banner image" />
                </a>
              </div>
              {/*// Single Banner */}
            </div>
          </div>
        </div>

        <div className="tm-section tm-offer-area tm-padding-section bg-grey">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12 order-2 order-lg-1">
                <div className="tm-offer-content">
                  <h6>Super deal of the Month</h6>
                  <h1>Brand ear ring on <span>$250</span> only</h1>
                  <div className="tm-countdown" data-countdown="2020/10/12" />
                  <a href="product-details.html" className="tm-button nav-link">Shop now</a>
                </div>
              </div>
              <div className="col-lg-6 col-12 order-1 order-lg-2">
                <div className="tm-offer-image">
                  <img className="tm-offer " src={OI} alt="offer image" />
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


      </main>
    </>
  );
};

export default Home;
