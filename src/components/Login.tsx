import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current ? emailRef.current.value : '';
    const password = passwordRef.current ? passwordRef.current.value : '';
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
  }

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user, token);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(error, errorCode, email);
        setError(errorMessage);
    });
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <div>
        <h1>ログイン</h1>
        {error && <p style={{ color: 'red' }} >{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input name="email" type="email" placeholder="email" ref={emailRef}/>
          </div>
          <div>
            <label>パスワード</label>
            <input name="password" type="password" placeholder="password" ref={passwordRef}/>
          </div>
          <div>
            <button>ログイン</button>
          </div>
          <div>
            ユーザ登録は<Link to={'/signup'}>こちら</Link>から
          </div>
        </form>
        <button onClick={handleGoogleLogin}>Googleログイン</button>
      </div>
    );
  }
};

export default Login;
