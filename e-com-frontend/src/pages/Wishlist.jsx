import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import axios from 'axios';


const Wishlist = () => {
  // let {user} = useContext(AuthContext);
  let { user, logoutUser, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/login');
    }
  });



  // const handleRemove = async () => {
  //   await axios.delete(`/api/wishlistitems/${item.id}/`);
  //   onRemove(item);
  // };


  let [wishList, setWishList] = useState([])

  useEffect(() => {
    getwishlist()
  }, [user])

  let getwishlist = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if (response.status === 200) {
      setWishList(data)
      console.log(data)

    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  let removeCart = async (pid) =>{

    const Data = JSON.stringify({user: user.id, product:pid});
    console.log(Data)
    let response = await fetch(`http://127.0.0.1:8000/api/wishlist/${pid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      },
      body: Data
    }).then(()=>{getwishlist()})
     let data = await response.json()
        console.log(data)
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
            <h2>Wishlist</h2>
            <ul>
              <li>
                <Link to="/">
                  Home</Link>
              </li>
              <li>
                <Link to="/products" >
                  Shop</Link>
              </li>
              <li>Wishlist</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section wishlist-area bg-white tm-padding-section">
          <div className="container">
            {/* Wishlist Table */}
            <div className="tm-wishlist-table table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th className="tm-wishlist-col-image" scope="col">
                      Image
                    </th>
                    <th className="tm-wishlist-col-productname" scope="col">
                      Product
                    </th>
                    <th className="tm-wishlist-col-price" scope="col">
                      Price
                    </th>
                    {/* <th className="tm-wishlist-col-quantity" scope="col">
                        Quantity
                      </th> */}
                    <th className="tm-wishlist-col-addcart" scope="col">
                      Add to Cart
                    </th>
                    <th className="tm-wishlist-col-remove" scope="col">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishList.length == 0 ? (
                    <>
                      <tr>
                        <td colSpan={6}>
                          <div class="alert alert-warning" role="alert">
                            There Are No Items In Your Wishlist
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {wishList.map(data => (
                        <tr>
                          <td>
                            <Link
                              to="/ProductDetail"
                              className="tm-wishlist-productimage nav-link"
                            >
                              <img
                                src={data.product.image1}
                                alt="product image"
                              />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/ProductDetail/${data.product.slug}`}
                              className="tm-cart-productname nav-link"
                            >
                              {data.product.name}

                            </Link>
                          </td>
                          <td className="tm-wishlist-price">${data.product.price}.99</td>
                          {/* <td>
                        <div className="tm-quantitybox">
                          <input type="text" defaultValue={1} />
                        </div>
                      </td> */}
                          <td>
                            <butoon type="submit" href="#" className="tm-button tm-button-small">
                              Add to Cart
                            </butoon>
                          </td>
                          <td>
                            <button className="tm-wishlist-removeproduct" onClick={() => removeCart(data.product.id)}>
                              <i className="ion-close" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      </>
                  )}
                    </tbody>
              </table>
            </div>
            {/*// Wishlist Table */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Wishlist;
