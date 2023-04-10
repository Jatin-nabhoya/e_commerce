
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const Checkout = () => {

  // let {user} = useContext(AuthContext);
  // const navigate = useNavigate();
  let { user, logoutUser, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
      if(!user){
        return navigate('/login');
      }
  });


  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  });

  let [cart, setCart] = useState([])
  let [total, setTotel] = useState([])

  useEffect(() => {
    getCart()
    getAddress()
  }, [user])

  let getCart = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/cart/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if (response.status === 200) {
      setCart(data.cart_items)
      // console.log(data)
      console.log(data.cart_items.length)
      setTotel(data.subtotal)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  let [addresses, setAddresses] = useState([])
  let getAddress = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/address/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if (response.status === 200) {
      setAddresses(data[0])
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }
  console.table(addresses)

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
            <h2>Checkout</h2>
            <ul>
              <li>
              <Link to="/">
                Home</Link>
              </li>
              <li>
                <link to="/products" />
                Shop
              </li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section tm-checkout-area bg-white tm-padding-section">
          <div className="container">
            <div className="tm-checkout-coupon">
              <a href="#checkout-couponform" data-toggle="collapse"><span>Have a coupon code?</span> Click
                here and enter your code.</a>
              <div id="checkout-couponform" class="collapse">
                <form action="#" class="tm-checkout-couponform">
                  <input type="text" id="coupon-field" placeholder="Enter coupon code"
                    required="required" />
                  <button type="submit" class="tm-button">Submit</button>
                </form>
              </div>
            </div>
            <form action="#" className="tm-form tm-checkout-form">
              <div className="row">
                <div className="col-lg-6">
                  <h4 className="small-title">BILLING INFORMATION</h4>
                  {/* Billing Form */}
                  <div className="tm-checkout-billingform">
                    <div className="tm-form-inner">
                      <div className="tm-form-field tm-form-fieldhalf">
                        <label htmlFor="billingform-firstname">First name*</label>
                        <input type="text" id="billingform-firstname" value={user.username}/>
                      </div>
                      <div className="tm-form-field tm-form-fieldhalf">
                        <label htmlFor="billingform-lastname">Last name (Optional)</label>
                        <input type="text" id="billingform-lastname" />
                      </div>
                      <div className="tm-form-field">
                        <label htmlFor="billingform-companyname">
                          Company name (Optional)
                        </label>
                        <input type="text" id="billingform-companyname" />
                      </div>
                      <div className="tm-form-field">
                        <label htmlFor="billingform-email">Email address*</label>
                        <input type="email" id="billingform-email" value={user.email} />
                      </div>
                      <div className="tm-form-field">
                        <label htmlFor="billingform-phone">Phone (Optional)</label>
                        <input type="text" id="billingform-phone" />
                      </div>
                      <div className="tm-form-field">
                        <label htmlFor="billingform-country">Country</label>
                        <select name="billingform-country" id="billingform-country">
                          <option value="bangladesh">United States</option>
                          <option value="bangladesh">India</option>
                          <option value="bangladesh">Australia</option>
                          <option value="bangladesh">Germany</option>
                          <option value="bangladesh">Sweden</option>
                          <option value="bangladesh">France</option>
                        </select>
                      </div>
                      <div className="tm-form-field">
                        <label htmlFor="billingform-address">Address*</label>
                        <input
                          type="text"
                          id="billingform-address"
                          placeholder="Apartment, Street Address"
                          value={addresses.street}
                        />
                      </div>
                      <div className="tm-form-field tm-form-fieldhalf">
                        <label htmlFor="billingform-streetaddress">State*</label>
                        <input type="text" id="billingform-streetaddress" value={addresses.state} />
                      </div>
                      <div className="tm-form-field tm-form-fieldhalf">
                        <label htmlFor="billingform-zipcode">Zip / Postcode</label>
                        <input type="text" id="billingform-zipcode" value={addresses.zip_code} />
                      </div>
                      {/* <div className="tm-form-field">
                        <input
                          type="checkbox"
                          name="billform-dirrentswitch"
                          id="billform-dirrentswitch"
                        />
                        <label htmlFor="billform-dirrentswitch">
                          <b>Ship to another address</b>
                        </label>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tm-checkout-orderinfo">
                    <div className="table-responsive">
                      <table className="table table-borderless tm-checkout-ordertable">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                        {cart.map(data => (<>
                          <tr>
                            <td>{data.product.name} * {data.quantity}</td>
                            <td>${data.product.price * data.quantity}.00</td>
                          </tr>
                          
                        </>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="tm-checkout-subtotal">
                            <td>Cart Subtotal</td>
                            <td>${total}.00</td>
                          </tr>
                          <tr className="tm-checkout-shipping">
                            <td>(+) Shipping Charge</td>
                            <td>${total == 0 ? total : 15.00}</td>
                          </tr>
                          <tr className="tm-checkout-total">
                            <td>Total</td>
                            <td>${total == 0 ? total : total + 15.00}.00</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="tm-checkout-payment">
                      <h4>Select Payment Method</h4>
                      <div className="tm-form-inner">
                        <div className="tm-form-field">
                          <input
                            type="radio"
                            name="checkout-payment-method"
                            id="checkout-payment-banktransfer"
                          />
                          <label htmlFor="checkout-payment-banktransfer">
                            Direct Bank Transfer
                          </label>
                          <div className="tm-checkout-payment-content">
                            <p>Make your payment directly into our bank account.</p>
                          </div>
                        </div>
                        <div className="tm-form-field">
                          <input
                            type="radio"
                            name="checkout-payment-method"
                            id="checkout-payment-checkpayment"
                            defaultChecked="checked"
                          />
                          <label htmlFor="checkout-payment-checkpayment">
                            Check Payments
                          </label>
                          <div className="tm-checkout-payment-content">
                            <p>
                              Please send a check to Store Name, Store Street, Store
                              Town, Store State / County, Store Postcode.
                            </p>
                          </div>
                        </div>
                        <div className="tm-form-field">
                          <input
                            type="radio"
                            name="checkout-payment-method"
                            id="checkout-payment-cashondelivery"
                          />
                          <label htmlFor="checkout-payment-cashondelivery">
                            Cash On Delivery
                          </label>
                          <div className="tm-checkout-payment-content">
                            <p>Pay with cash upon delivery.</p>
                          </div>
                        </div>
                        <div className="tm-form-field">
                          <input
                            type="radio"
                            name="checkout-payment-method"
                            id="checkout-payment-paypal"
                          />
                          <label htmlFor="checkout-payment-paypal">PayPal</label>
                          <div className="tm-checkout-payment-content">
                            <p>Pay via PayPal.</p>
                          </div>
                        </div>
                        <div className="tm-form-field">
                          <input
                            type="radio"
                            name="checkout-payment-method"
                            id="checkout-payment-creditcard"
                          />
                          <label htmlFor="checkout-payment-creditcard">
                            Credit Card
                          </label>
                          <div className="tm-checkout-payment-content">
                            <p>Pay with your credit card via Stripe.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tm-checkout-submit">
                      <p>
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our privacy policy.
                      </p>
                      <div className="tm-form-inner">
                        <div className="tm-form-field">
                          <input
                            type="checkbox"
                            name="checkout-read-terms"
                            id="checkout-read-terms"
                          />
                          <label htmlFor="checkout-read-terms">
                            I have read and agree to the website terms and
                            conditions
                          </label>
                        </div>
                        <div className="tm-form-field">
                          <button type="submit" className="tm-button ml-auto">
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Checkout;
