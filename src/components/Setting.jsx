import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Setting.css";
import { FaCamera, FaEdit } from "react-icons/fa";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import defaultProfile from '../assets/peter.png';
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("currentEmail");
        console.log('Phase 1 - Retrieved email:', email);
        if (!email || email === 'undefined') {
          console.error('No email found in localStorage');
          setError('No user logged in');
          return;
        }
        console.log('Phase 2 - Making API call for:', email);
        const response = await axios.get(`http://localhost:5000/users/email/${email}`);
        
        console.log('Phase 3 - API Response:', response.data);
        if (!response.data?.email) {
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
  
    fetchUserData(); // Call it directly inside the useEffect
  
  }, []);
  const handleRename = async () => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        { username: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(prev => ({ ...prev, username: newName }));
      localStorage.setItem("currentUsername", newName);
      setIsEditing(false);
      alert("Username updated successfully!");
    } catch (error) {
      console.error("Rename error:", error);
      alert(error.response?.data?.message || "Failed to update username");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      await axios.put(
        `http://localhost:5000/api/users/${user.id}/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change error:", error);
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profile", file);

      const response = await axios.put(
        `http://localhost:5000/api/users/${user.id}/profilepicture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfilePicture(response.data.profilepicture);
      setUser(prev => ({
        ...prev,
        profilepicture: response.data.profilepicture,
      }));
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        { notifications },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Preferences saved!");
    } catch (error) {
      console.error("Save error:", error);
      alert(error.response?.data?.message || "Save failed");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5">
        <h3>Error Loading Settings</h3>
        <p>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 settings-container">
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <div className="profile-section text-center mb-5">
            <div className="profile-picture-container mx-auto mb-4">
              <input
                id="profile-picture-input"
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
              <label 
                htmlFor="profile-picture-input"
                className="position-relative cursor-pointer"
              >
                <FaCamera className="position-absolute bottom-0 end-0 fs-5 bg-primary text-white p-2 rounded-circle" />
                <img
                  src={
                    user?.profilepicture 
                      ? `http://localhost:5000/uploads/${user.profilepicture}`
                      : defaultProfile
                  }
                  alt="Profile"
                  className="profile-picture rounded-circle img-thumbnail"
                  style={{ width: "150px", height: "150px" }}
                  onError={(e) => {
                    e.target.src = defaultProfile;
                  }}
                />
              </label>
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="d-flex gap-2 justify-content-center mb-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="form-control w-50"
                  />
                  <button 
                    onClick={handleRename}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 justify-content-center align-items-center mb-3">
                  <h2 className="mb-0">{user?.username}</h2>
                  <button 
                    onClick={() => {
                      setNewName(user.username);
                      setIsEditing(true);
                    }}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
              <p className="text-muted">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handlePreferencesSubmit}>
            <div className="mb-5">
              <h3 className="mb-4 border-bottom pb-2">Preferences</h3>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  style={{ transform: "scale(1.5)" }}
                />
                <label 
                  className="form-check-label fs-5 ms-3"
                  htmlFor="notifications"
                >
                  Email Notifications
                </label>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary mt-3"
              >
                Save Preferences
              </button>
            </div>

            <div className="mb-5">
              <h3 className="mb-4 border-bottom pb-2">Change Password</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <button 
                    type="submit"
                    onClick={handlePasswordChange}
                    className="btn btn-primary"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;