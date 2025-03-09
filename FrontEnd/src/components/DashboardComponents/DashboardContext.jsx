"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  useEffect(() => {
    async function loadItems() {
      try {
        // Adjust the path if your .txt file is stored elsewhere.
        const response = await fetch("../../../frontEndTextFiles/allTitles.txt");
        const text = await response.text();
        // Split the file by newline, trim spaces, and filter out empty lines.
        const fileItems = text.split("\n").map(line => line.trim()).filter(line => line);
        setItems(fileItems);
        if (fileItems.length > 0) {
          setSelectedItem(fileItems[0]);
        }
      } catch (error) {
        console.error("Error loading items from text file:", error);
      }
    }
    loadItems();
  }, []);

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
