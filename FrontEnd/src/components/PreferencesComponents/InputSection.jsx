"use client";
import React from "react";
import styled from "styled-components";

const InputSection = ({ value, onChange }) => {
  return (
    <Container>
      <InputLabel>How Do You Best Learn?</InputLabel>
      <InputBox
        placeholder="Describe how you learn best..."
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-family: "Inria Sans", sans-serif;
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
  display: block;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 130px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  font-family: "Inria Sans", sans-serif;
  font-size: 16px;
  resize: none;
  background-color: #ffe4fe;

  @media (max-width: 640px) {
    height: 100px;
  }
`;

export default InputSection;
