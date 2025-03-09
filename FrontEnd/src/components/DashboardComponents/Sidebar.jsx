"use client";
import { useDashboard } from "./DashboardContext";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  // Access the items and the helper functions from the context
  const { items, selectedItem, setSelectedItem, addItem } = useDashboard();
/*
  // Example handler for adding a new item
  function handleAdd() {
    const name = prompt("Enter new class name:");
    if (name) {
      addItem(name);
    }
  }
*/
    // Handle item click and perform any extra actions
    const handleItemClick = (item) => {
      setSelectedItem(item);
      // You can add additional functionality here:
      console.log("Selected item:", item);
      // For example, trigger a data fetch or navigation if needed.
    };
  

    return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <header className={styles.titleContainer}>
            <h1 className={styles.title}>My Classes</h1>
            <button className={styles.addButton}/* onClick={handleAdd} aria-label="Add new class"*/>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 2V30M2 16H30"
                  stroke="#303030"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </header>
  
          {/* Render the list of classes */}
          <ul>
            {items.map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={styles.sidebarItem}
                style={{
                  cursor: "pointer",
                  fontWeight: item === selectedItem ? "bold" : "normal",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }