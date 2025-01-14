import React, { useState, useEffect, useRef } from "react";
import "../styles/SignUp.css"; 

import usernameIcon from "../icons/username.png";
import emailIcon from "../icons/email.png";
import passwordIcon from "../icons/password.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [clickedUsername, setClickedUsername] = useState(false);
  const [clickedEmail, setClickedEmail] = useState(false);
  const [clickedPassword, setClickedPassword] = useState(false);
  const [clickedConfirmPassword, setClickedConfirmPassword] = useState(false);

  // Refs for accessing the input and its group
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Focus and blur event handlers
  useEffect(() => {
    const handleFocus = (inputRef) => {
      inputRef.current.parentElement.classList.add("focused");
    };

    const handleBlur = (inputRef) => {
      if (inputRef.current.value === "") {
        inputRef.current.parentElement.classList.remove("focused");
      }
    };

    // Set up focus and blur events for each input field
    const usernameInput = usernameRef.current;
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    const confirmPasswordInput = confirmPasswordRef.current;

    usernameInput.addEventListener("focus", () => handleFocus(usernameRef));
    usernameInput.addEventListener("blur", () => handleBlur(usernameRef));

    emailInput.addEventListener("focus", () => handleFocus(emailRef));
    emailInput.addEventListener("blur", () => handleBlur(emailRef));

    passwordInput.addEventListener("focus", () => handleFocus(passwordRef));
    passwordInput.addEventListener("blur", () => handleBlur(passwordRef));

    confirmPasswordInput.addEventListener("focus", () => handleFocus(confirmPasswordRef));
    confirmPasswordInput.addEventListener("blur", () => handleBlur(confirmPasswordRef));

    // Clean up event listeners on component unmount
    return () => {
      usernameInput.removeEventListener("focus", () => handleFocus(usernameRef));
      usernameInput.removeEventListener("blur", () => handleBlur(usernameRef));

      emailInput.removeEventListener("focus", () => handleFocus(emailRef));
      emailInput.removeEventListener("blur", () => handleBlur(emailRef));

      passwordInput.removeEventListener("focus", () => handleFocus(passwordRef));
      passwordInput.removeEventListener("blur", () => handleBlur(passwordRef));

      confirmPasswordInput.removeEventListener("focus", () => handleFocus(confirmPasswordRef));
      confirmPasswordInput.removeEventListener("blur", () => handleBlur(confirmPasswordRef));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password and confirm password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle form submission logic here
    console.log("Form submitted", { username, email, password, confirmPassword });
  };

  return (
    <div className="signup-container">
      <div className="logo">
        {/* Logo goes here */}
      </div>
      <div className="form-wrapper">
        <div className="profile">
          <h1>Welcome <span className="highlight"> <br />to the family! Begin your journey with us <br /> by signing up</span></h1>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div 
            className={`input-group ${clickedUsername || username ? "focused" : ""}`}
            onClick={() => setClickedUsername(true)}
          >
            <img src={usernameIcon} alt="Username Icon" className="input-icon" />
            <input 
              ref={usernameRef}
              type="text" 
              placeholder=" " 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <label>Username</label>
          </div>

          <div 
            className={`input-group ${clickedEmail || email ? "focused" : ""}`}
            onClick={() => setClickedEmail(true)}
          >
            <img src={emailIcon} alt="Email Icon" className="input-icon" />
            <input 
              ref={emailRef}
              type="email" 
              placeholder=" " 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <label>Email</label>
          </div>

          <div 
            className={`input-group ${clickedPassword || password ? "focused" : ""}`}
            onClick={() => setClickedPassword(true)}
          >
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
            <input
              ref={passwordRef}
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
            />
            <label>Create Password</label>
          </div>

          <div 
            className={`input-group ${clickedConfirmPassword || confirmPassword ? "focused" : ""}`}
            onClick={() => setClickedConfirmPassword(true)}
          >
            <img src={passwordIcon} alt="Confirm Password Icon" className="input-icon" />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;