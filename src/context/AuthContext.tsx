import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: any;
}
const AuthContext = createContext<AuthContextType>({ user: '' });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const value = {
    user,
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user.uid);
      }
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else {
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }
}
