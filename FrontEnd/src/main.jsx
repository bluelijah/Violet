import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure this import is correct
import "./index.css"; // If using Tailwind, this should be present

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);