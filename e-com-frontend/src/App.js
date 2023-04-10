import { react, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// import s from "jquery";
// import "jquery-ui-dist/jquery-ui";


import './App.css';
import './assets/css/style.css';
import './assets/css/vendors/plugins.min.css'


import Footer from './components/Footer';
import Header from './components/Header';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

// import PrivateRoute from './utils/PrivateRoute';

import AuthContext from './context/AuthContext';
import {AuthProvider} from './context/AuthContext';
import ProductsCategory from './pages/ProductsCategory';



function App() {
  // let {user} = useContext(AuthContext)
  // let navigate = useNavigate();

  return (
    <div >
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} exct />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductsCategory />} />
            <Route path="/ProductDetail/:slug" element={<ProductDetail />} />
            <Route path="/myaccount" element={<MyAccount />} ></Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>


      {/* <Router>
        <AuthProvider>

        <Header/>
        <Routes>
        <Route element={<Home />} path="/"  exct />
        <Route element={<Login/>} path="/login"  />
        <Route path="/myaccount" element={<MyAccount />} />
        <PrivateRoute exact path="/myaccount" component={MyAccount} />
        <Route component={MyAccount} path="/myaccount" >{!auth ? <Navigate to='/login' /> : ''}</Route>
        </Routes>
        <Footer/>
        </AuthProvider>
      </Router> */}
    </div >

  );
}

export default App;
