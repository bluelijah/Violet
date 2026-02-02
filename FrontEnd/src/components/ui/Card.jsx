import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 20px;
  padding: ${props => props.$padding || '32px'};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.surfaceBorder};
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    padding: 24px;
    border-radius: 16px;
  }
`;

export function Card({ children, padding, ...props }) {
  return (
    <StyledCard $padding={padding} {...props}>
      {children}
    </StyledCard>
  );
}

export default Card;
