/*
"use client";
import { StepAccordion } from "./StepAccordion";
import styles from "./MainContent.module.css";

export function MainContent() {

  const steps = [
    { title: "Prerequisites:", content: "sturr stuff stff"}, // Add File Data To Content Here
    { title: "Corse Content:", content: "sturr stuff stff" },
    { title: "Resources:", content: "sturr stuff stff" },

  ];

  return (
    <main className={styles.mainContent}>
      <h2 className={styles.currentClass}>Current Class Name</h2>
      {steps.map((step, index) => (
        <StepAccordion
          key={index + 1}
          stepNumber={index + 1}
          title={step.title}
          content={step.content}
        />
      ))}
    </main>
  );
}
*/

"use client";
import { useState, useEffect } from "react";
import { StepAccordion } from "./StepAccordion";
import styles from "./MainContent.module.css";

export function MainContent() {
  const [fileContent, setFileContent] = useState("Loading...");
  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch("../../../public/From Components to Code Building Your Own Computer.txt"); // Make sure the file is inside `public/`
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();

        // Extract content between "## Prerequisites" and "## Course Content"
        const lines = text.split("\n");
        let capturing = false;
        let extractedLines = [];

        for (let line of lines) {
          if (line.trim() === "## Course Content") break;
          if (capturing) extractedLines.push(line);
          if (line.trim() === "## Prerequisites") capturing = true;
        }

        setFileContent(extractedLines.join("\n").trim() || "No content found.");
      } catch (error) {
        console.error("Error loading file:", error);
        setFileContent("Error loading prerequisites.");
      }
    }

    fetchFile();
  }, []);

  const steps = [
    { title: "Prerequisites:", content: fileContent }, // Dynamic File Data
    { title: "Course Content:", content: "sturr stuff stff" },
    { title: "Resources:", content: "sturr stuff stff" },
  ];

  return (
    <main className={styles.mainContent}>
      <h2 className={styles.currentClass}>Current Class Name</h2>
      {steps.map((step, index) => (
        <StepAccordion
          key={index + 1}
          stepNumber={index + 1}
          title={step.title}
          content={step.content}
        />
      ))}
    </main>
  );
}
