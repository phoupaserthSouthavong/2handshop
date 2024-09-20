// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./SignUp"; // If you also have the signup page
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path "/" to "/signup" */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
