import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { checkToken } from '../api/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      console.log("ffffff1");
      const valid = await checkToken();
      setIsAuthenticated(valid);
      if (valid) {
        const userRole = localStorage.getItem('user_role');
        setRole(userRole);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, setIsAuthenticated, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
