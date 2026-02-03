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
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedInfo, setExpandedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updatePreferences, user } = useAuth();

  const learningTypes = [
    {
      id: "visual",
      label: "Visual",
      icon: <EyeIcon />,
      description: "You learn best through images, diagrams, charts, and spatial understanding. You prefer seeing information presented visually and often think in pictures."
    },
    {
      id: "auditory",
      label: "Auditory",
      icon: <VolumeIcon />,
      description: "You learn best by listening. Lectures, discussions, and verbal explanations help you retain information. You may benefit from reading aloud or talking through problems."
    },
    {
      id: "readwrite",
      label: "Read/Write",
      icon: <BookIcon />,
      description: "You learn best through reading and writing. You prefer text-based information, taking notes, and expressing ideas in written form."
    },
    {
      id: "kinesthetic",
      label: "Kinesthetic",
      icon: <UserIcon />,
      description: "You learn best through hands-on experience. You prefer practice, experiments, and physical engagement with the material."
    },
  ];

  const learningTags = [
    "Metaphors", "Analogies", "Examples", "Comparisons", "Storytelling", "Humor",
    "Diagrams", "Visual aids", "Mind maps", "Code snippets", "Cheat sheets",
    "Step-by-step", "Detailed breakdowns", "Big-picture overviews", "Summaries",
    "Practice problems", "Quizzes", "Flashcards", "Hands-on projects",
    "Case studies", "Real-world applications", "Proofs", "Mnemonics",
    "Historical context", "Video explanations"
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleInfo = (id) => {
    setExpandedInfo(prev => prev === id ? null : id);
  };

  const handleContinue = async () => {
    if (!selectedType) {
      setError("Please select a learning preference");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Combine tags and description into preferences text
      const tagsText = selectedTags.length > 0 ? `I like: ${selectedTags.join(", ")}. ` : "";
      const fullDescription = tagsText + description;
      await updatePreferences(selectedType, fullDescription);
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
            >
              <IconBoxWrapper>
                <IconBox
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
                  {type.icon}
                </IconBox>
                <InfoButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleInfo(type.id);
                  }}
                  $isExpanded={expandedInfo === type.id}
                  aria-label={`Learn more about ${type.label} learning style`}
                >
                  ?
                </InfoButton>
              </IconBoxWrapper>
              <TypeLabel>{type.label}</TypeLabel>
              <InfoPanel $isExpanded={expandedInfo === type.id}>
                {type.description}
              </InfoPanel>
            </LearningTypeCard>
          ))}
        </LearningTypes>

        <TagsSection>
          <TagsLabel>I learn best with:</TagsLabel>
          <TagsContainer>
            {learningTags.map((tag) => (
              <Tag
                key={tag}
                $isSelected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTags.includes(tag)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleTag(tag);
                  }
                }}
              >
                {tag}
              </Tag>
            ))}
          </TagsContainer>
        </TagsSection>

        <InputContainer>
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
  line-height: 1.2;
  padding-bottom: 4px;

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
  gap: 8px;
`;

const IconBoxWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
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

const InfoButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isExpanded ? props.theme.colors.primary : props.theme.colors.surfaceBorder};
  color: ${props => props.$isExpanded ? 'white' : props.theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }

  @media (max-width: 800px) {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
`;

const InfoPanel = styled.div`
  max-height: ${props => props.$isExpanded ? '200px' : '0'};
  opacity: ${props => props.$isExpanded ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  padding: ${props => props.$isExpanded ? '12px' : '0 12px'};
  background: ${props => props.theme.colors.inputBackground};
  border-radius: 8px;
  line-height: 1.5;
  max-width: 180px;

  @media (max-width: 800px) {
    max-width: 150px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
  }
`;

const TagsSection = styled.div`
  margin-bottom: 28px;
  padding: 20px;
  background: ${props => props.theme.colors.inputBackground};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.surfaceBorder};
`;

const TagsLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

const Tag = styled.button`
  padding: 10px 18px;
  border-radius: 24px;
  border: 2px solid ${props => props.$isSelected ? props.theme.colors.primary : 'transparent'};
  background: ${props => props.$isSelected ? props.theme.colors.primaryLight : props.theme.colors.surface};
  color: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isSelected ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.08)'};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 13px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 24px;
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
