"use client";
import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
  const contentRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        // Show indicator if there's more content to scroll (not at bottom)
        const hasMoreContent = scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 20;
        setShowScrollIndicator(hasMoreContent);
      }
    };

    // Check on expand and after content renders
    if (isExpanded) {
      setTimeout(checkScroll, 100);
    }

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      return () => currentRef.removeEventListener('scroll', checkScroll);
    }
  }, [isExpanded, content]);

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

      <ContentWrapper $isExpanded={isExpanded}>
        <AccordionContent
          ref={contentRef}
          id={`step-${stepNumber}-content`}
          $isExpanded={isExpanded}
        >
          <ContentInner dangerouslySetInnerHTML={{ __html: content }} />
        </AccordionContent>

        {showScrollIndicator && isExpanded && (
          <ScrollIndicator>
            <ScrollArrow>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ScrollArrow>
            <ScrollText>Scroll for more</ScrollText>
          </ScrollIndicator>
        )}
      </ContentWrapper>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.04)' : props.theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.12)' : props.theme.colors.surfaceBorder};
  border-left: 3px solid ${props => props.theme.name === 'dark' ? '#8BA6FA' : props.theme.colors.primary};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.name === 'dark' ? '0 8px 32px rgba(139, 166, 250, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.theme.name === 'dark' ? 'rgba(167, 139, 250, 0.2)' : props.theme.colors.surfaceBorder};
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: ${props => props.$isExpanded
    ? (props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.08)' : props.theme.colors.primaryLight)
    : 'transparent'};
  border: none;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.08)' : props.theme.colors.primaryLight};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.3)' : props.theme.colors.primary};
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
  background: ${props => props.$isExpanded
    ? (props.theme.name === 'dark' ? 'rgba(167, 139, 250, 0.2)' : props.theme.colors.primary)
    : (props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.1)' : props.theme.colors.backgroundSecondary)};
  color: ${props => props.$isExpanded
    ? (props.theme.name === 'dark' ? '#A78BFA' : 'white')
    : props.theme.colors.textSecondary};
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

const ContentWrapper = styled.div`
  position: relative;
  max-height: ${props => props.$isExpanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

const AccordionContent = styled.div`
  max-height: 500px;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundSecondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.surfaceBorder};
    border-radius: 3px;

    &:hover {
      background: ${props => props.theme.colors.primary};
    }
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0 12px;
  background: linear-gradient(to bottom, transparent 0%, ${props => props.theme.colors.surface} 40%);
  pointer-events: none;
  animation: ${fadeIn} 0.3s ease;
`;

const ScrollArrow = styled.div`
  color: ${props => props.theme.colors.primary};
  animation: ${bounce} 1.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollText = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

const ContentInner = styled.div`
  padding: 24px;
  color: ${props => props.theme.colors.text};
  font-size: 15px;
  line-height: 1.7;

  /* Paragraphs */
  .paragraph {
    margin-bottom: 12px;
  }

  /* Links */
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryHover};
    }
  }

  /* Text formatting */
  strong {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  em {
    font-style: italic;
    color: ${props => props.theme.colors.textSecondary};
  }

  /* Module headers */
  .module-header {
    font-size: 17px;
    font-weight: 700;
    color: ${props => props.theme.name === 'dark' ? '#A78BFA' : props.theme.colors.primary};
    margin: 20px 0 12px 0;
    padding: 14px 16px;
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.08)' : props.theme.colors.primaryLight};
    border-radius: 10px;
    border-left: 3px solid ${props => props.theme.name === 'dark' ? '#8BA6FA' : props.theme.colors.primary};
    display: block;

    &:first-child {
      margin-top: 0;
    }
  }

  /* Unit headers */
  .unit-header {
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin: 14px 0 8px 16px;
    padding: 10px 14px;
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.05)' : props.theme.colors.backgroundSecondary};
    border-radius: 8px;
    display: block;
  }

  /* Subsection headers (Required, Recommended) */
  .subsection-header {
    font-size: 14px;
    font-weight: 700;
    color: ${props => props.theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 16px 0 8px 0;
    padding-bottom: 4px;
    border-bottom: 1px solid ${props => props.theme.colors.surfaceBorder};
    display: block;

    &:first-child {
      margin-top: 0;
    }
  }

  /* List items */
  .list-item {
    position: relative;
    margin: 8px 0 8px 24px;
    padding-left: 16px;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.primary};
      font-weight: bold;
    }
  }

  /* Checkpoints */
  .checkpoint {
    margin: 16px 0 16px 16px;
    padding: 12px 16px;
    background: ${props => props.theme.name === 'dark'
      ? 'rgba(222, 139, 250, 0.06)'
      : `linear-gradient(135deg, ${props.theme.colors.primaryLight} 0%, ${props.theme.colors.backgroundSecondary} 100%)`};
    border-radius: 8px;
    border-left: 2px solid ${props => props.theme.name === 'dark' ? '#DE8BFA' : props.theme.colors.accent};
    font-size: 14px;
    display: block;
  }

  /* Resource type labels */
  .resource-type {
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.name === 'dark' ? '#8BA6FA' : 'white'};
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.15)' : props.theme.colors.primary};
    border: ${props => props.theme.name === 'dark' ? '1px solid rgba(139, 166, 250, 0.25)' : 'none'};
    padding: 4px 10px;
    border-radius: 4px;
    display: inline-block;
    margin: 12px 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Arrow styling */
  .arrow {
    color: ${props => props.theme.name === 'dark' ? '#8BA6FA' : props.theme.colors.primary};
    font-weight: bold;
  }

  .why-label {
    color: ${props => props.theme.name === 'dark' ? '#DE8BFA' : props.theme.colors.accent};
    font-weight: 600;
  }

  /* Inline code */
  .inline-code, code {
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.1)' : props.theme.colors.backgroundSecondary};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    color: ${props => props.theme.name === 'dark' ? '#DE8BFA' : props.theme.colors.accent};
  }

  /* Clean up spacing */
  br {
    display: block;
    content: "";
    margin-top: 4px;
  }

  p + .module-header,
  br + .module-header {
    margin-top: 24px;
  }
`;
