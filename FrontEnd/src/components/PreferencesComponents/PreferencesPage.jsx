"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LearningTypeCard from "./LearningTypeCard";
import InputSection from "./InputSection";
import { EyeIcon, VolumeIcon, BookIcon, UserIcon } from "./Icons";

const PreferencesPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const learningTypes = [
    { id: "visual", label: "Visual", icon: <EyeIcon /> },
    { id: "auditory", label: "Auditory", icon: <VolumeIcon /> },
    { id: "readwrite", label: "Read/Write", icon: <BookIcon /> },
    { id: "kinesthetic", label: "Kinesthetic", icon: <UserIcon /> },
  ];

  const handleContinue = async () => {
    if (!selectedType) {
      alert("Please select a learning preference");
      return;
    }

    const userText = `Learning Style: ${selectedType}, User Preferences: ${description}`;

    try {
      const response = await fetch("http://localhost:8000/capture_user_input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_text: userText }),
      });
      const data = await response.json();
      console.log("Server response:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Card>
        <Title>Learning Preferences</Title>
        <LearningTypes>
          {learningTypes.map((type) => (
            <LearningTypeCard
              key={type.id}
              type={type.id}
              label={type.label}
              icon={type.icon}
              isSelected={selectedType === type.id}
              onSelect={setSelectedType}
            />
          ))}
        </LearningTypes>
        <InputSection
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
      </Card>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(1deg, #fbecfa 4.65%, #9c009f 120.75%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.section`
  width: 921px;
  border-radius: 5px;
  padding: 40px;
  position: relative;
  background-color: #fff;

  @media (max-width: 991px) {
    width: 90%;
    padding: 20px;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-family: "Inria Sans", sans-serif;
  font-size: 48px;
  color: #000;
  margin-bottom: 40px;

  @media (max-width: 640px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const LearningTypes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContinueButton = styled.button`
  position: absolute;
  bottom: -60px;
  right: 0;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-family: "Inria Sans", sans-serif;
  font-size: 16px;
  cursor: pointer;
  background-color: #000;

  @media (max-width: 640px) {
    position: relative;
    bottom: 0;
    width: 100%;
    margin-top: 20px;
  }
`;

export default PreferencesPage;
