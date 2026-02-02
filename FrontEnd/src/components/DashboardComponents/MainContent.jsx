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
    const lines = text.split("\n");
    let currentSection = null;
    let extractedData = { prerequisites: [], courseContent: [], resources: [] };

    for (let line of lines) {
      let trimmedLine = line.trim();

      if (trimmedLine === "## Prerequisites") {
        currentSection = "prerequisites";
        continue;
      }
      if (trimmedLine === "## Course Content") {
        currentSection = "courseContent";
        continue;
      }
      if (trimmedLine === "## Resources") {
        currentSection = "resources";
        continue;
      }

      if (currentSection) {
        extractedData[currentSection].push(line);
      }
    }

    const formatContent = (content) => {
      return content
        .join("\n")
        .trim()
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\n/g, "<br />");
    };

    setPrerequisites(formatContent(extractedData.prerequisites) || "No prerequisites found.");
    setCourseContent(formatContent(extractedData.courseContent) || "No content found.");
    setResources(formatContent(extractedData.resources) || "No resources found.");
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
          {steps.map((step, index) => (
            <StepAccordion
              key={index + 1}
              stepNumber={index + 1}
              title={step.title}
              content={step.content}
              icon={step.icon}
            />
          ))}
        </AccordionList>
      </ContentWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  flex: 1;
  background: ${props => props.theme.colors.background};
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
  color: ${props => props.theme.colors.text};
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
  gap: 16px;
`;
