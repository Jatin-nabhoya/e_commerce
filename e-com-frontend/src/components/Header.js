import { React, useEffect, useContext ,useState} from 'react'
import { Link } from 'react-router-dom'
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import '../assets/css/style.css'
import AuthContext from '../context/AuthContext';

import Logo from '../assets/images/logo.png'

const Header = () => {

  let { user,logoutUser, authToken} = useContext(AuthContext);

  let [wishList, setWishList] = useState(null)
  let [cart, setCart] = useState(null)

  useEffect(() => {
    getwishlist()
    getCartItem()
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
    console.log(data)
    if (response.status === 200) {
      console.log(data)
      setWishList(data.length)
    } else if (response.statusText === 'Unauthorized') {
      setWishList(0)
  }
}

let getCartItem = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/cart/", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + String(authToken.access)
    }
  })
  let data = await response.json()
  if (response.status === 200) {
    setCart(data.cart_items.length)
  } else if (response.statusText === 'Unauthorized') {
    setCart(0)
}
}




  $(function () {
    $(".tm-dropdown > button").on("click", function () {
      $(this).siblings("ul").slideToggle().

        $(this)
        .parent(".tm-dropdown")
        .siblings(".tm-dropdown")
        .children("ul")
        .slideUp();
    });
    // //   $(".tm-header-nav").meanmenu({
    // //     meanMenuContainer: ".tm-mobilenav",
    // //     meanScreenWidth: "991",
    // //     meanMenuOpen: '<i className="ion-android-menu"></i>',
    // //     meanMenuClose: '<i className="ion-android-close"></i>',
    // //   });
    // // });
    // // $(function () {
    // //   $(".tm-header-nav").meanmenu({
    // //     meanMenuContainer: ".tm-mobilenav",
    // //     meanScreenWidth: "991",
    // //     meanMenuOpen: '<i className="ion-android-menu"></i>',
    // //     meanMenuClose: '<i className="ion-android-close"></i>',
    // //   });
  });


  return (
    <div>

      <div id="wrapper" className="wrapper">
        <div className="tm-header tm-header-sticky">


          <div className="tm-header-toparea bg-black">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-8 col-12">
                  <ul className="tm-header-info">
                    <li>Welcome to Jtsy Online jewellery Store !</li>
                  </ul>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="tm-header-options">
                    <div className="tm-dropdown tm-header-links">
                      <button className="tm-dropdown tm-header-links">My Account</button>
                      
                      <ul className="tg">
                        <li><Link className="nav-link" to="/cart">Shopping Cart</Link></li>
                        <li><Link className="nav-link" to="/wishlist">Wishlist</Link></li>
                        <li><Link className="nav-link" to="/checkout">Checkout</Link></li>

                        <li><Link className="nav-link" to="/myaccount">My Account</Link></li>

                        {user==null ? ( <>
                          <li><Link className="nav-link" to="/login">Login</Link></li>
                          <li><Link className="nav-link" to="/register">Register</Link></li>
                          </>
                        ) : (
                          <>
                          <li><Link className="nav-link" to="/" onClick={logoutUser}>Logout</Link></li>
                          </>
                        )}
                      </ul>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="tm-header-middlearea bg-white">
            <div className="container">
              <div className="tm-mobilenav"></div>
              <div className="row align-items-center">
                <div className="col-lg-3 col-6 order-1 order-lg-1">
                  <Link to="/" className="tm-header-logo">
                    <img src={Logo} alt="surose" />
                  </Link>
                </div>
                <div className="col-lg-6 col-12 order-3 order-lg-2">
                  <form className="tm-header-search">
                    <input type="text" placeholder="Search product..." />
                    <button><i className="ion-android-search"></i></button>
                  </form>
                </div>
                <div className="col-lg-3 col-6 order-2 order-lg-3">
                  <ul className="tm-header-icons">
                    <li><Link to="/wishlist"><i className="ion-android-favorite-outline"></i><span>{user ? wishList : 0}</span></Link></li>
                    <li><Link to="/cart"><i className="ion-bag"></i><span>{user ? cart : 0}</span></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="tm-header-bottomarea bg-white">
            <div className="container">
              <nav className="tm-header-nav">
                <ul>
                  <li><Link className="nav-link" to="/">Home</Link></li>
                  <li><Link className="nav-link" to="/about">About</Link></li>
                  <li className="tm-header-nav-dropdown"><Link className="nav-link" to="/products">Shop</Link>
                    <ul>
                      <li><Link to="/products/Engagement Rings" className="nav-link" >Engagement Rings </Link></li>
                      <li><Link to="/products/Wedding Bands" className="nav-link">Wedding Bands</Link></li>
                      <li><Link to="/products/Earrings" className="nav-link">Earrings</Link></li>
                      <li><Link to="/products/Fine Jewelry" className="nav-link">Fine Jewelry</Link></li>
                      <li><Link to="/products/Loose Moissanite" className="nav-link">Loose Moissanite</Link></li>
                    </ul>
                  </li>
                  <li><Link className="nav-link" to="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Header;
