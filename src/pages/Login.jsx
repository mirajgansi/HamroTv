import React, { useEffect, useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const posters = [
    { id: 1, src: require("../assets/avatar.jpg"), alt: "Avatar movie poster" },
    { id: 2, src: require("../assets/american.jpg"), alt: "American Psycho movie poster" },
    { id: 3, src: require("../assets/TheGood.jpg"), alt: "The Good, The Bad, The Ugly movie poster" },

  ];

  // Loop through items automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [posters.length]);

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
              <img src={require("../icons/email.png")} alt="" className="input-icon" />
              <input type="text" id="username" name="username" placeholder=" " required />
              <label>Email</label>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <img src={require("../icons/password.png")} alt="" className="input-icon" />
              <input type="password" id="password" name="password" placeholder=" " required />
              <label>Password</label>
            </div>

            <button type="submit" className="login-btn">Next</button>
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
            <div>
              <span className="new-user">Create Account</span>
            </div>
          </div>
        </div>
      </main>

      {/* Slide Show */}
      <div className="carousel-container">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${currentIndex * (300 + 40)}px)`, // 300px width + 40px margin
            transition: "transform 1s ease-in-out",
          }}
        >
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              className={`carousel-item ${
                index === currentIndex ? "center" : ""
              }`}
            >
              <img src={poster.src} alt={poster.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
