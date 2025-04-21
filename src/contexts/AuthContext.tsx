import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email: string;
  displayName: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockApiCall = async (ms: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, ms));
    setIsLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    await mockApiCall(1000);
    // Mock successful login
    setUser({
      id: '1',
      email,
      displayName: 'Skater Dude',
      experienceLevel: 'intermediate',
    });
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    await mockApiCall(1000);
    // Mock successful registration
    setUser({
      id: '1',
      email,
      displayName,
      experienceLevel: 'beginner',
    });
  };

  const signOut = async () => {
    await mockApiCall(500);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 