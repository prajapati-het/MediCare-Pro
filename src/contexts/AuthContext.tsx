import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getDoctorMapping,
  getHospitalForAdminHandle,
  normalizeAdminHandle,
  normalizeDoctorHandle,
} from "@/data/userMappings";

export type UserRole = 'admin' | 'doctor' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hospitalId?: string;
  hospitalName?: string;
  avatar?: string;
  doctorId?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to detect role from email using requested prefixes
const detectRoleFromEmail = (email: string): UserRole => {
  const username = email.split("@")[0].toLowerCase();
  if (username.endsWith("adn")) {
    return "admin";
  } else if (username.startsWith("dr")) {
    return "doctor";
  }
  return "guest";
};

const buildDisplayName = (username: string, role: UserRole) => {
  if (role === "admin") {
    return normalizeAdminHandle(username) || "Admin";
  }
  if (role === "doctor") {
    const cleaned = normalizeDoctorHandle(username);
    return cleaned ? `Dr. ${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}` : "Doctor";
  }
  return username || "User";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email.includes("@") || password.length < 4) {
      setIsLoading(false);
      return false;
    }

    const role = detectRoleFromEmail(email);
    if (role === "guest") {
      setIsLoading(false);
      return false;
    }

    const username = email.split("@")[0];
    const adminHandle = normalizeAdminHandle(username);
    const doctorHandle = normalizeDoctorHandle(username);
    const doctorMapping = role === "doctor" ? getDoctorMapping(doctorHandle) : undefined;
    const hospital =
      role === "admin"
        ? getHospitalForAdminHandle(adminHandle)
        : doctorMapping?.hospital;

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: buildDisplayName(username, role),
      role,
      hospitalId: hospital?.id,
      hospitalName: hospital?.name,
      doctorId: doctorMapping?.doctorId,
    };
    
    setUser(newUser);
    localStorage.setItem('hospital_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    

    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'admuser@hospital.com',
      name: 'Admin User',
      role: 'admin',
      hospitalId: 'city-general',
      hospitalName: 'City General Hospital',
    };
    setUser(googleUser);
    localStorage.setItem('hospital_user', JSON.stringify(googleUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
