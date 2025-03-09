"use client";
import { AccordionProvider } from "./AccordionContext";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import styles from "./ClassManagement.module.css";

export default function ClassManagement() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400&display=swap"
        rel="stylesheet"
      />
      <div className={styles.app}>
        <Sidebar />
        <AccordionProvider>
          <MainContent />
        </AccordionProvider>
      </div>
    </div>
  );
}
