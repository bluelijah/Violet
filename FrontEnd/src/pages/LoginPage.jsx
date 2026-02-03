import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card, ThemeToggle } from '../components/ui';

const springUp = keyframes`
  0% {
    transform: scaleY(0) translateY(100%);
    opacity: 0;
  }
  60% {
    transform: scaleY(1.05) translateY(0);
    opacity: 1;
  }
  80% {
    transform: scaleY(0.98) translateY(0);
  }
  100% {
    transform: scaleY(1) translateY(0);
    opacity: 1;
  }
`;

const sway = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gradientStart} 0%, ${props => props.theme.colors.gradientEnd} 100%);
  position: relative;
  overflow: hidden;
`;

const FlowerContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: ${props => props.$left};
  height: ${props => props.$height};
  transform-origin: bottom center;
  animation: ${springUp} 1.2s ease-out ${props => props.$delay} both;
  z-index: 0;
  pointer-events: none;
`;

const FlowerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${sway} ${props => props.$swayDuration || '4s'} ease-in-out infinite;
  transform-origin: bottom center;
`;

const FlowerHead = styled.div`
  flex-shrink: 0;
`;

const FlowerStem = styled.div`
  width: 4px;
  flex-grow: 1;
  background: linear-gradient(to top, #228B22, #32CD32);
  border-radius: 2px;
  margin-top: -26px;
  z-index: -1;
`;

const VioletFlower = ({ left, height, delay, swayDuration }) => (
  <FlowerContainer $left={left} $height={height} $delay={delay}>
    <FlowerWrapper $swayDuration={swayDuration}>
      <FlowerHead>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Petals */}
          <ellipse cx="24" cy="12" rx="8" ry="12" fill="#8B5CF6" opacity="0.9"/>
          <ellipse cx="12" cy="20" rx="8" ry="12" fill="#7C3AED" opacity="0.85" transform="rotate(-45 12 20)"/>
          <ellipse cx="36" cy="20" rx="8" ry="12" fill="#7C3AED" opacity="0.85" transform="rotate(45 36 20)"/>
          <ellipse cx="14" cy="32" rx="8" ry="12" fill="#6D28D9" opacity="0.8" transform="rotate(-20 14 32)"/>
          <ellipse cx="34" cy="32" rx="8" ry="12" fill="#6D28D9" opacity="0.8" transform="rotate(20 34 32)"/>
          {/* Center */}
          <circle cx="24" cy="24" r="6" fill="#FCD34D"/>
          <circle cx="24" cy="24" r="3" fill="#F59E0B"/>
        </svg>
      </FlowerHead>
      <FlowerStem />
    </FlowerWrapper>
  </FlowerContainer>
);

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  animation: fadeIn 0.5s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    max-width: 320px;
    padding: 24px 20px;
  }
`;

const Logo = styled.h1`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: ${props => props.theme.colors.errorBackground};
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 12px;
  color: ${props => props.theme.colors.error};
  font-size: 14px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
`;

const SignupLink = styled(Link)`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};

  span {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/preferences');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Violet flowers springing up around the sign-in */}
      {/* Far left cluster */}
      <VioletFlower left="3%" height="25vh" delay="0.7s" swayDuration="5.2s" />
      <VioletFlower left="6%" height="45vh" delay="0.2s" swayDuration="5s" />
      <VioletFlower left="10%" height="18vh" delay="0.9s" swayDuration="4.2s" />

      {/* Left side, closer to card */}
      <VioletFlower left="18%" height="55vh" delay="0.4s" swayDuration="4.5s" />
      <VioletFlower left="22%" height="30vh" delay="0.55s" swayDuration="5.8s" />
      <VioletFlower left="26%" height="15vh" delay="1.0s" swayDuration="4.8s" />
      <VioletFlower left="30%" height="38vh" delay="0.65s" swayDuration="5.3s" />
      <VioletFlower left="34%" height="22vh" delay="0.85s" swayDuration="4.6s" />

      {/* Right side, closer to card */}
      <VioletFlower left="66%" height="20vh" delay="0.95s" swayDuration="5.1s" />
      <VioletFlower left="70%" height="35vh" delay="0.6s" swayDuration="4.9s" />
      <VioletFlower left="74%" height="12vh" delay="1.1s" swayDuration="5.5s" />
      <VioletFlower left="78%" height="42vh" delay="0.45s" swayDuration="4.4s" />
      <VioletFlower left="82%" height="28vh" delay="0.75s" swayDuration="5.7s" />

      {/* Far right cluster */}
      <VioletFlower left="88%" height="50vh" delay="0.3s" swayDuration="5.5s" />
      <VioletFlower left="92%" height="16vh" delay="1.05s" swayDuration="4.3s" />
      <VioletFlower left="95%" height="60vh" delay="0.35s" swayDuration="4.8s" />
      <VioletFlower left="97%" height="32vh" delay="0.8s" swayDuration="5.4s" />

      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>

      <LoginCard>
        <Logo>VIOLET</Logo>
        <Subtitle>Your AI-powered learning companion</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Footer>
            <SignupLink to="/signup">
              Don't have an account? <span>Sign up</span>
            </SignupLink>
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Footer>
        </Form>
      </LoginCard>
    </Container>
  );
}

export default LoginPage;
