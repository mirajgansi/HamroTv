import React from "react";
import "../styles/Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faEnvelope  } from "@fortawesome/free-solid-svg-icons";
import { Link} from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      {/* Logo Section */}
      <div className="Logo">
        <img src={require("../icons/logo.png")} alt="HamroTv Logo" />
      </div>

      {/* Main Login Form */}
      <main>
        <div className="login-container">
          <h1>Welcome</h1>
          <h2>We are glad to see you back with us</h2>
          <form action="/api/login" method="post">
            {/* Username Field */}
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope }  className="input-login-icon" />
              <input type="text" id="username" name="username" placeholder=" " required />
              <label>Email</label>
            </div>

            {/* Password Field */}
            <div className="input-group">
             <FontAwesomeIcon icon={faLock} alt="" className="input-login-icon" />
              <input type="password" id="password" name="password" placeholder=" " required />
              <label>Password</label>
              
            </div>
            <Link to="/home-page">
            <button type="submit" className="login-btn">Next</button>
            </Link>
            
            <div className="new-user">
           <Link to="/forgot-password">Forgot Password?</Link>
           </div>
            
            
          </form>
         
          {/* Alternative Login */}
          <div className="alternative-login">
            <div className="divider">
              <span className="line"></span>
              <span>Login with Others</span>
              <span className="line"></span>
            </div>
            <button type="button" className="google-btn">
              <img src={require("../icons/google.png")} alt="Google logo" className="google-logo" />
              Login with Google
            </button>
            
              <span className="new-user" >
              <Link to="/signup">Create Account</Link></span>

          </div>
        </div>
      </main>

    
      </div>
   
  );
};

export default Login;
