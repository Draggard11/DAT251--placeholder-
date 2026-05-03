import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  student: Student | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (studentData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/me', {
        credentials: 'include'
      });
      if (response.ok) {
        const studentData = await response.json();
        setStudent(studentData);
      } else {
        setStudent(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setStudent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const studentData = await response.json();
    setStudent(studentData);
  };

  const register = async (studentData: any) => {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Registration failed');
    }

    const newStudent = await response.json();
    setStudent(newStudent);
  };

  const logout = () => {
    setStudent(null);
    // Optionally call logout endpoint if you have one
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    student,
    isLoading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
