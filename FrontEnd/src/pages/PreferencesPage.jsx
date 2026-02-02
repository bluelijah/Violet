"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, ThemeToggle } from "../components/ui";
import { EyeIcon, VolumeIcon, BookIcon, UserIcon } from "../components/PreferencesComponents/Icons";

const PreferencesPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updatePreferences, user } = useAuth();

  const learningTypes = [
    { id: "visual", label: "Visual", icon: <EyeIcon /> },
    { id: "auditory", label: "Auditory", icon: <VolumeIcon /> },
    { id: "readwrite", label: "Read/Write", icon: <BookIcon /> },
    { id: "kinesthetic", label: "Kinesthetic", icon: <UserIcon /> },
  ];

  const handleContinue = async () => {
    if (!selectedType) {
      setError("Please select a learning preference");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updatePreferences(selectedType, description);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to save preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>

      <PreferencesCard>
        <WelcomeText>Welcome, {user?.username}!</WelcomeText>
        <Title>Learning Preferences</Title>
        <Subtitle>Tell us how you learn best so we can personalize your courses.</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LearningTypes>
          {learningTypes.map((type) => (
            <LearningTypeCard
              key={type.id}
              $isSelected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
              role="button"
              tabIndex={0}
              aria-pressed={selectedType === type.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedType(type.id);
                }
              }}
            >
              <IconBox $isSelected={selectedType === type.id}>
                {type.icon}
              </IconBox>
              <TypeLabel>{type.label}</TypeLabel>
            </LearningTypeCard>
          ))}
        </LearningTypes>

        <InputContainer>
          <InputLabel>How Do You Best Learn?</InputLabel>
          <TextArea
            placeholder="Describe how you learn best..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>

        <ButtonContainer>
          <Button variant="secondary" onClick={() => navigate("/dashboard")} disabled={loading}>
            Skip for now
          </Button>
          <Button onClick={handleContinue} disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </Button>
        </ButtonContainer>
      </PreferencesCard>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.gradientStart} 0%, ${props => props.theme.colors.gradientEnd} 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const PreferencesCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  animation: fadeIn 0.5s ease;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 8px;
  font-weight: 500;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  margin-bottom: 32px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: ${props => props.theme.colors.errorBackground};
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 12px;
  color: ${props => props.theme.colors.error};
  font-size: 14px;
  margin-bottom: 20px;
`;

const LearningTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const LearningTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const IconBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-width: 180px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isSelected ? props.theme.colors.primaryLight : props.theme.colors.inputBackground};
  border: 3px solid ${props => props.$isSelected ? props.theme.colors.primary : 'transparent'};
  box-shadow: ${props => props.$isSelected ? `0 0 0 4px ${props.theme.colors.primaryLight}` : 'none'};

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }

  svg {
    width: 64px;
    height: 64px;
    color: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.textSecondary};
    transition: color 0.3s ease;
  }

  @media (max-width: 800px) {
    max-width: 150px;
  }
`;

const TypeLabel = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const InputContainer = styled.div`
  margin-bottom: 24px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 12px;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 16px;
  border: 2px solid ${props => props.theme.colors.surfaceBorder};
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default PreferencesPage;
