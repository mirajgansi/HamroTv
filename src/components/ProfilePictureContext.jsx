// ProfilePictureContext.js
import React, { createContext, useState } from "react";

// Create the context
export const ProfilePictureContext = createContext();

// Create a provider component
export const ProfilePictureProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <ProfilePictureContext.Provider value={{ profilePicture, setProfilePicture }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};