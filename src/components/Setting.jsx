import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Setting.css";
import { FaCamera, FaEdit } from "react-icons/fa";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { profilePicture, setProfilePicture } = useContext(ProfilePictureContext);

 // SettingsPage.js
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const username = localStorage.getItem('currentUsername');
      console.log('Phase 1 - Retrieved username:', username);

      if (!username || username === 'undefined') {
        console.error('No username found in localStorage');
        setError('No user logged in');
        return;
      }

      console.log('Phase 2 - Making API call for:', username);
      const response = await axios.get(`http://localhost:5000/users/${username}`);
      
      console.log('Phase 3 - API Response:', response.data);
      if (!response.data?.username) {
        throw new Error('Invalid user data');
      }

      setUser(response.data);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError(err.response?.data?.error || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  const handleRename = () => {
    if (isEditing) {
      setUser(prev => ({ ...prev, username: newName }));
      setIsEditing(false);
    } else {
      setNewName(user?.username || "");
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, {
        username: user.username,
        email: user.email
      });
      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save settings");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/users/${user.id}/password`, {
        newPassword
      });
      console.log("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change error:", error);
      alert("Failed to change password");
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="profile-section">
        <div className="profile-picture-container">
          <input 
            id="profile-picture-input" 
            type="file" 
            style={{ display: "none" }} 
            accept="image/*" 
          />
          <label htmlFor="profile-picture-input">
            <FaCamera className="camera-icon" />
            <img 
              src={profilePicture} 
              alt="Profile" 
              className="profile-picture"
            />
          </label>
        </div>
        <div className="profile-info">
          {isEditing ? (
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className="form-control mb-2" 
            />
          ) : (
            <h2>{user?.username}</h2>
          )}
          <button onClick={handleRename} className="btn btn-outline-primary btn-sm">
            {isEditing ? "Save" : <><FaEdit /> Rename</>}
          </button>
        </div>
        <p>{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h2 className="settings-section-title">Preferences</h2>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="notifications">
              Enable Notifications
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">Change Password</h2>
          <div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button 
              type="button" 
              onClick={handlePasswordChange} 
              className="btn btn-secondary"
            >
              Change Password
            </button>
          </div>
        </div>

        <Link to="/Main" className="d-block mt-4">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SettingsPage;