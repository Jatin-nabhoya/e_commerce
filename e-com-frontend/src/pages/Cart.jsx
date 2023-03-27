
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const Cart = () => {

  let { user, logoutUser, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  });

  let [cart, setCart] = useState([])
  let [total, setTotel] = useState([])
  useEffect(() => {
    getCart()
  }, [])
  let updateCart = () =>{
    getCart()
  } 
  let getCart = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/cartitem/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    console.log(data)
    if (response.status === 200) {
      setCart(data.cart_items)
      console.log(data.cart_items.length)
      setTotel(data.subtotal)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }


  let removeCart = async (pid) =>{

    const Data = JSON.stringify({user: user.id, product:pid});
    console.log(Data)
    let response = await fetch(`http://127.0.0.1:8000/api/cartitem/${pid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      },
      body: Data
    }).then(()=>{getCart()})
    
  }




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
            <h2>Shopping Cart</h2>
            <ul>
              <li>
                <Link to="/">
                  Home</Link>
              </li>
              <li>
                <link to="/products" />
                Shop
              </li>
              <li>Shopping Cart</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section shopping-cart-area bg-white tm-padding-section">
          <div className="container">
            <div className="tm-cart-table table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th className="tm-cart-col-image" scope="col">
                      Image
                    </th>
                    <th className="tm-cart-col-productname" scope="col">
                      Product
                    </th>
                    <th className="tm-cart-col-price" scope="col">
                      Price
                    </th>
                    <th className="tm-cart-col-quantity" scope="col">
                      Quantity
                    </th>
                    <th className="tm-cart-col-total" scope="col">
                      Total
                    </th>
                    <th className="tm-cart-col-remove" scope="col">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {cart.length == 0 ? (
                    <>
                      <tr>
                        <td colSpan={6}>
                          <div class="alert alert-warning" role="alert">
                            Your cart is Currently empty.
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {cart.map(data => (
                        <tr>
                          <td>
                            <a
                              href="product-details.html"
                              className="tm-cart-productimage nav-link"
                            >
                              <img
                                src={`http://127.0.0.1:8000${data.product.image1}`}
                                alt="product image"
                              />
                            </a>
                          </td>
                          <td>
                          <Link
                              to={`/ProductDetail/${data.product.slug}`}
                              className="tm-cart-productname nav-link"
                            >
                              {data.product.name}

                            </Link>
                          </td>
                          <td className="tm-cart-price">
                            ${data.product.price}.00
                          </td>
                          <td>
                            <div className="tm-quantitybox">
                              <input type="text" defaultValue={1}
                                value={data.quantity}
                                readOnly />
                            </div>
                          </td>
                          <td>
                            <span className="tm-cart-totalprice">
                              ${data.product.price * data.quantity}.00
                            </span>
                          </td>
                          <td>
                            {/* {console.log("data : ",data.product.id)} */}
                            {/* <Link onClick={() => removeCart()}> */}
                            <button className="tm-cart-removeproduct" onClick={() => removeCart(data.product.id)}>
                              <i className="ion-close" />
                            </button>
                            {/* </Link> */}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="tm-cart-bottomarea">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="tm-buttongroup">
                    <butoon type="submit" href="#" className="tm-button">
                      Continue Shopping
                    </butoon>
                    <butoon type="submit" href="#" className="tm-button" onClick={() =>updateCart()}>
                      Update Cart
                    </butoon>
                  </div>
                  <form action="#" className="tm-cart-coupon">
                    <label htmlFor="coupon-field">Have a coupon code?</label>
                    <input
                      type="text"
                      id="coupon-field"
                      placeholder="Enter coupon code"
                      required="required"
                    />
                    <button type="submit" className="tm-button">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="tm-cart-pricebox">
                    <h2>Cart Totals</h2>
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr className="tm-cart-pricebox-subtotal">
                            <td>Cart Subtotal</td>
                            <td>${total}</td>
                          </tr>
                          <tr className="tm-cart-pricebox-shipping">
                            <td>(+) Shipping Charge</td>
                            <td>${total == 0 ? total : 15.00}</td>
                          </tr>
                          <tr className="tm-cart-pricebox-total">
                            <td>Total</td>
                            <td>${total == 0 ? total : total + 15.00}.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <butoon type="submit" href="#" className="tm-button">
                      Proceed To Checkout
                    </butoon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Cart
