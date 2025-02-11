import React, { useState, useRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Setting.css";
import api from "../Script/api"; // Make sure this is set up correctly for your API requests
import ProfilePictureUpload from "./ProfilePictureUpload";
import { FaCamera, FaEdit } from "react-icons/fa";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx"; 
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const SettingsPage = () => {
  // State for user profile
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Access the profile picture state and setter from context
  const { profilePicture, setProfilePicture } = useContext(ProfilePictureContext);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Handle form submission for general settings
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send email and notifications update to backend
    const updatedUserData = {
      name,
      email,
      notifications,
    };

    axios.put("/api/user/settings", updatedUserData) // Adjust the URL based on your backend
      .then(response => {
        console.log("Settings saved:", response.data);
        // You can provide feedback to the user if needed
      })
      .catch(error => {
        console.error("Error saving settings:", error);
        alert("Failed to save settings");
      });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    // Send password change request to backend
    const passwordData = {
      currentPassword,
      newPassword,
    };

    axios.post("/api/user/change-password", passwordData) // Adjust the URL based on your backend
      .then(response => {
        console.log("Password changed:", response.data);
        // Provide feedback to the user
      })
      .catch(error => {
        console.error("Error changing password:", error);
        alert("Failed to change password");
      });
  };

  // Handle profile picture upload
  const handleSaveProfilePicture = (croppedImage) => {
    setProfilePicture(croppedImage); // Update the global profile picture state

    // Send the new profile picture to the backend
    const formData = new FormData();
    formData.append("profilePicture", croppedImage); // Append the image file
    axios.post("/api/user/upload-profile-picture", formData) // Adjust the URL based on your backend
      .then(response => {
        console.log("Profile picture updated:", response.data);
        // Provide feedback to the user if needed
      })
      .catch(error => {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture");
      });
  };

  // Handle name editing
  const handleRename = () => {
    if (isEditing) {
      setName(newName); // Update the name
      setIsEditing(false);
    } else {
      setNewName(name); // Set the new name input to the current name
      setIsEditing(true);
    }
  };

  return (
    <div className="settings-container">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-picture-container">
          <input
            id="profile-picture-input"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
          />
          <ProfilePictureUpload onSave={handleSaveProfilePicture} />
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
            <h2>{name}</h2>
          )}
          <button onClick={handleRename} className="btn btn-outline-primary btn-sm" required>
            {isEditing ? "Save" : <><FaEdit /> Rename </>}
          </button>
        </div>
        <p>{email}</p>
      </div>

      {/* Preferences Section */}
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

        {/* Change Password Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Change Password</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handlePasswordChange} className="btn btn-secondary">
              Change Password
            </button>
          </div>
        </div>

        {/* Save Settings Button */}
        <Link to="/Main">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SettingsPage;
