/*

"use client";
import { useState, useEffect } from "react";
import { StepAccordion } from "./StepAccordion";
import styles from "./MainContent.module.css";

export function MainContent() {
  const [prerequisites, setPrerequisites] = useState("Loading...");
  const [courseContent, setCourseContent] = useState("Loading...");
  const [resources, setResources] = useState("Loading...");

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch("../../../public/From Components to Code Building Your Own Computer.txt"); // Ensure file is inside `public/`
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();

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

        setPrerequisites(extractedData.prerequisites.join("\n").trim() || "No content found.");
        setCourseContent(extractedData.courseContent.join("\n").trim() || "No content found.");
        setResources(extractedData.resources.join("\n").trim() || "No content found.");
      } catch (error) {
        console.error("Error loading file:", error);
        setPrerequisites("Error loading prerequisites.");
        setCourseContent("Error loading course content.");
        setResources("Error loading resources.");
      }
    }

    fetchFile();
  }, []);

  const steps = [
    { title: "Prerequisites:", content: prerequisites },
    { title: "Course Content:", content: courseContent },
    { title: "Resources:", content: resources },
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
  const [prerequisites, setPrerequisites] = useState("Loading...");
  const [courseContent, setCourseContent] = useState("Loading...");
  const [resources, setResources] = useState("Loading...");

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch("../../../public/From Components to Code Building Your Own Computer.txt"); // Ensure file is inside `public/`
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();

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
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold formatting
            .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics formatting
            .replace(/\n/g, "<br />"); // Line breaks
        };

        setPrerequisites(formatContent(extractedData.prerequisites) || "No content found.");
        setCourseContent(formatContent(extractedData.courseContent) || "No content found.");
        setResources(formatContent(extractedData.resources) || "No content found.");
      } catch (error) {
        console.error("Error loading file:", error);
        setPrerequisites("Error loading prerequisites.");
        setCourseContent("Error loading course content.");
        setResources("Error loading resources.");
      }
    }

    fetchFile();
  }, []);

  const steps = [
    { title: "Prerequisites:", content: prerequisites },
    { title: "Course Content:", content: courseContent },
    { title: "Resources:", content: resources },
  ];

  return (
    <main className={styles.mainContent} style={{ textAlign: "left" }}> {/* Align text to the left */}
      <h2 className={styles.currentClass} style={{ textAlign: "left" }}>Current Class Name</h2>
      {steps.map((step, index) => (
        <StepAccordion
          key={index + 1}
          stepNumber={index + 1}
          title={step.title}
          content={step.content} // Pass content as a string
        />
      ))}
    </main>
  );
}
