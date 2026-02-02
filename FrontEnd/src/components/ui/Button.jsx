import React from 'react';
import styled, { css } from 'styled-components';

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${props => props.$size === 'sm' ? '8px 16px' : props.$size === 'lg' ? '14px 28px' : '12px 24px'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: ${props => props.$size === 'sm' ? '14px' : props.$size === 'lg' ? '18px' : '16px'};
  font-weight: 500;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$variant === 'primary' && css`
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textOnPrimary};

    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.primaryHover};
      transform: translateY(-1px);
      box-shadow: ${props => props.theme.shadows.md};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background: transparent;
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.surfaceBorder};

    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.surfaceHover};
      border-color: ${props => props.theme.colors.primary};
    }
  `}

  ${props => props.$variant === 'ghost' && css`
    background: transparent;
    color: ${props => props.theme.colors.textSecondary};

    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.surfaceHover};
      color: ${props => props.theme.colors.text};
    }
  `}

  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

export default Button;
