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

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const SignupCard = styled(Card)`
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
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
    gap: 16px;
  }
`;

const LoginLink = styled(Link)`
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};

  span {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }
`;

const VioletFlower = ({ left, height, delay, swayDuration }) => (
  <FlowerContainer $left={left} $height={height} $delay={delay}>
    <FlowerWrapper $swayDuration={swayDuration}>
      <FlowerHead>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="12" rx="8" ry="12" fill="#8B5CF6" opacity="0.9"/>
          <ellipse cx="12" cy="20" rx="8" ry="12" fill="#7C3AED" opacity="0.85" transform="rotate(-45 12 20)"/>
          <ellipse cx="36" cy="20" rx="8" ry="12" fill="#7C3AED" opacity="0.85" transform="rotate(45 36 20)"/>
          <ellipse cx="14" cy="32" rx="8" ry="12" fill="#6D28D9" opacity="0.8" transform="rotate(-20 14 32)"/>
          <ellipse cx="34" cy="32" rx="8" ry="12" fill="#6D28D9" opacity="0.8" transform="rotate(20 34 32)"/>
          <circle cx="24" cy="24" r="6" fill="#FCD34D"/>
          <circle cx="24" cy="24" r="3" fill="#F59E0B"/>
        </svg>
      </FlowerHead>
      <FlowerStem />
    </FlowerWrapper>
  </FlowerContainer>
);


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/', { state: { message: 'Account created! Please sign in.' } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>

      {/* Violet flowers */}
      <VioletFlower left="4%" height="40vh" delay="0.4s" swayDuration="5s" />
      <VioletFlower left="10%" height="22vh" delay="0.9s" swayDuration="4.5s" />
      <VioletFlower left="18%" height="55vh" delay="0.3s" swayDuration="5.2s" />

      <VioletFlower left="70%" height="28vh" delay="0.8s" swayDuration="4.7s" />
      <VioletFlower left="78%" height="45vh" delay="0.4s" swayDuration="5.4s" />
      <VioletFlower left="92%" height="35vh" delay="0.6s" swayDuration="5.1s" />

      <SignupCard>
        <Logo>VIOLET</Logo>
        <Subtitle>Create your account</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />

          <Footer>
            <LoginLink to="/">
              Already have an account? <span>Sign in</span>
            </LoginLink>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </Footer>
        </Form>
      </SignupCard>
    </Container>
  );
}

export default Signup;
