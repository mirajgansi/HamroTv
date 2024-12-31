import React from "react";
import "../styles/Global.css"; // Ensure this path is correct
import usernameIcon from "../icons/username.png"; // Import the image directly

const Signup = () => {
  return (
    <main>
      <div className="he">
        <div className="input-group">
          <img src={usernameIcon} alt="Username Icon" className="input-icon" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
        </div>
      </div>
    </main>
  );
};

export default Signup;
