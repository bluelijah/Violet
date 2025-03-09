/*
import React from "react";
import LoginForm from "./LoginForm.jsx";

const LoginCard = () => {
  return (
    <main className="login-card">
      <h1 className="title">Violet</h1>
      <p className="subtitle">A place to learn anything</p>
      <LoginForm />
      <style jsx>{`
        .login-card {
          width: 554px;
          padding: 40px 52px;
          border-radius: 5px;
          background-color: #fff;
        }
        .title {
          font-family: "Inria Sans", sans-serif;
          font-size: 48px;
          color: #000;
          margin-bottom: 8px;
        }
        .subtitle {
          font-family: "Inria Sans", sans-serif;
          font-size: 16px;
          color: #000;
          margin-bottom: 60px;
        }
        @media (max-width: 991px) {
          .login-card {
            width: 80%;
            max-width: 554px;
            padding: 32px 40px;
          }
        }
        @media (max-width: 640px) {
          .login-card {
            width: 90%;
            padding: 24px 20px;
          }
          .title {
            font-size: 36px;
          }
          .subtitle {
            font-size: 14px;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
};

export default LoginCard;

*/
import React from "react";
import LoginForm from "./LoginForm.jsx";

const LoginCard = () => {
  const styles = {
    loginCard: {
      width: "554px",
      maxWidth: "100%",
      padding: "40px 52px",
      borderRadius: "5px",
      backgroundColor: "#fff",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontFamily: '"Inria Sans", sans-serif',
      fontSize: "48px",
      color: "#000",
      marginBottom: "8px",
    },
    subtitle: {
      fontFamily: '"Inria Sans", sans-serif',
      fontSize: "16px",
      color: "#000",
      marginBottom: "60px",
    },
  };

  return (
    <main style={styles.loginCard}>
      <h1 style={styles.title}>Violet</h1>
      <p style={styles.subtitle}>A place to learn anything</p>
      <LoginForm />
    </main>
  );
};

export default LoginCard;
