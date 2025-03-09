import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import Login from './pages/LoginPage.jsx'
import Preferences from './pages/PreferencesPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NewCoursePage from "./pages/NewCoursePage";
/*
function App(){ // To Run the app from the source keep this uncommented
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/preferences" element={<Preferences />}/>
          {/* <Route path="/dashboard" element={<Dashboard />}/> * /}
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App
*/


function App() {// TO RUN A SPECIFIC PAGE UNCOMMENT THIS AND COMENT OUT THE BLOCK ABOVE
  return (
    <div>
      <DashboardPage />
    </div>  
    
  );
}

export default App;



