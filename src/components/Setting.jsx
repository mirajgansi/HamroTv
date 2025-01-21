import React, { useState } from 'react';
import "../styles/Setting.css";

const SettingsPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    // Handle changes
    const handleNameChange = (e) => setName(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];
      if (file) setProfilePicture(URL.createObjectURL(file));
    };
  
    // Handle Delete Account
    const handleDeleteAccount = () => {
      setShowConfirmationModal(true); // Show confirmation modal
    };
  
    const confirmDeletion = () => {
      console.log("Account deleted with email:", email, "and password:", confirmPassword);
      setShowConfirmationModal(false); 
      setDeleteAccount(true); 
    };
  
    return (
      <div className="settings-page">
        <h2>Settings</h2>
  
        {/* Rename */}
        <div className="setting-item">
          <label>Rename Your Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter new name"
          />
        </div>
  
        {/* Change Password */}
        <div className="setting-item">
          <label>Change Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter old password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
          />
        </div>
  
        {/* Change Profile Picture */}
        <div className="setting-item">
          <label>Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {profilePicture && (
            <div>
              <img src={profilePicture} alt="Profile" width={100} height={100} />
            </div>
          )}
        </div>
  
        {/* Delete Account */}
        <div className="setting-item">
          <button onClick={handleDeleteAccount} className="delete-btn">
            {deleteAccount ? "Account Deleted" : "Delete Account"}
          </button>
        </div>
  
        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Are you sure you want to delete your account?</h3>
              <div className="modal-inputs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="modal-actions">
                <button onClick={confirmDeletion}>Yes, Delete My Account</button>
                <button onClick={() => setShowConfirmationModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
  
      </div>
    );
  };
  
  export default SettingsPage;