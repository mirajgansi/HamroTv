import React from 'react';
import '../styles/Login.css';


const Login = () => {
  const posters = [
    { id: 1, src: require('../assets/avatar.jpg'), alt: 'Avatar movie poster' },
    { id: 2, src: require('../assets/american.jpg'), alt: 'American Psycho movie poster' },
    { id: 3, src: require('../assets/TheGood.jpg'), alt: 'The Good, The Bad, The Ugly movie poster' },
  ];

  return (
    <div className="container">
      <div className="Logo">
        <img src={require('../icons/logo.png')} alt="HamroTv Logo" />
      </div>

      <main>
        <div className="login-container">
          <h1>Welcome</h1>
          <h2>We are glad to see you back with us</h2>
          <form action="/api/login" method="post">
            <div className="input-group">
              <img src={require("../icons/email.png")} alt="" className="input-icon" />
              <input type="text" id="username" name="username" placeholder="Email" required />
            </div>
            <div className="input-group">
              <img src={require("../icons/password.png")} alt="" className="input-icon" />
              <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="login-btn">Next</button>
          </form>
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
          <div><span className="new-user">Create Account</span>
          </div>
          </div>
        </div>
      </main>

      <div className="movies">
        {posters.map((poster, index) => (
          <div
            key={poster.id}
            className="poster-wrapper"
            style={{
              left: `${index * 120}px`,
              transform: `rotate(${-10 + index * 10}deg)`,
              zIndex: index,
            }}
          >
            <img
              src={poster.src}
              alt={poster.alt}
              className="movie-poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
