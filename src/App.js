import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx"
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/HomePage" element={<HomePage />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </Routes>
</Router>

  );
};

export default App;
