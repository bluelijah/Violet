import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Use ref to always have access to current token
  const tokenRef = useRef(token);
  tokenRef.current = token;

  // Check if user is authenticated on mount
  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (authToken) => {
    const tokenToUse = authToken || tokenRef.current;

    if (!tokenToUse) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokenToUse}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalid, clear it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    const newToken = data.access_token;

    localStorage.setItem('token', newToken);
    setToken(newToken);
    tokenRef.current = newToken;

    // Fetch user data with the new token directly
    await fetchUser(newToken);

    return data;
  };

  const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    return await response.json();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    tokenRef.current = null;
    setUser(null);
  };

  const updatePreferences = async (learningStyle, preferencesText) => {
    const tokenToUse = tokenRef.current;

    const response = await fetch(`${API_URL}/auth/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenToUse}`
      },
      body: JSON.stringify({
        learning_style: learningStyle,
        preferences_text: preferencesText
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update preferences');
    }

    // Refresh user data to get updated preferences
    await fetchUser(tokenToUse);

    return await response.json();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updatePreferences,
    fetchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
