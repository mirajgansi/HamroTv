import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; // Optional: Add CSS for styling

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an async call
    setTimeout(() => {
      setLoading(false);
      setMessage('If this email is registered, you will receive a password reset link shortly.');
    }, 1000);
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>Enter your email address to receive a password reset link.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {loading ? (
          <button type="submit" disabled>Sending...</button>
        ) : (
          <button type="submit">Send Reset Link</button>
        )}
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
