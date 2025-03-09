import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import Login from './pages/LoginPage.jsx'
import Preferences from './pages/PreferencesPage.jsx'
//import Dashboard from './pages/Dashboard.jsx'
// add imports from pages

function App(){
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/preferences" element={<Preferences />}/>
          {/* <Route path="/dashboard" element={<Dashboard />}/> */}
        </Routes>
      </div>
    </Router>
  );
}


export default App