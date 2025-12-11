import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hospital?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  'super@hospital.com': {
    id: '1',
    email: 'super@hospital.com',
    name: 'Dr. Sarah Mitchell',
    role: 'super_admin',
    avatar: undefined,
  },
  'admin@hospital.com': {
    id: '2',
    email: 'admin@hospital.com',
    name: 'Dr. James Wilson',
    role: 'admin',
    hospital: 'City General Hospital',
    avatar: undefined,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && password.length >= 4) {
      setUser(demoUser);
      localStorage.setItem('hospital_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return true;
    }
    
    // For any other email, create a guest admin user
    if (email.includes('@') && password.length >= 4) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'admin',
        hospital: 'Metro Health Center',
      };
      setUser(newUser);
      localStorage.setItem('hospital_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'admin',
      hospital: 'Metro Health Center',
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

  const setRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('hospital_user', JSON.stringify(updatedUser));
    }
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
        setRole,
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
