import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              username: userData.username || firebaseUser.email!.split('@')[0],
              role: userData.role || 'admin'
            });
          } else {
            // If user doesn't exist in Firestore, create basic user data
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              username: firebaseUser.email!.split('@')[0],
              role: 'admin' // Default to admin for now
            });
          }
        } catch (error) {
          console.error('Error getting user data:', error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            username: firebaseUser.email!.split('@')[0],
            role: 'admin'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged
      toast({
        title: "Login realizado",
        description: "Bem-vindo de volta!",
      });
      return { error: null };
    } catch (error: any) {
      console.error('Erro no login:', error.message);
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
    // For now, disable signup as this should be admin-only
    const errorMessage = "Área Exclusiva para Administradores do Sistema";
    toast({
      title: "Erro no cadastro",
      description: errorMessage,
      variant: "destructive",
    });
    return { error: new Error(errorMessage) };
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
    } catch (error) {
      console.error('Logout error:', error);
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