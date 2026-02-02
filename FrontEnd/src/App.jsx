import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import GlobalStyles from './styles/GlobalStyles'
import Login from './pages/LoginPage.jsx'
import Preferences from './pages/PreferencesPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'
import Signup from './pages/Signup.jsx'
import NewCoursePage from './pages/NewCoursePage.jsx'

// Loading spinner component
function LoadingScreen() {
  const { theme } = useTheme();
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: `linear-gradient(135deg, ${theme.colors.gradientStart} 0%, ${theme.colors.gradientEnd} 100%)`,
      fontFamily: '"Inter", sans-serif',
      fontSize: '18px',
      color: theme.colors.text,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: `3px solid ${theme.colors.surfaceBorder}`,
          borderTopColor: theme.colors.primary,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <span>Loading...</span>
      </div>
    </div>
  );
}

// Protected Route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Public Route - redirects to preferences or dashboard if authenticated
function PublicRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    if (!user?.preferences) {
      return <Navigate to="/preferences" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }/>
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }/>
      <Route path="/preferences" element={
        <ProtectedRoute>
          <Preferences />
        </ProtectedRoute>
      }/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }/>
      <Route path='/newCoursePage' element={
        <ProtectedRoute>
          <NewCoursePage />
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </Router>
  );
}

export default App
