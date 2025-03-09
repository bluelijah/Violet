import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import Login from './pages/LoginPage.jsx'
import Preferences from './pages/PreferencesPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'
// import Signup from './pages/Signup.jsx'
import NewCoursePage from './pages/NewCoursePage.jsx'
// add imports from pages

function App(){
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/pre      navigate('/dashboard')
ferences" element={<Preferences />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          {/* <Route path="/signup" element={<Signup />}/> */}
          <Route path='newCoursePage' element={<NewCoursePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App