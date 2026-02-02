"use client";
import styled from "styled-components";
import { AccordionProvider } from "../components/DashboardComponents/AccordionContext";
import { DashboardProvider } from "../components/DashboardComponents/DashboardContext";
import { Sidebar } from "../components/DashboardComponents/Sidebar";
import { MainContent } from "../components/DashboardComponents/MainContent";

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardProvider>
        <Sidebar />
        <AccordionProvider>
          <MainContent />
        </AccordionProvider>
      </DashboardProvider>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${props => props.theme.colors.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
