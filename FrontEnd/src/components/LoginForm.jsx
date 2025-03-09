"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  
  const[isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/preferences');
    // Handle form submission
  };
  // const handleSignup = (e) =>{
  //   e.preventDefault();
  //   navigate('/signup');
  // }
  

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField label="Username" />
      <InputField label="Password" type="password" />
      {/* <button type="button" className='text-button'
        onMouseOver={()=>setIsHovered(true)} 
        onMouseLeave={()=>setIsHovered(false)}
        onClick={handleSignup}
        style={{
          textDecoration: isHovered ? "underline" : "none",
          background: "none",
          border: "none",
          position: "relative",
          top: "70px",
          right: "200px",
          cursor: "pointer",
        }}
        >Sign Up</button> */}
      <button type="submit" className="sign-in-btn">
        Sign In
      </button>
      <style jsx>{`
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sign-in-btn {
          align-self: flex-end;
          margin-top: 24px;
          padding: 12px 24px;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-family: "Inria Sans", sans-serif;
          font-size: 16px;
          cursor: pointer;
          background-color: #000;
        }
        .text-button{
          color: inherit;
        }
        
        @media (max-width: 640px) {
          .sign-in-btn {
            width: 100%;
            margin-top: 16px;
          }
        }
      `}</style>
    </form>
  );
};

export default LoginForm;
