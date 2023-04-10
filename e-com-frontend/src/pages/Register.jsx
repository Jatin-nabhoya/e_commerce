import { React, useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
// import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  let {RegisterUser} = useContext(AuthContext);
  const onSubmit = (e) => {
    // e.preventDefault();
    const Data = JSON.stringify(e);
    // console.log(Data);
    // loginUser(Data)
    RegisterUser(Data);
    
  };





  return (
    <div>
      <br />
      <br />
      <div className="tm-breadcrumb-area tm-padding-section bg-grey">

        <div className="container">
          <div className="tm-breadcrumb">
            <h2>Register</h2>
            <ul>
              <li>
              <Link to="/">
                Home</Link>
              </li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      </div>
      <main className="page-content">
        <div className="tm-section tm-login-register-area bg-white tm-padding-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(onSubmit)} className="tm-form tm-register-form">
                  <h4>Create an account</h4>
                  <p>Welcome! Register for an account</p>
                  <div className="tm-form-inner">
                    <div className="tm-form-field">
                      <label htmlFor="register-username">Username</label>
                      <input
                        type="text"
                        id="register-username"
                        required="required"
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
                        <small className="text-danger">{errors.username.message}</small>
                      )}
                    </div>
                    <div className="tm-form-field">
                      <label htmlFor="register-email">Email address</label>
                      <input type="email" id="register-email" required="required"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("email");
                        }} />
                      {errors.email && (
                        <small className="text-danger">{errors.email.message}</small>
                      )}
                    </div>
                    <div className="tm-form-field">
                      <label htmlFor="register-password">Password</label>
                      <input
                        type="password"
                        id="register-password"
                        required="required"
                        name="password"
                            {...register("password",
                             {
                              required: "Password is Required",
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
                                message:
                                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                              },
                              minLength: {
                                value: 5,
                                message: "min length is 5",
                              }
                            })}
                        // onChange={(e) => validate(e.target.value)}
                        onKeyUp={() => {
                          trigger("password");
                        }}
                      />
                      {errors.password && (
                            <small className="text-danger">
                              {errors.password.message}
                            </small>
                          )}
                    </div>
                    <div className="tm-form-field">
                      <div>
                        <input
                          type="checkbox"
                          id="register-pass-show"
                          name="register-pass-show"

                        />
                        <label htmlFor="register-pass-show">Show Password</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="register-terms"
                          name="register-terms"
                          
                        />
                        <label htmlFor="register-terms">
                          I have read and agree to the website{" "}
                          <a href="#">terms and conditions</a>
                        </label>
                      </div>
                    </div>
                    <div className="tm-form-field">
                      
                      <button type="submit" className="tm-button">Register</button>
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

export default Register;
