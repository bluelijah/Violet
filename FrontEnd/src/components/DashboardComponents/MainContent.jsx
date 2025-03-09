
"use client";
import styles from "./MainContent.module.css";
import { useState, useEffect } from "react";
import { useDashboard } from "./DashboardContext";

export function MainContent() {
  const { selectedItem } = useDashboard();
  const [courseData, setCourseData] = useState({
    title: "Select a Course",
    prerequisites: [],
    content: [],
    resources: [],
  });

  useEffect(() => {
    if (!selectedItem) return;

    fetch(`/${selectedItem}`) // Load the selected course file
      .then((response) => response.text())
      .then((text) => parseCourseContent(text))
      .catch((error) => console.error("Error loading course data:", error));
  }, [selectedItem]);

  const parseCourseContent = (text) => {
    const sections = text.split("## "); // Split into sections
    let data = {
      title: "Course Not Found",
      prerequisites: [],
      content: [],
      resources: [],
    };

    sections.forEach((section) => {
      if (section.startsWith("Course Title")) {
        data.title = section.split("\n")[1].trim();
      } else if (section.startsWith("Prerequisites")) {
        data.prerequisites = section
          .split("\n")
          .slice(1)
          .filter((line) => line.startsWith("*"))
          .map((line) => line.replace("*", "").trim());
      } else if (section.startsWith("Course Content")) {
        data.content = section
          .split("\n")
          .slice(1)
          .filter((line) => line.startsWith("**"))
          .map((line) => line.replace("**", "").trim());
      } else if (section.startsWith("Resources")) {
        data.resources = section
          .split("\n")
          .slice(1)
          .filter((line) => line.startsWith("*"))
          .map((line) => line.replace("*", "").trim());
      }
    });

    setCourseData(data);
  };

  return (
    <main className={styles.mainContent}>
      <h2 className={styles.currentClass}>{courseData.title}</h2>

      <section>
        <h3>Prerequisites</h3>
        <ul>
          {courseData.prerequisites.map((prereq, index) => (
            <li key={index}>{prereq}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Course Content</h3>
        <ul>
          {courseData.content.map((module, index) => (
            <li key={index}>{module}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Resources</h3>
        <ul>
          {courseData.resources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
