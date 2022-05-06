import React, { useRef, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = useAuth();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current ? emailRef.current.value : '';
    const password = passwordRef.current ? passwordRef.current.value : '';

    auth.signIn(email, password, () => {
      navigate("/home", { replace: true });
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
    return <Navigate to={"/home"} replace />;
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
