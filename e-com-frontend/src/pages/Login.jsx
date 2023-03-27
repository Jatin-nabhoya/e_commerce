import { React,useState, useContext} from 'react'
// import Breadcrumb from '../assets/images/breadcrumb-bg.jpg'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';




const Login = () => {
  const navigate = useNavigate();
  
  const [redirect, setRedirect] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  let {loginUser} = useContext(AuthContext);

  const onSubmit = async (e) => {
    // e.preventDefault();
    const Data = JSON.stringify(e);
   
    loginUser(Data)
  
    setRedirect(true);

  }



  return (
    <div>
      <br />
      <br />
      <div className="tm-breadcrumb-area tm-padding-section bg-grey">

        <div className="container">
          <div className="tm-breadcrumb">
            <h2>Login</h2>
            <ul>
              <li>
              <Link to="/">
                Home</Link>
              </li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section tm-login-register-area bg-white tm-padding-section">
          <div className="container">
            <div className="row">

              <div className="col-lg-6">
                <form action="#" onSubmit={handleSubmit(onSubmit)} className="tm-form tm-login-form">
                  <h4>Login</h4>
                  <p>Become a part of our community!</p>
                  <div className="tm-form-inner">
                    <div className="tm-form-field">
                      <label htmlFor="login-email">
                        Username or email address*
                      </label>
                      <input type="text" id="login-email" 
                      // required="required"
                        {...register("username", {
                          required: {
                            value: true,
                            message: "You must specify your username before moving forward"
                        }, 
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "That's not a valid username where I come from..."
                        }
                        })}
                        onKeyUp={() => {
                          trigger("username");
                        }} 
                        />
                      {errors.username && (
                        <span className="text-danger" role="alert">
                          {errors.username.message}
                        </span>
                      )}
                      {/* <input type="email" id="login-email" 
                      // required="required"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("email");
                        }} 
                        />
                      {errors.email && (
                        <span className="text-danger" role="alert">
                          {errors.email.message}
                        </span>
                      )} */}
                    </div>
                    <div className="tm-form-field">
                      <label htmlFor="login-password">Password*</label>
                      <input
                        type="password"
                        id="login-password"
                        // required="required"
                        {...register("password", {
                          required: "password is required",
                          minLength: {
                            value: 5,
                            message: "min length is 5",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("password");
                        }}
                      />
                      {errors.password && (
                        <span className="text-danger" role="alert">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="tm-form-field">
                      <input
                        type="checkbox"
                        name="login-remember"
                        id="login-remember"
                      />
                      <label htmlFor="login-remember">Remember Me</label>
                      <p className="mb-0">
                        <a href="#">Forgot your password?</a>
                      </p>
                    </div>
                    <div className="tm-form-field">
                      <button type="submit" className="tm-button">Login</button>
                    </div>
                    <div className="tm-form-field">
                      <div className="tm-form-sociallogin">
                        <h6>Or, Login with :</h6>
                        <ul>
                          <li>
                            <a href="#" className="facebook-btn">
                              <i className="ion-social-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="google-btn">
                              <i className="ion-social-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Login;
