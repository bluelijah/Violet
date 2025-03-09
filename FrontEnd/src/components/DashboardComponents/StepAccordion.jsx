// "use client";
// import { useAccordion } from "./AccordionContext";
// import styles from "./StepAccordion.module.css";

// export function StepAccordion({ stepNumber, title, content }) {
//   const { expandedStep, toggleStep } = useAccordion();
//   const isExpanded = expandedStep === stepNumber;

//   return (
//     <>
//       <button
//         className={styles.step}
//         aria-controls={`step-${stepNumber}-content`}
//         aria-expanded={isExpanded}
//         onClick={() => toggleStep(stepNumber)}
//         onKeyDown={(event) => {
//           if (event.key === "Enter" || event.key === " ") {
//             event.preventDefault();
//             toggleStep(stepNumber);
//           }
//         }}
//       >
//         <h3 className={styles.stepTitle}>{title}</h3>
//         <i
//           className={`${styles.icon} ${
//             isExpanded ? styles.iconUp : styles.iconDown
//           }`}
//         />
//       </button>
//       <div
//         id={`step-${stepNumber}-content`}
//         className={styles.stepContent}
//         style={{
//           maxHeight: isExpanded ? "1000px" : "0",
//           marginBottom: isExpanded ? "24px" : "0",
//         }}
//       >
//         <p>{content}</p>
//       </div>
//     </>
//   );
// }



"use client";
import { useAccordion } from "./AccordionContext";
import styles from "./StepAccordion.module.css";

export function StepAccordion({ stepNumber, title, content }) {
  const { expandedStep, toggleStep } = useAccordion();
  const isExpanded = expandedStep === stepNumber;

  return (
    <>
      <button
        className={styles.step}
        aria-controls={`step-${stepNumber}-content`}
        aria-expanded={isExpanded}
        onClick={() => toggleStep(stepNumber)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleStep(stepNumber);
          }
        }}
      >
        <h3 className={styles.stepTitle}>{title}</h3>
        <i
          className={`${styles.icon} ${
            isExpanded ? styles.iconUp : styles.iconDown
          }`}
        />
      </button>
      <div
  id={`step-${stepNumber}-content`}
  className={styles.stepContent}
  style={{
    maxHeight: isExpanded ? "none" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out",
  }}
>
  <div dangerouslySetInnerHTML={{ __html: content }} />
</div>
    </>
  );
}