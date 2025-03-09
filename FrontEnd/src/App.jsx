import React from "react";
import LoginPage from "./pages/LoginPage";
import PreferencesPage from "./pages/PreferencesPage";

import "./App.css"; // ✅ Import global styles



const App = () => {
  return (
    <div className="app-container">
      <PreferencesPage />
    </div>
  );
};

export default App;

