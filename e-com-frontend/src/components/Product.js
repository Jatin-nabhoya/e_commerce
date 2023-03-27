
import '../assets/css/App.scss';

// import "font-awesome/css/font-awesome.min.css";
import Rating from '@mui/material/Rating';
// import Products from '../peges/Products';
// import Typography from '@mui/material/Typography';

import React , { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


function Product(props) {

  // let { user, logoutUser, authToken } = useContext(AuthContext);
  // let [product, setProduct] = useState([])

  // useEffect(() => {
  //   getProducts()
  // }, [])

  // let getProducts = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/api/products/", {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       // 'Authorization': 'Bearer ' + String(authToken.access)
  //     }
  //   })
  //   let data = await response.json()
  //   console.log(data)
  //   setProduct(data)

  // }

  return (
    <>
      {/* <div className="container"></div>
      <div className="main row">

        {product.map(data => (


          <div className="col-4 mb-3 mt-2 col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={`/ProductDetail/${data.slug}`} className="nav-link"> */}
              <div className="con" style={{
                backgroundImage: `url("${props.data.image1}")`
              }} >
                <div className="ov">
                  <div className="it" />
                  <div className="it hd">
                    <p>{props.data.name}</p>

                    <span className="hr" />
                  </div>
                  <div className="it pr">
                    <p className="old">$699</p>
                    <p className="new">${props.data.price}</p>
                    <span className="rat">
                      <Rating className=" rat"
                        name="read-only"
                        value={props.data.ratings}
                        sx={{
                          color: '#FEF5DF',
                        }}
                        readOnly />
                    </span>
                  </div>
                  <div className="it cr">
                    <i className="fa fa-shopping-cart" />
                    <span>ADD TO CART</span>
                  </div>
                </div>
              </div>

            {/* </Link>

          </div>
        ))}
      </div> */}
    </>

  );
}

export default Product;
