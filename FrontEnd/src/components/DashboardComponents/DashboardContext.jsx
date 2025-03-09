"use client";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [items, setItems] = useState(["Class 1", "Class 2", "Class 3", "Class 4"]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const addItem = (newItemName) => {
    setItems((prevItems) => [...prevItems, newItemName]);
  };

  return (
    <DashboardContext.Provider value={{ items, selectedItem, setSelectedItem, addItem }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);

/*
export function useDashboard() {
  return useContext(DashboardContext);
}

*/