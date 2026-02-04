"use client";
import { useState } from "react";
import styled from "styled-components";
import { useDashboard } from "./DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, ThemeToggle } from "../ui";

export function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { courses, selectedCourse, selectCourse, deleteCourse, loading } = useDashboard();
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleRouting = () => {
    navigate('/newCoursePage');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCourseClick = (course) => {
    selectCourse(course.id);
  };

  const handleDeleteClick = (e, course) => {
    e.stopPropagation();
    setCourseToDelete(course);
  };

  const confirmDelete = async () => {
    if (courseToDelete) {
      await deleteCourse(courseToDelete.id);
      setCourseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setCourseToDelete(null);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <TitleRow>
          <LogoContainer>
            <FlowerIcon size={28} />
            <Logo>Syllabud</Logo>
          </LogoContainer>
          <ThemeToggle />
        </TitleRow>

        <SectionTitle>
          My Courses
          <AddButton onClick={handleRouting} aria-label="Add new course">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2V18M2 10H18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </AddButton>
        </SectionTitle>

        <CourseList>
          {loading ? (
            <EmptyText>Loading...</EmptyText>
          ) : courses.length === 0 ? (
            <EmptyText>No courses yet. Create your first one!</EmptyText>
          ) : (
            courses.map((course) => (
              <CourseItem
                key={course.id}
                onClick={() => handleCourseClick(course)}
                $isSelected={course.id === selectedCourse?.id}
              >
                <CourseIcon>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </CourseIcon>
                <CourseTitle>{course.title}</CourseTitle>
                <DeleteButton
                  onClick={(e) => handleDeleteClick(e, course)}
                  aria-label="Delete course"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </DeleteButton>
              </CourseItem>
            ))
          )}
        </CourseList>
      </SidebarHeader>

      <SidebarFooter>
        <UserInfo>
          <UserAvatar>{user?.username?.charAt(0).toUpperCase()}</UserAvatar>
          <UserName>{user?.username}</UserName>
          <SettingsButton
            onClick={() => navigate('/preferences')}
            aria-label="Edit preferences"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SettingsButton>
        </UserInfo>
        <Button variant="ghost" onClick={handleLogout} style={{ width: '100%' }}>
          Sign Out
        </Button>
      </SidebarFooter>

      {courseToDelete && (
        <ModalOverlay onClick={cancelDelete}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Delete Course</ModalTitle>
            <ModalText>
              Are you sure you want to delete "{courseToDelete.title}"? This action cannot be undone.
            </ModalText>
            <ModalButtons>
              <Button variant="ghost" onClick={cancelDelete}>
                Cancel
              </Button>
              <DeleteConfirmButton onClick={confirmDelete}>
                Delete
              </DeleteConfirmButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  width: 300px;
  min-height: 100vh;
  background: ${props => props.theme.name === 'dark' ? '#1E1E28' : props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.15)' : props.theme.colors.surfaceBorder};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.15)' : props.theme.colors.surfaceBorder};
  }
`;

const SidebarHeader = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlowerIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="10" rx="6" ry="10" fill="#8B5CF6" opacity="0.9"/>
    <ellipse cx="14" cy="18" rx="6" ry="10" fill="#7C3AED" opacity="0.85" transform="rotate(-45 14 18)"/>
    <ellipse cx="34" cy="18" rx="6" ry="10" fill="#7C3AED" opacity="0.85" transform="rotate(45 34 18)"/>
    <ellipse cx="14" cy="30" rx="6" ry="10" fill="#6D28D9" opacity="0.8" transform="rotate(-90 14 30)"/>
    <ellipse cx="34" cy="30" rx="6" ry="10" fill="#6D28D9" opacity="0.8" transform="rotate(90 34 30)"/>
    <circle cx="24" cy="24" r="7" fill="#FCD34D"/>
    <circle cx="24" cy="24" r="4" fill="#F59E0B"/>
  </svg>
);

const Logo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 14px;
  border: 1px solid ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.2)' : props.theme.colors.surfaceBorder};
  background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.12)' : props.theme.colors.primaryLight};
  color: ${props => props.theme.name === 'dark' ? '#8BA6FA' : props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(167, 139, 250, 0.2)' : props.theme.colors.primary};
    border-color: ${props => props.theme.name === 'dark' ? '#A78BFA' : props.theme.colors.primary};
    color: ${props => props.theme.name === 'dark' ? '#A78BFA' : 'white'};
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const CourseList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 0 -12px;
  padding: 0 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.surfaceBorder};
    border-radius: 2px;
  }
`;

const EmptyText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: 14px;
  text-align: center;
  padding: 24px 0;
`;

const CourseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isSelected
    ? (props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.12)' : props.theme.colors.primaryLight)
    : 'transparent'};
  color: ${props => props.$isSelected
    ? (props.theme.name === 'dark' ? '#A78BFA' : props.theme.colors.primary)
    : props.theme.colors.text};
  border-left: ${props => props.$isSelected
    ? (props.theme.name === 'dark' ? '2px solid #8BA6FA' : '2px solid ' + props.theme.colors.primary)
    : '2px solid transparent'};
  margin-bottom: 4px;

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.08)' : props.theme.colors.backgroundSecondary};
  }
`;

const CourseIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.1)' : props.theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CourseTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${props => props.theme.colors.surfaceBorder};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  margin-left: auto;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.12)' : props.theme.colors.primaryLight};
    color: ${props => props.theme.name === 'dark' ? '#A78BFA' : props.theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  margin-left: auto;
  flex-shrink: 0;

  ${CourseItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${props => props.theme.name === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'};
    color: #ef4444;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${props => props.theme.name === 'dark' ? '#1E1E28' : props.theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  border: 1px solid ${props => props.theme.name === 'dark' ? 'rgba(139, 166, 250, 0.15)' : props.theme.colors.surfaceBorder};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ModalText = styled.p`
  margin: 0 0 24px 0;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DeleteConfirmButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #ef4444;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;
