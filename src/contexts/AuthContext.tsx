
import { createContext, useState, useContext, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { currentUser, mockUsers, setCurrentUser } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // For demo, we're using a simple mock login
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate credentials against the backend
    const foundUser = mockUsers.find((u) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser.id);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
