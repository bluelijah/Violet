import React from "react";

const InputField = ({ label, type = "text" }) => {
  const styles = {
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    inputLabel: {
      fontFamily: '"Inria Sans", sans-serif',
      fontSize: "16px",
      color: "#000",
    },
    inputField: {
      width: "100%",
      height: "36px",
      borderRadius: "5px",
      border: "1px solid #000",
      padding: "0 12px",
      fontFamily: '"Inria Sans", sans-serif',
      fontSize: "16px",
      backgroundColor: "#ffe4fe",
    },
  };

  return (
    <div style={styles.inputGroup}>
      <label style={styles.inputLabel}>{label}</label>
      <input type={type} style={styles.inputField} />
    </div>
  );
};

export default InputField;
