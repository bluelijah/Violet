import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card, ThemeToggle } from '../components/ui';

function NewCoursePage() {
  const [course, setCourse] = useState('');
  const [depth, setDepth] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const getDepthLabel = (value) => {
    if (value <= 3) return 'Beginner';
    if (value <= 6) return 'Intermediate';
    if (value <= 9) return 'Advanced';
    return 'Expert';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!course.trim()) {
      setError('Please enter what you would like to learn');
      setIsLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query: course, depth: parseInt(depth) })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to create course');
      }

      const data = await response.json();
      console.log("Course created:", data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error creating course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>

      <CourseCard>
        <LogoContainer>
          <FlowerIcon>🌸</FlowerIcon>
          <Logo>Syllabud</Logo>
        </LogoContainer>
        <Title>Create New Course</Title>
        <Subtitle>Tell us what you want to learn and we'll create a personalized course for you.</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            label="What would you like to learn?"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g., Introduction to Machine Learning"
            disabled={isLoading}
            required
          />

          <SliderContainer>
            <SliderLabel>
              Depth Level: <DepthValue>{depth}</DepthValue>
              <DepthBadge>{getDepthLabel(depth)}</DepthBadge>
            </SliderLabel>
            <Slider
              type="range"
              min="1"
              max="10"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              disabled={isLoading}
            />
            <SliderLabels>
              <span>1 (Overview)</span>
              <span>10 (Expert)</span>
            </SliderLabels>
          </SliderContainer>

          <ButtonContainer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating course...' : 'Create Course'}
            </Button>
          </ButtonContainer>

          {isLoading && (
            <LoadingContainer>
              <LoadingText>AI is creating your personalized course. This may take a moment...</LoadingText>
              <Spinner />
            </LoadingContainer>
          )}
        </Form>
      </CourseCard>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gradientStart} 0%, ${props => props.theme.colors.gradientEnd} 100%);
  position: relative;
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const CourseCard = styled(Card)`
  width: 100%;
  max-width: 560px;
  animation: fadeIn 0.5s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const FlowerIcon = styled.span`
  font-size: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: ${props => props.theme.colors.errorBackground};
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 12px;
  color: ${props => props.theme.colors.error};
  font-size: 14px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SliderLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DepthValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const DepthBadge = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.surfaceBorder};
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
    border: 3px solid ${props => props.theme.colors.surface};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
    border: 3px solid ${props => props.theme.colors.surface};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${props => props.theme.colors.textMuted};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.colors.surfaceBorder};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

export default NewCoursePage;
