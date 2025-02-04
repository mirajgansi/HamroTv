import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfilePictureProvider } from "./components/ProfilePictureContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Main from "./pages/Main.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import SettingsPage from "./components/Setting.jsx";
import Adminpage from "./pages/adminpage.jsx";
import ProfileIcon from "./components/ProfileIcon.jsx";

const App = () => {
  return (
    // Wrap the entire app with ProfilePictureProvider
    <ProfilePictureProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            <>
              <ProfileIcon />
              <Main />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/setting"
          element={
            <>
              <ProfileIcon />
              <SettingsPage />
            </>
          }
        />
        <Route
          path="/adminpage"
          element={
            <>
              <ProfileIcon />
              <Adminpage />
            </>
          }
        />
      </Routes>
    </ProfilePictureProvider>
  );
};

export default App;
