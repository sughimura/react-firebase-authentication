import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut as signOutFirebase } from 'firebase/auth';

interface AuthContextType {
  user: any;
  signOut: (callback: VoidFunction) => void;
}
const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>('');
  const [loading, setLoading] = useState(true);

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

  let signOut = (callback: VoidFunction) => {
    const auth = getAuth();
    signOutFirebase(auth).then(() => {
      console.log('sign out successful')
      setUser(null);
      callback();
    }).catch((error) => {
      console.log(error);
    });
  }

  const value = {
    user,
    signOut,
  };

  if (loading) {
    return <p>loading...</p>;
  } else {
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }
}
