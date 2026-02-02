"use client";
import styled from "styled-components";
import { useDashboard } from "./DashboardContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, ThemeToggle } from "../ui";

export function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { courses, selectedCourse, selectCourse, loading } = useDashboard();

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

  return (
    <SidebarContainer>
      <SidebarHeader>
        <TitleRow>
          <Logo>VIOLET</Logo>
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
              </CourseItem>
            ))
          )}
        </CourseList>
      </SidebarHeader>

      <SidebarFooter>
        <UserInfo>
          <UserAvatar>{user?.username?.charAt(0).toUpperCase()}</UserAvatar>
          <UserName>{user?.username}</UserName>
        </UserInfo>
        <Button variant="ghost" onClick={handleLogout} style={{ width: '100%' }}>
          Sign Out
        </Button>
      </SidebarFooter>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  width: 300px;
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.surfaceBorder};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.surfaceBorder};
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.05);
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
  background: ${props => props.$isSelected ? props.theme.colors.primaryLight : 'transparent'};
  color: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.text};
  margin-bottom: 4px;

  &:hover {
    background: ${props => props.$isSelected ? props.theme.colors.primaryLight : props.theme.colors.backgroundSecondary};
  }
`;

const CourseIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.theme.colors.backgroundSecondary};
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
