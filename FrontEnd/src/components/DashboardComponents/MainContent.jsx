
"use client";
import { StepAccordion } from "./StepAccordion";
import styles from "./MainContent.module.css";

export function MainContent() {
  const steps = [
    { title: "Step 1:", content: "sturr stuff stff" },
    { title: "Step 2:", content: "sturr stuff stff" },
    { title: "Step 3:", content: "sturr stuff stff" },
    { title: "Step 4:", content: "sturr stuff stff" },
    { title: "Step 5:", content: "sturr stuff stff" },
    { title: "Step 6:", content: "sturr stuff stff" },
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
/*


"use client";
import { useDashboard } from "./DashboardContext";
import styles from "./MainContent.module.css";

export function MainContent() {
  const { selectedItem } = useDashboard();

  return (
    <main className={styles.mainContent}>
      <h2 className={styles.currentClass}>{selectedItem || "No class selected"}</h2>
      {/* Render your steps or details based on selectedItem * /}
      <p>Additional content for {selectedItem} goes here...</p>
    </main>
  );
}
*/