"use client";
import React from "react";
import InputField from "./InputField";

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <InputField label="Username" />
      <InputField label="Password" type="password" />
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
