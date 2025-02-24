import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Setting.css";
import { FaCamera, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa"; // Added FaEye and FaEyeSlash
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import peterImage from '../assets/peter.png';
import axios from "axios";
import { getUserByEmail, updateUser, updateProfilePicture } from "../Script/api";

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
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { profilePicture, setProfilePicture } = useContext(ProfilePictureContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("currentEmail");
        console.log("Fetching user with email:", email);
        if (!email || email === 'undefined') {
          setError('No user logged in');
          return;
        }
        const response = await axios.get(`http://localhost:5000/users/email/${email}`);
        console.log("Fetch user response:", response.data);
        if (!response.data?.email) {
          throw new Error('Invalid user data');
        }
        setUser(response.data);
        setNewName(response.data.username);
        setProfilePicture(response.data.profilePicture || null);
        if (response.data.profilePicture) {
          setProfilePictureUrl(`http://localhost:5000/uploads/${response.data.profilePicture}`);
        }
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load user data');
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
          alert("Passwords don’t match!");
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
      
      setUser(prev => {
        const updatedUser = { 
          ...prev, 
          profilePicture: filename
        };
        console.log("Updated user state:", updatedUser);
        console.log("Image URL:", imageUrl);
        return updatedUser;
      });
      alert("Profile picture updated!");
      
      // Trigger a full page refresh after successful upload
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  console.log("Render - user.profilePicture:", user?.profilePicture);
  console.log("Render - profilePicture from context:", profilePicture);
  console.log("Render - profilePictureUrl:", profilePictureUrl);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <div className="settings-container">
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <form onSubmit={handleSaveChanges}>
            <div className="profile-section text-center mb-5">
              <div className="profile-picture-container mx-auto mb-4">
                <img
                  src={profilePicture || peterImage}
                  alt="Profile"
                  className="profile-picture rounded-circle img-thumbnail"
                  style={{ 
                    width: "150px", 
                    height: "150px",
                    objectFit: "cover"
                  }}
                  onError={(e) => { 
                    console.log("Image failed to load:", profilePicture);
                    e.target.src = peterImage; 
                  }}
                />
                <label htmlFor="profile-pic-upload" className="btn btn-outline-primary mt-2">
                  <FaCamera /> Change Profile Picture
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
                  <div className="d-flex gap-2 justify-content-center mb-3">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control w-50"
                    />
                  </div>
                ) : (
                  <div className="d-flex gap-2 justify-content-center align-items-center mb-3">
                    <h2 className="mb-0">{user?.username}</h2>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
                <p className="text-muted">{user?.email}</p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-4 border-bottom pb-2">Change Password</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 d-flex justify-content-between">
              <button 
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>
              <button 
                type="button"
                onClick={() => console.log("Delete account clicked")}
                className="btn btn-danger"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;