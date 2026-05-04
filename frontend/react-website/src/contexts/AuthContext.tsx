import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  student: Student | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (studentData: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
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
      const response = await fetch("http://localhost:8080/me", {
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok || !contentType?.includes("application/json")) {
        setStudent(null);
        return;
      }

      const studentData = await response.json();
      setStudent(studentData);
    } catch (error) {
      console.error("Auth check failed:", error);
      setStudent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    await checkAuth();
  };

  const register = async (studentData: RegisterPayload) => {
    const body: Record<string, string> = {
      name: studentData.name.trim(),
      email: studentData.email.trim(),
      password: studentData.password,
    };
    if (studentData.dateOfBirth) {
      body.dateOfBirth = studentData.dateOfBirth;
    }

    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Registration failed");
    }

    await response.json();
    await login(studentData.email.trim(), studentData.password);
  };

  const logout = async () => {
    setStudent(null);
    await fetch("http://localhost:8080/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
