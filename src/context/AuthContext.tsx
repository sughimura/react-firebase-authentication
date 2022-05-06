import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut as signOutFirebase, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string, callback: VoidFunction) => void;
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

  let signIn = (email: string, password: string, callback: VoidFunction) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user.uid);
        callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const value = {
    user,
    signIn,
    signOut,
  };

  if (loading) {
    return <p>loading...</p>;
  } else {
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }
}
