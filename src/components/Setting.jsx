import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Setting.css";
import { FaCamera, FaEdit } from "react-icons/fa";
import { ProfilePictureContext } from "./ProfilePictureContext.jsx";
import defaultProfile from '../assets/peter.png';
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

  const { profilePicture, setProfilePicture } = useContext(ProfilePictureContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("currentEmail");
        if (!email || email === 'undefined') {
          setError('No user logged in');
          return;
        }
        const response = await axios.get(`http://localhost:5000/users/email/${email}`);
        if (!response.data?.email) {
          throw new Error('Invalid user data');
        }
        setUser(response.data);
        setNewName(response.data.username); // Initialize newName with current username
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load user data');
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
  
    console.log("handleProfilePictureUpload triggered");
    try {
      const formData = new FormData();
      formData.append("profilepicture", file); // Matches multer field name
  
      const response = await updateProfilePicture(user.email, formData);
      console.log("Profile update successful:", response.data);
      setProfilePicture(response.data.profilepicture);
      setUser(prev => ({ ...prev, profilepicture: response.data.profilepicture }));
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert(error.response?.data?.message || "Upload failed");
    }
  };
  const handleAccountDelete = async () => {
    // ... (keep your existing handleAccountDelete function)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <div className="settings-container">
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <form onSubmit={handleSaveChanges}>
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
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  />
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
                onClick={handleAccountDelete} 
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