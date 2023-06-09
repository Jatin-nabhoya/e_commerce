import Product from "../components/Product";

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductsCategory() {
    // let { user, logoutUser, authToken } = useContext(AuthContext);
    let [product, setProduct] = useState([])
    let [notavailable, setNotavailable] = useState(false)
    const { slug } = useParams();

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
        <div>
            <br /><br />
            <div className="tm-breadcrumb-area tm-padding-section bg-grey" data-bgimage="assets/images/breadcrumb-bg.jpg">
                <div className="container">
                    <div className="tm-breadcrumb">
                        <h2>Products</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li>Shop</li>
                        </ul>
                    </div>
                </div>
            </div>

            <main className="page-content">


                <div className="tm-products-area tm-section tm-padding-section bg-white">
                    <div className="container">
                        <form action="#" className="tm-shop-header">
                            <div className="tm-shop-productview">
                                <span>View:</span>
                                <button data-view="grid" className="active"><i className="ion-android-apps"></i></button>
                                <button data-view="list"><i className="ion-android-menu"></i></button>
                            </div>
                            <p className="tm-shop-countview">Showing 1 to 9 of 16 </p>
                            <select>
                                <option value="value">Default Sorting</option>
                                <option value="value">Name A-Z</option>
                                <option value="value">Date</option>
                                <option value="value">Best Sellers</option>
                                <option value="value">Trending</option>
                            </select>
                        </form>

                        <div className="tm-shop-products">

                            <div className="container"></div>
                            <div className="main row">

                                {product.map(data => (

                                    data.category == slug ?
                                        (<>
                                            <div className="col-4 mb-4 mt-2 col-lg-4 col-md-6 col-sm-6 col-12"
                                                onClick="refresh">

                                                <Link to={`/ProductDetail/${data.slug}`} className="nav-link" >
                                                    <Product data={data} />
                                                </Link>

                                            </div>
                                        </>) : null
                                        // setNotavailable(true)
                                ))}
                                {/* {notavailable == true ? (
                                    <>
                                        <tr>
                                            <td colSpan={6}>
                                                <div class="alert alert-warning" role="alert">
                                                    Your cart is Currently empty.
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ): null} */}
                            </div>
                        </div>
                        {/* <div className="tm-pagination mt-50">
                            <ul>
                                <li className="is-active"><a href="products.html">1</a></li>
                                <li><a href="products.html">2</a></li>
                                <li><a href="products.html">3</a></li>
                                <li><a href="products.html">4</a></li>
                                <li><a href="products.html"><i className="ion-chevron-right"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>


            </main>
        </div>
    );
}
