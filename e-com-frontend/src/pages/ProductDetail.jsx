import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import AuthContext from '../context/AuthContext';
import Product from "../components/Product";

const ProductDetail = () => {

  let { user, logoutUser, authToken } = useContext(AuthContext);
  let [products, setProducts] = useState([]);
  const { slug } = useParams();

  let [product, setProduct] = useState([])
  let [tab, setTab] = useState("desc")
  let [cur, setCur] = useState(0)

  useEffect(() => {
    getProduct()
    getProducts()
  }, [])

  let getProduct = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // 'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    console.table(data)
    setProduct(data)

  }

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
    setProducts(data)

  }

  let AddTOWishList = async () => {
    const Data = JSON.stringify({ user: user.id, productID: product.id });
    console.log(Data)
    let response = await fetch(`http://127.0.0.1:8000/api/wishlist/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      },
      body: Data
    })
    let data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <br /><br />

      <div
        className="tm-breadcrumb-area tm-padding-section bg-grey"
        data-bgimage="assets/images/breadcrumb-bg.jpg"
      >
        <div className="container">
          <div className="tm-breadcrumb">
            <h2>Products</h2>
            <ul>
              <li>
                <Link to="/">
                  Home</Link>
              </li>
              <li><Link to="/products">Shop</Link></li>
              <li>Product Detail</li>
              <li>{product.sub_category}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <h1>hiy jatin nabhoya</h1> */}
      {/* <div className="tm-product-quickview" id="tm-product-quickview"> */}
      {/* <div className="container"> */}
      <div className="row justify-content-center mt-5">
        <div className="col-xl-9 col-lg-10 col-12">
          <div className="tm-product-quickview-inner">
            <div className="tm-prodetails">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-10 col-12">
                  <div className="tm-prodetails-images">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        {(() => {
                          if (cur === 0) {
                            return (<>
                              <div className="carousel-item active">
                                <img className="d-block w-100 rounded" src={product.image1} alt="First slide" />
                              </div>
                            </>)
                          }
                          else if (cur === 1) {
                            return (<>
                              <div className="carousel-item active">
                                <img className="d-block w-100 rounded" src={product.image2} alt="Second slide" />
                              </div>
                            </>)
                          }
                          else {
                            return (<>
                              <div className="carousel-item active">
                                <img className="d-block w-100 rounded" src={product.image3} alt="Third slide" />
                              </div>
                            </>)
                          }
                        })()}
                      </div>
                    </div>
                    <div>

                      <ul className="list-inline center mt-5 text-center" >
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={0}
                          className={` list-inline-item ${cur === "0" ? "active " : ""}`}
                          onClick={() => setCur(0)}
                        >
                          <img className=" rounded zoom" src={product.image1} alt="First slide" width="100" height="100" />
                        </li>
                        {/* style={{maxWidth: "25%", height: "auto"}}  */}
                        <li data-target="#carouselExampleIndicators" data-slide-to={1} className={`list-inline-item ${cur === "1" ? "active " : ""}`}
                          onClick={() => setCur(1)} >
                          <img className="rounded " src={product.image2} alt="Second slide" width="100" height="100" />
                        </li>
                        <li data-target="#carouselExampleIndicators" data-slide-to={2} className={`list-inline-item ${cur === "2" ? "active " : ""}`}
                          onClick={() => setCur(2)} >
                          <img className="rounded " src={product.image3} alt="Second slide" width="100" height="100" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="tm-prodetails-content">
                    <h4 className="tm-prodetails-title">

                      {product.name}
                    </h4>
                    <span className="tm-prodetails-price">
                      <del>$425.99</del> {/* $59.99 */}
                      $ {product.price}.99
                    </span>

                    {/* <div className="tm-ratingbox"> */}
                    <Rating name="read-only" value={product.ratings} readOnly />
                    {/* </div> */}

                    <div className="tm-prodetails-infos">
                      <div className="tm-prodetails-singleinfo">
                        <b>Product ID : </b>010
                      </div>
                      <div className="tm-prodetails-singleinfo">
                        <b>Category : </b>
                        {product.category}
                        {/* <a href="#">Ring</a> */}
                      </div>
                      {/* <div className="tm-prodetails-singleinfo tm-prodetails-tags">
                              <b>Tags : </b>
                              <ul>
                                <li>
                                  <a href="#">bracelets</a>
                                </li>
                                <li>
                                  <a href="#">diamond</a>
                                </li>
                                <li>
                                  <a href="#">ring</a>
                                </li>
                                <li>
                                  <a href="#">necklaces</a>
                                </li>
                              </ul>
                            </div> */}
                      <div className="tm-prodetails-singleinfo">
                        <b>Available : </b>
                        <span className="color-theme">In Stock</span>
                      </div>
                      <div className="tm-prodetails-singleinfo tm-prodetails-share">
                        <b>Share : </b>
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
                    </div>
                    {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Quis quemi dolor, malesuada id metus a, mattis eleifend
                            elit. Nullam pharetra consequat ex in dapibus. Vestibulum
                            ante ipsum primis in faucibus orciluctus curae.
                          </p> */}
                    <div className="tm-prodetails-quantitycart">
                      <h6>Quantity :</h6>
                      <div className="tm-quantitybox">
                        <input type="number" id="quantity" name="quantity" min="1" defaultValue={1} max={product.inventory_count} />
                      </div>
                      <FavoriteBorderIcon onClick={AddTOWishList} /> &nbsp;
                      <Link to="/cart" className="tm-button tm-button-dark nav-link">
                        Add To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* // Product Details Product Details Description &amp; Review */}

            <div className="tm-prodetails-desreview tm-padding-section-sm-top">
              <ul className="nav tm-tabgroup2" id="prodetails" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${tab === "desc" ? "active text-warning" : ""}`}
                    id="prodetails-area1-tab"
                    data-toggle="tab"
                    href="#prodetails-area1"
                    role="tab"
                    aria-controls="prodetails-area1"
                    aria-selected="true"
                    onClick={() => setTab('desc')}
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tab === "rev" ? "active text-warning" : ""}`}
                    id="prodetails-area2-tab"
                    data-toggle="tab"
                    href="#prodetails-area2"
                    role="tab"
                    aria-controls="prodetails-area2"
                    aria-selected="false"
                    onClick={() => setTab('rev')}
                  >
                    Reviews (1)
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="prodetails-content">
                {
                  tab === 'desc' ? (<>
                    <div
                      className="tab-pane fade show active"
                      id="prodetails-area1"
                      role="tabpanel"
                      aria-labelledby="prodetails-area1-tab"
                    >
                      <div className="tm-prodetails-description ">
                        <h4 className='my-3'>Product Description</h4>
                        <p className='text-secondary'>

                          <pre>

                            {product.description}
                          </pre>



                        </p>
                      </div>
                    </div>

                  </>) : (<>

                    <div
                      className="tab-pane fade active"
                      id="prodetails-area2"
                      role="tabpanel"
                      aria-labelledby="prodetails-area2-tab"
                    >
                      <div className="tm-prodetails-review">
                        <h5 className='my-3'>1 Review For Stylist daimond ring</h5>
                        <div className="tm-comment-wrapper mb-50">
                          {/* Comment Single */}
                          <div className="tm-comment">
                            <div className="tm-comment-thumb">
                              <img
                                src="assets/images/author-image-1.jpg"
                                alt="author image"
                              />
                            </div>
                            <div className="tm-comment-content">
                              <h6 className="tm-comment-authorname">
                                <a href="#">Frida Bins</a>
                              </h6>
                              <span className="tm-comment-date">
                                Wednesday, October 17, 2018 at 4:00PM.
                              </span>
                              <div className="tm-ratingbox">
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span>
                                  <i className="ion-android-star-outline" />
                                </span>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit, sed do eiusmod tempor incididunt ut labore
                                dolore magna aliqua. Ut enim ad minim veniam.
                              </p>
                            </div>
                          </div>
                          {/*// Comment Single */}
                        </div>
                        <h5>Add a review</h5>
                        <form action="#" className="tm-form">
                          <div className="tm-form-inner">
                            <div className="tm-form-field">
                              <div className="tm-ratingbox tm-ratingbox-input">
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span className="is-active">
                                  <i className="ion-android-star-outline" />
                                </span>
                                <span>
                                  <i className="ion-android-star-outline" />
                                </span>
                              </div>
                            </div>
                            <div className="tm-form-field tm-form-fieldhalf">
                              <input
                                type="text"
                                placeholder="Your Name*"
                                required="required"
                              />
                            </div>
                            <div className="tm-form-field tm-form-fieldhalf">
                              <input
                                type="Email"
                                placeholder="Your Email*"
                                required="required"
                              />
                            </div>
                            <div className="tm-form-field">
                              <textarea
                                name="product-review"
                                cols={30}
                                rows={5}
                                placeholder="Your Review"
                                defaultValue={""}
                              />
                            </div>
                            <div className="tm-form-field">
                              <button type="submit" className="tm-button">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                  </>)}

              </div>
            </div>
            {/*// Product Details Description & Review */}


            <div className="tm-similliar-products tm-padding-section-sm-top">
              <h4 className="small-title">Similliar Products</h4>
              <div className="row tm-products-slider3">

                <div className="tm-shop-products">

                  <div className="container"></div>
                  <div className="main row">

                    {products.map((data) => (
                      data.slug != slug ?
                      (<>
                      <div className="col-4 mb-4 mt-2 col-lg-4 col-md-6 col-sm-6 col-12" 
                      onClick="refresh"
                      >
                        
                          
                        <Link to={`/ProductDetail/${data.slug}`} className="nav-link" >
                          <Product data={data} />
                        </Link>
                        

                      </div>
                      </>) : null
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div >

  );
}

export default ProductDetail;
