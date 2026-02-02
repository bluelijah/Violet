import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.surfaceBorder};
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.colors.primaryLight};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.surfaceBorder};
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.colors.primaryLight};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Input({ label, textarea = false, ...props }) {
  const Component = textarea ? StyledTextarea : StyledInput;

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <Component {...props} />
    </InputWrapper>
  );
}

export default Input;
