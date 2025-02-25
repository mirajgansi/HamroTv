import React, { useState, useEffect, useContext } from "react";
import { FaCamera, FaEdit, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; // Added FaArrowLeft
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import peterImage from "../assets/peter.png";
import axios from "axios";
import { getUserByEmail, updateUser, updateProfilePicture } from "../Script/api";
import "../styles/Setting.css";
import { useNavigate } from "react-router-dom"; // Added for navigation

// Custom Modal Component
const CustomModal = ({ show, onHide, onConfirm, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* Empty header as per your latest version */}
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="modal-cancel-button" onClick={onHide}>
              Cancel
            </button>
            <button className="modal-delete-button" onClick={onConfirm}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const { profilePicture, setProfilePicture } = useContext(ProfilePictureContext);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("currentEmail");
        console.log("Fetching user with email:", email);
        if (!email || email === "undefined") {
          setError("No user logged in");
          return;
        }
        const response = await axios.get(`http://localhost:5000/users/email/${email}`);
        console.log("Fetch user response:", response.data);
        if (!response.data?.email) {
          throw new Error("Invalid user data");
        }
        setUser(response.data);
        setNewName(response.data.username);
        setProfilePicture(response.data.profilePicture || null);
        if (response.data.profilePicture) {
          setProfilePictureUrl(`http://localhost:5000/uploads/${response.data.profilePicture}`);
        }
        setError("");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load user data");
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges triggered");
    try {
      const updates = {};
      if (newName && newName !== user.username) updates.username = newName;
      if (newPassword || confirmPassword || currentPassword) {
        if (newPassword !== confirmPassword) {
          alert("Passwords don't match!");
          return;
        }
        if (!currentPassword) {
          alert("Please enter your current password");
          return;
        }
        updates.currentPassword = currentPassword;
        updates.newPassword = newPassword;
      }
      if (Object.keys(updates).length === 0) {
        alert("No changes to save!");
        return;
      }
      const response = await updateUser(user.email, updates);
      console.log("Update successful:", response.data);
      setUser(response.data);
      setNewName(response.data.username);
      localStorage.setItem("currentUsername", response.data.username);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Save error:", error.response || error);
      alert(error.response?.data?.message || "Failed to save changes");
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("Uploading file:", file.name);
    try {
      const formData = new FormData();
      formData.append("profilepicture", file);
      formData.append("email", user.email);
      const response = await updateProfilePicture(user.email, formData);
      console.log("Upload response:", response.data);
      const filename = response.data.profilePicture;
      const imageUrl = response.data.profilePictureUrl || `http://localhost:5000/uploads/${filename}`;
      setProfilePicture(filename);
      setProfilePictureUrl(imageUrl);
      setUser((prev) => {
        const updatedUser = { ...prev, profilePicture: filename };
        console.log("Updated user state:", updatedUser);
        console.log("Image URL:", imageUrl);
        return updatedUser;
      });
      alert("Profile picture updated!");
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  const handleAccountDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmAccountDelete = async () => {
    if (!deletePassword) {
      alert("Please enter your password to confirm deletion");
      return;
    }

    console.log("Attempting to delete account for ID:", user.id);
    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed");
      }

      console.log("Account deleted successfully");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Failed to delete account: ${error.message}`);
    } finally {
      setShowDeleteModal(false);
      setDeletePassword("");
    }
  };

  const handleBackToHome = () => {
    navigate("/Main"); // Navigate to homepage
  };

  console.log("Render - user.profilePicture:", user?.profilePicture);
  console.log("Render - profilePicture from context:", profilePicture);
  console.log("Render - profilePictureUrl:", profilePictureUrl);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="settings-container">
      <div className="settings-card">
        <button className="back-button" onClick={handleBackToHome}>
          <FaArrowLeft />
        </button>
        <form onSubmit={handleSaveChanges}>
          <div className="profile-section">
            <div className="profile-picture-container">
              <img
                src={profilePicture || peterImage}
                alt="Profile"
                className="profile-image"
                onError={(e) => {
                  console.log("Image failed to load:", profilePicture);
                  e.target.src = peterImage;
                }}
              />
              <label htmlFor="profile-pic-upload" className="upload-button">
                <FaCamera />
                <input
                  id="profile-pic-upload"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
              </label>
            </div>
            <div className="profile-info">
              {isEditing ? (
                <div className="edit-username-container">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="username-input"
                  />
                </div>
              ) : (
                <div className="username-display">
                  <h2>{user?.username}</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
              <p className="email">{user?.email}</p>
            </div>
          </div>

          <div className="password-section">
            <h3>Change Password</h3>
            <div className="password-inputs">
              <div className="input-group">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength="6"
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleAccountDelete}
              className="delete-button"
            >
              Delete Account
            </button>
          </div>
        </form>

        <CustomModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmAccountDelete}
        >
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <div className="input-group">
            <input
              type="password"
              className="form-input"
              placeholder="Enter your current password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default SettingsPage;