import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileDetails from "./components/ProfileDetails";
import Main from "./Main";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
