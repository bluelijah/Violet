"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const DashboardContext = createContext();

const API_URL = 'http://localhost:8000';

export function DashboardProvider({ children }) {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load courses from API
  useEffect(() => {
    if (token) {
      loadCourses();
    }
  }, [token]);

  async function loadCourses() {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        if (data.length > 0 && !selectedCourse) {
          // Load the first course's full content
          await selectCourse(data[0].id);
        }
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function selectCourse(courseId) {
    try {
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const course = await response.json();
        setSelectedCourse(course);
      }
    } catch (error) {
      console.error("Error loading course:", error);
    }
  }

  async function createCourse(query, depth) {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query, depth })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create course');
      }

      const newCourse = await response.json();
      setCourses(prev => [newCourse, ...prev]);
      setSelectedCourse(newCourse);
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }

  async function deleteCourse(courseId) {
    try {
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse(null);
        }
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  // Legacy support - map courses to items format
  const items = courses.map(c => c.title);
  const selectedItem = selectedCourse?.title;
  const setSelectedItem = (title) => {
    const course = courses.find(c => c.title === title);
    if (course) {
      selectCourse(course.id);
    }
  };

  return (
    <DashboardContext.Provider value={{
      courses,
      selectedCourse,
      loading,
      selectCourse,
      createCourse,
      deleteCourse,
      loadCourses,
      // Legacy support
      items,
      selectedItem,
      setSelectedItem,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
