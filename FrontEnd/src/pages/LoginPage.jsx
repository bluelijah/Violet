import React from "react";
import LoginCard from "../components/LoginCard";
//import { useNavigate } from react-dom-router;

const LoginPage = () => {
    const globalStyles = {
        position: "absolute", // Ensures full control of placement
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(97deg, #fbecfa 16.84%, #9c009f 97.19%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      };

/*  
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={globalStyles
      }>
        <LoginCard />
      </div>
    </>
  );
  */

  return (
    <>
      <style>
        {`
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        `}
      </style>
      <div style={globalStyles}>
        <LoginCard />
      </div>
    </>
  );

};

export default LoginPage;

