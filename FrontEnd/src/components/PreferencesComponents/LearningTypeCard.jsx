"use client";
import React from "react";
import styled from "styled-components";

const LearningTypeCard = ({ type, label, icon, isSelected, onSelect }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(type);
    }
  };

  return (
    <CardContainer>
      <IconBox
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onClick={() => onSelect(type)}
        onKeyDown={handleKeyDown}
        $isSelected={isSelected}
      >
        {icon}
      </IconBox>
      <TypeLabel>{label}</TypeLabel>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 991px) {
    width: 45%;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const IconBox = styled.div`
  width: 195px;
  height: 195px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ffe4fe;
  border: ${(props) => (props.$isSelected ? "4px solid #9C009F" : "none")};

  &:hover {
    background: #e5b4e6;
  }

  @media (max-width: 991px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 195px;
  }
`;

const TypeLabel = styled.p`
  font-family: "Inria Sans", sans-serif;
  font-size: 24px;
  color: #000;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export default LearningTypeCard;
