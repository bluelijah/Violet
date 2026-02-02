"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate('/preferences');
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && (
        <div style={{
          padding: "10px",
          backgroundColor: "#ffe4e4",
          border: "1px solid #ff6b6b",
          borderRadius: "5px",
          color: "#d63031",
          fontSize: "14px",
          fontFamily: '"Inria Sans", sans-serif',
        }}>
          {error}
        </div>
      )}
      <InputField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
        <Link
          to="/signup"
          style={{
            color: "#9c009f",
            fontFamily: '"Inria Sans", sans-serif',
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Don't have an account? Sign up
        </Link>
        <button type="submit" className="sign-in-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
      <style jsx>{`
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sign-in-btn {
          padding: 12px 24px;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-family: "Inria Sans", sans-serif;
          font-size: 16px;
          cursor: pointer;
          background-color: #000;
          transition: opacity 0.2s;
        }
        .sign-in-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .sign-in-btn:hover:not(:disabled) {
          opacity: 0.8;
        }

        @media (max-width: 640px) {
          .sign-in-btn {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
};

export default LoginForm;
