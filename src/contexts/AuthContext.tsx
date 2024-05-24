import React, { createContext, useEffect, useState, ReactNode } from "react";
import { checkToken } from "../api/auth";
import Loading from "../pages/Loading/Loading";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const valid = await checkToken();
      setIsAuthenticated(valid);
      if (valid) {
        const userRole = localStorage.getItem("user_role");
        setRole(userRole);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, setIsAuthenticated, setRole }}
    >
      <div className="flex justify-center items-center h-screen">
        {loading ? (
          <div
            className={`transition-opacity duration-1000 ${
              loading ? "opacity-100" : "opacity-0"
            }`}
          >
            <Loading />
          </div>
        ) : (
          <div
            className={`transition-opacity duration-1000 ${
              !loading ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};
