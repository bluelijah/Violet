"use client";
import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export function AccordionProvider({ children }) {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (stepNum) => {
    setExpandedStep(expandedStep === stepNum ? null : stepNum);
  };

  return (
    <AccordionContext.Provider value={{ expandedStep, toggleStep }}>
      {children}
    </AccordionContext.Provider>
  );
}

export const useAccordion = () => useContext(AccordionContext);
