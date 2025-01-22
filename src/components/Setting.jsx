import React, { useState, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Setting.css"
import { FaCamera, FaEdit } from "react-icons/fa"

const SettingsPage = () => {
  // Assume these values are imported from the backend
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const [notifications, setNotifications] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg")
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Settings saved:", { name, email, notifications })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    console.log("Password change requested:", { currentPassword, newPassword, confirmPassword })
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(URL.createObjectURL(file))
      console.log("Profile picture changed:", file)
    }
  }

  const handleRename = () => {
    if (isEditing) {
      // Here you would typically send the new name to your backend
      setName(newName)
      setIsEditing(false)
    } else {
      setNewName(name)
      setIsEditing(true)
    }
  }

  return (
    <div className="settings-container">
      <div className="profile-section">
        <div className="profile-picture-container">
          <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="profile-picture" />
          <label htmlFor="profile-picture-input" className="profile-picture-upload">
            <FaCamera />
          </label>
          <input
            id="profile-picture-input"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
            accept="image/*"
          />
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
          <button onClick={handleRename} className="btn btn-outline-primary btn-sm">
            {isEditing ? (
              "Save"
            ) : (
              <>
                <FaEdit /> Rename
              </>
            )}
          </button>
        </div>
        <p>{email}</p>
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
          <form onSubmit={handlePasswordChange}>
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
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Change Password
            </button>
          </form>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </form>
    </div>
  )
}

export default SettingsPage

