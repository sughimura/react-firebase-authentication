import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({ user: '' });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>('');

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
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
