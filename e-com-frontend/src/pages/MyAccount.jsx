import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const MyAccount = () => {
  let { user, logoutUser, authToken } = useContext(AuthContext);
  let [tab, setTab] = useState("Dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  });

  let [addresses, setAddresses] = useState([])

  useEffect(() => {
    getAddress()
  }, [])

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
      setAddresses(data)
      console.table(data[0])
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
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
            <h2>My Account</h2>
            <ul >
              <li>
                <Link to="/">
                  Home</Link>
              </li>
              <li>My Account</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section tm-my-account-area bg-white tm-padding-section">
          <div className="container">
            <div className="tm-myaccount">
              <ul className="nav tm-tabgroup" id="account" role="tablist">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${tab === "Dashboard" ? "active" : ""}`}
                    id="account-dashboard-tab"
                    data-toggle="tab"
                    to="#account-dashboard"
                    role="tab"
                    aria-controls="account-dashboard"
                    aria-selected="true"
                    onClick={() => setTab('Dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${tab === "Orders" ? "active " : ""}`}
                    id="account-orders-tab"
                    data-toggle="tab"
                    to="#account-orders"
                    role="tab"
                    aria-controls="account-orders"
                    aria-selected="false"
                    onClick={() => setTab('Orders')}
                  >
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${tab === "Address" ? "active" : ""}`}
                    id="account-address-tab"
                    data-toggle="tab"
                    to="#account-address"
                    role="tab"
                    aria-controls="account-address"
                    aria-selected="false"
                    onClick={() => setTab('Address')}
                  >
                    Address
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${tab === "AccountDetails" ? "active" : ""}`}
                    id="account-acdetails-tab"
                    data-toggle="tab"
                    href="#account-acdetails"
                    role="tab"
                    aria-controls="account-acdetails"
                    aria-selected="false"
                    onClick={() => setTab('AccountDetails')}
                  >
                    Account Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${tab === "logout" ? "active" : ""}`}
                    id="account-logout-tab"
                    to="/login"
                    role="tab"
                    onClick={logoutUser}
                    aria-controls="account-address"
                    aria-selected="false"
                  // onClick={()=> setTab('Logout')}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="account-ontent">

                {(()=>{

                
                if (tab === "Dashboard"){ return (<>
                  <div
                    className="tab-pane fade show active"
                    id="account-dashboard"
                    role="tabpanel"
                    aria-labelledby="account-dashboard-tab"
                  >
                    <div className="tm-myaccount-dashboard">
                      <p>
                        Hello {user && <b>{user.username}</b>} (not <b>{user.email}</b>?{" "}
                        <Link to="/login" onClick={logoutUser}>Log out</Link>)
                      </p>
                      <p>
                        From your account dashboard you can view your recent orders,
                        manage your shipping and billing addresses, and edit your
                        password and account details.
                      </p>
                      {/* <ul>
                        {addresses.map(data => (
                          <li>
                            {console.log(data)}
                            <ul>
                              <li key={data.id}>{data.street}</li>
                              <li key={data.id}>{data.city}</li>
                              <li key={data.id}>{data.state}</li>
                              <li key={data.id}>{data.zip_code}</li>
                            </ul>
                          </li>

                        ))}
                      </ul> */}

                    </div>
                  </div>
                </>) } 
                else if(tab === "Orders") { return (<>
                <br/><br/>
                  <div
                    className="tab-pane fade active"
                    id="account-orders"
                    role="tabpanel"
                    aria-labelledby="account-orders-tab"
                  >
                    <div className="tm-myaccount-orders">
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th className="tm-myaccount-orders-col-id">ORDER ID</th>
                              <th className="tm-myaccount-orders-col-date">DATE</th>
                              <th className="tm-myaccount-orders-col-status">
                                STATUS
                              </th>
                              <th className="tm-myaccount-orders-col-total">TOTAL</th>
                              <th className="tm-myaccount-orders-col-view">VIEW</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>#12345</td>
                              <td>30 December 2018</td>
                              <td>On Hold</td>
                              <td>$132.00 for 2 items</td>
                              <td>
                                <a href="#" className="tm-button tm-button-small">
                                  View
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>#12346</td>
                              <td>30 December 2018</td>
                              <td>On Hold</td>
                              <td>$220.00 for 3 items</td>
                              <td>
                                <a href="#" className="tm-button tm-button-small">
                                  View
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </>) } 
                else if(tab === "Address") { return (<>
                  <div
                    className="tab-pane fade active"
                    id="account-address"
                    role="tabpanel"
                    aria-labelledby="account-address-tab"
                  >
                    <div className="tm-myaccount-address">
                      <p>
                        <b>
                          The following addresses will be used on the checkout page by
                          default.
                        </b>
                      </p>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="tm-myaccount-address-billing">
                            {/* <a href="#" className="edit-button">
                              Edit
                            </a> */}
                            <h3>Billing Address</h3>
                            {addresses.map(data => (
                          
                            <address>
                              {user.username} 
                              <br />
                              {data.street},
                              <br />
                              {data.city} ,<br />
                              {data.state} <br />
                              {data.zip_code}
                            </address>

                        ))}
                            {/* <address>
                              Jonathon Doe
                              <br />
                              Example company
                              <br />
                              516 Wintheiser Circles <br />
                              Lake Jordanmouth <br />
                              Jordan
                            </address> */}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mt-30 mt-md-0">
                          <div className="tm-myaccount-address-shipping">
                            {/* <a href="#" className="edit-button">
                              Edit
                            </a> */}
                            <h3>Shipping Address</h3>
                            {addresses.map(data => (
                          
                          <address>
                            {user.username} 
                            <br />
                            {data.street},
                            <br />
                            {data.city} ,<br />
                            {data.state} <br />
                            {data.zip_code}
                          </address>

                      ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>)} else {return (<>
                  <div
                    className="tab-pane fade active"
                    id="account-acdetails"
                    role="tabpanel"
                    aria-labelledby="account-acdetails-tab"
                  >
                    <div className="tm-myaccount-acdetails">
                      <form action="#" className="tm-form tm-form-bordered">
                        <h4>Account Details</h4>
                        <div className="tm-form-inner">
                          <div className="tm-form-field tm-form-fieldhalf">
                            <label htmlFor="acdetails-firstname">First name</label>
                            <input type="text" id="acdetails-firstname" />
                          </div>
                          <div className="tm-form-field tm-form-fieldhalf">
                            <label htmlFor="acdetails-lastname">Last name</label>
                            <input type="text" id="acdetails-lastname" />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="acdetails-displayname">
                              Dispaly name
                            </label>
                            <input type="text" id="acdetails-displayname" />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="acdetails-email">Email address</label>
                            <input type="email" id="acdetails-email" />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="acdetails-password">Old password</label>
                            <input type="password" id="acdetails-password" />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="acdetails-newpassword">
                              New password
                            </label>
                            <input type="password" id="acdetails-newpassword" />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="acdetails-confirmpass">
                              Confirm password
                            </label>
                            <input type="password" id="acdetails-confirmpass" />
                          </div>
                          <div className="tm-form-field">
                            <input
                              type="checkbox"
                              name="acdetails-agreeterms"
                              id="acdetails-agreeterms"
                            />
                            <label htmlFor="acdetails-agreeterms">
                              I have read and agree to the Privacy Policy
                            </label>
                          </div>
                          <div className="tm-form-field">
                            <button type="submit" className="tm-button">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>)}
})()}



              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
export default MyAccount;
