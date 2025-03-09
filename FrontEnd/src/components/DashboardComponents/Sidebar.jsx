import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <header className={styles.titleContainer}>
          <h1 className={styles.title}>My Classes</h1>
          <button className={styles.addButton} aria-label="Add new class">
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
        <section className={styles.courseItem}>
          <h2 className={styles.courseTitle}>Course Title:</h2>
          <p className={styles.courseName}>Things, Stuff, and Shit</p>
        </section>
      </div>
    </aside>
  );
}
