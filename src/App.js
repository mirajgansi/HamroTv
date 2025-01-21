import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";
import Sidebar from "./components/SideBar.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import SettingsPage from "./components/Setting.jsx";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "60px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/setting" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
