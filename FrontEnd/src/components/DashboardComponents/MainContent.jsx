"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { StepAccordion } from "./StepAccordion";
import { useDashboard } from "./DashboardContext";

export function MainContent() {
  const { selectedCourse, loading } = useDashboard();
  const [prerequisites, setPrerequisites] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [resources, setResources] = useState("");

  useEffect(() => {
    if (selectedCourse?.content) {
      parseContent(selectedCourse.content);
    } else {
      setPrerequisites("");
      setCourseContent("");
      setResources("");
    }
  }, [selectedCourse]);

  function parseContent(text) {
    // Use regex to extract sections more reliably
    let prerequisites = "";
    let courseContent = "";
    let resources = "";

    // Extract PREREQUISITES section (ends at DEPENDENCY MAP or COURSE STRUCTURE)
    const prereqMatch = text.match(/PREREQUISITES:\s*([\s\S]*?)(?=DEPENDENCY MAP:|COURSE STRUCTURE:|RESOURCES:|$)/i);
    if (prereqMatch) {
      prerequisites = prereqMatch[1].trim();
    }

    // Extract COURSE STRUCTURE section (includes CORE PATH, ends at ENRICHMENT or RESOURCES)
    const courseMatch = text.match(/(?:COURSE STRUCTURE:|CORE PATH:)\s*([\s\S]*?)(?=ENRICHMENT BRANCHES:|RESOURCES:|$)/i);
    if (courseMatch) {
      courseContent = courseMatch[1].trim();
      // Also try to include enrichment if it exists before resources
      const enrichMatch = text.match(/ENRICHMENT BRANCHES:\s*([\s\S]*?)(?=RESOURCES:|$)/i);
      if (enrichMatch) {
        courseContent += "\n\n**Enrichment (Optional):**\n" + enrichMatch[1].trim();
      }
    }

    // Extract RESOURCES section (goes to end or next major section)
    const resourceMatch = text.match(/RESOURCES:\s*([\s\S]*?)(?=ASSESSMENT|TIME & EFFORT|MASTERY|NEXT STEPS|DIFFICULTY|$)/i);
    if (resourceMatch) {
      resources = resourceMatch[1].trim();
    }

    const formatContent = (content) => {
      if (!content) return "";
      let text = content;

      // Convert Module headers (e.g., "Module 1: Title")
      text = text.replace(/^(Module \d+[^:\n]*:[^\n]*)/gm, '<div class="module-header">$1</div>');

      // Convert tree structure characters to cleaner format
      text = text.replace(/├─\s*/g, '• ');
      text = text.replace(/└─\s*/g, '• ');
      text = text.replace(/\*\s+\*\*/g, '• **');

      // Convert "Unit X.X:" patterns
      text = text.replace(/^(\s*)•\s*(Unit \d+\.\d+[^→]*)/gm, '$1<div class="unit-header">$2</div>');

      // Convert → explanations to styled spans
      text = text.replace(/→\s*\*\*Why here:\*\*\s*/g, '<span class="why-label">→ </span>');
      text = text.replace(/→\s*/g, '<span class="arrow">→</span> ');

      // Convert **bold** text
      text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

      // Convert *italic* text (but not bullet points)
      text = text.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');

      // Convert markdown links
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      // Convert "Required" and "Recommended" headers
      text = text.replace(/^(Required|Recommended)\s*$/gm, '<div class="subsection-header">$1</div>');

      // Convert bullet points
      text = text.replace(/^[-•]\s+(.+)$/gm, '<div class="list-item">$1</div>');
      text = text.replace(/^\*\s+(.+)$/gm, '<div class="list-item">$1</div>');

      // Convert "Checkpoint:" lines
      text = text.replace(/^(Checkpoint:[^\n]*)/gm, '<div class="checkpoint">$1</div>');
      text = text.replace(/<div class="list-item">(Checkpoint:[^<]*)<\/div>/g, '<div class="checkpoint">$1</div>');

      // Convert "Primary:" and "Alternative:" resource labels
      text = text.replace(/^[-•]\s*<strong>(Primary|Alternative):<\/strong>/gm, '<div class="resource-type">$1</div>');

      // Convert inline code
      text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

      // Convert newlines to breaks
      text = text.replace(/\n\n+/g, '</p><p class="paragraph">');
      text = text.replace(/\n/g, '<br />');

      // Wrap in paragraph
      text = '<p class="paragraph">' + text + '</p>';

      // Clean up empty paragraphs
      text = text.replace(/<p class="paragraph">\s*<\/p>/g, '');
      text = text.replace(/<p class="paragraph">\s*<br \/>\s*<\/p>/g, '');

      return text;
    };

    setPrerequisites(formatContent(prerequisites) || "No prerequisites found.");
    setCourseContent(formatContent(courseContent) || "No content found.");
    setResources(formatContent(resources) || "No resources found.");
  }

  if (loading) {
    return (
      <MainContainer>
        <ContentWrapper>
          <LoadingState>
            <Spinner />
            <LoadingText>Loading courses...</LoadingText>
          </LoadingState>
        </ContentWrapper>
      </MainContainer>
    );
  }

  if (!selectedCourse) {
    return (
      <MainContainer>
        <ContentWrapper>
          <EmptyState>
            <EmptyIcon>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </EmptyIcon>
            <EmptyTitle>No Course Selected</EmptyTitle>
            <EmptyText>Select a course from the sidebar or create a new one to get started.</EmptyText>
          </EmptyState>
        </ContentWrapper>
      </MainContainer>
    );
  }

  const steps = [
    { title: "Prerequisites", content: prerequisites, icon: "check" },
    { title: "Course Content", content: courseContent, icon: "book" },
    { title: "Resources", content: resources, icon: "link" },
  ];

  return (
    <MainContainer>
      <ContentWrapper>
        <CourseHeader>
          <CourseTitle>{selectedCourse.title}</CourseTitle>
          <CourseMeta>
            Created on {new Date(selectedCourse.created_at).toLocaleDateString()}
          </CourseMeta>
        </CourseHeader>

        <AccordionList>
          <LearningSpine />
          {steps.map((step, index) => (
            <StepItem key={index + 1}>
              <StepIndicator>
                <StepNumber>{index + 1}</StepNumber>
              </StepIndicator>
              <StepContent>
                <StepAccordion
                  stepNumber={index + 1}
                  title={step.title}
                  content={step.content}
                  icon={step.icon}
                />
              </StepContent>
            </StepItem>
          ))}
        </AccordionList>
      </ContentWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  flex: 1;
  background: ${props => props.theme.name === 'dark'
    ? `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 166, 250, 0.1) 0%, transparent 60%), #18181F`
    : props.theme.colors.background};
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 32px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${props => props.theme.colors.surfaceBorder};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.primary};
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  max-width: 300px;
`;

const CourseHeader = styled.div`
  margin-bottom: 32px;
`;

const CourseTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  background: ${props => props.theme.name === 'dark'
    ? 'linear-gradient(135deg, #8BA6FA 0%, #A78BFA 50%, #DE8BFA 100%)'
    : `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.accent} 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const CourseMeta = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textMuted};
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  padding-left: 60px;

  @media (max-width: 640px) {
    padding-left: 48px;
    gap: 20px;
  }
`;

const LearningSpine = styled.div`
  position: absolute;
  left: 20px;
  top: 24px;
  bottom: 24px;
  width: ${props => props.theme.name === 'dark' ? '2px' : '3px'};
  background: ${props => props.theme.name === 'dark'
    ? 'linear-gradient(180deg, #8BA6FA 0%, #A78BFA 50%, #DE8BFA 100%)'
    : `linear-gradient(180deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.accent} 100%)`};
  border-radius: 2px;
  opacity: ${props => props.theme.name === 'dark' ? '0.5' : '0.6'};

  @media (max-width: 640px) {
    left: 16px;
    width: 2px;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const StepIndicator = styled.div`
  position: absolute;
  left: -60px;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    left: -48px;
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.name === 'dark'
    ? 'linear-gradient(135deg, #2A2A35 0%, #252530 100%)'
    : `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.accent} 100%)`};
  border: ${props => props.theme.name === 'dark' ? '2px solid #8BA6FA' : 'none'};
  color: ${props => props.theme.name === 'dark' ? '#A78BFA' : 'white'};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.name === 'dark' ? '0 4px 12px rgba(139, 166, 250, 0.2)' : `0 4px 12px ${props.theme.colors.primary}40`};
  z-index: 1;

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;
