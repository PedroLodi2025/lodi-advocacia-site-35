import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@shared/schema';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on app load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiRequest('/api/auth/me');
      setUser(response.user);
    } catch (error) {
      // User not authenticated, which is fine
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiRequest('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      setUser(response.user);
      toast({
        title: "Login realizado",
        description: "Bem-vindo de volta!",
      });
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || "Erro no login";
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, username }),
      });
      
      setUser(response.user);
      toast({
        title: "Cadastro realizado",
        description: "Conta criada com sucesso!",
      });
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || "Erro no cadastro";
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await apiRequest('/api/auth/signout', {
        method: 'POST',
      });
      setUser(null);
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
    } catch (error) {
      // Even if the API call fails, clear local state
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
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