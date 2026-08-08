/**
 * Authentication Context
 * Provides user auth state across the app with JWT token management
 */

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { authService } from "@/api/authService";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "marketer" | "owner" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Verify token on app load
    const token = localStorage.getItem("teethmocure_token");
    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile as AuthUser);
    } catch (error) {
      // Invalid or expired token
      localStorage.removeItem("teethmocure_token");
      localStorage.removeItem("teethmocure_user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("teethmocure_token", response.token);
      localStorage.setItem("teethmocure_user", JSON.stringify(response.user));
      setUser(response.user as AuthUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("teethmocure_token");
    localStorage.removeItem("teethmocure_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
