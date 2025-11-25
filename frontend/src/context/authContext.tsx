"use client";

import "dotenv/config"
import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/interfaces"; 

// context definition
interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const login = async (inputs: any) => {
    const res = await axios.post(`${process.env.BACKEND_BASE_URL}/api/auth/login`, inputs, {
        withCredentials: true 
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${process.env.BACKEND_BASE_URL}/api/auth/logout`, null, {
        withCredentials: true
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};