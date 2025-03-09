"use client";
import { AccordionProvider } from "../components/DashboardComponents/AccordionContext";
import { DashboardProvider } from "../components/DashboardComponents/DashboardContext";

import { Sidebar } from "../components/DashboardComponents/Sidebar";
import { MainContent } from "../components/DashboardComponents/MainContent";
import styles from "./DashboardPage.module.css"; // Create this CSS file for page-level styling

export default function DashboardPage() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400&display=swap"
        rel="stylesheet"
      />
      <div className={styles.app}>
      <DashboardProvider>
        <Sidebar />
        <AccordionProvider>
          <MainContent />
        </AccordionProvider>
        </DashboardProvider>
      </div>
    </div>
  );
}
