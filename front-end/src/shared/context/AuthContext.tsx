import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    email?: string;
    role?: string;
    userId?: string;
  } | null;
  login: (token: string, role: string, userId: string) => void;
  logout: () => void;
  loading: boolean;
  redirectToUserDashboard: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in on mount
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    if (token) {
      // Set default Authorization header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser({
        role: role || undefined,
        userId: userId || undefined,
      });
    }

    setLoading(false);
  }, []);

  const login = useCallback((token: string, role: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    
    // Set default Authorization header for all axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setIsAuthenticated(true);
    setUser({
      role,
      userId,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    setIsAuthenticated(false);
    setUser(null);
    
    // Redirect to home page after logout
    navigate('/');
  }, [navigate]);
  
  // Function to redirect users to their appropriate dashboard based on role
  const redirectToUserDashboard = useCallback(() => {
    if (!isAuthenticated || !user) return;
    
    if (user.role === 'admin') {
      navigate('/admindashboard');
    } else {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    redirectToUserDashboard,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};