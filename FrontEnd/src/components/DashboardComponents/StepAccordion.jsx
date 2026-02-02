"use client";
import styled from "styled-components";
import { useAccordion } from "./AccordionContext";

const icons = {
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  link: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export function StepAccordion({ stepNumber, title, content, icon }) {
  const { expandedStep, toggleStep } = useAccordion();
  const isExpanded = expandedStep === stepNumber;

  return (
    <AccordionContainer>
      <AccordionHeader
        onClick={() => toggleStep(stepNumber)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleStep(stepNumber);
          }
        }}
        aria-controls={`step-${stepNumber}-content`}
        aria-expanded={isExpanded}
        $isExpanded={isExpanded}
      >
        <HeaderLeft>
          <IconWrapper $isExpanded={isExpanded}>
            {icons[icon] || icons.book}
          </IconWrapper>
          <Title>{title}</Title>
        </HeaderLeft>
        <ChevronIcon $isExpanded={isExpanded}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ChevronIcon>
      </AccordionHeader>

      <AccordionContent
        id={`step-${stepNumber}-content`}
        $isExpanded={isExpanded}
      >
        <ContentInner dangerouslySetInnerHTML={{ __html: content }} />
      </AccordionContent>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.surfaceBorder};
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: ${props => props.$isExpanded ? props.theme.colors.primaryLight : 'transparent'};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$isExpanded ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  color: ${props => props.$isExpanded ? 'white' : props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ChevronIcon = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div`
  max-height: ${props => props.$isExpanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

const ContentInner = styled.div`
  padding: 0 24px 24px 24px;
  color: ${props => props.theme.colors.text};
  font-size: 15px;
  line-height: 1.7;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: ${props => props.theme.colors.primaryHover};
    }
  }

  strong {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  em {
    font-style: italic;
  }
`;
