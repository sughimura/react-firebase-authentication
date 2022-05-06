import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
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
      });
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <div>
        <h1>ログイン</h1>
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
      </div>
    );
  }
};

export default Login;
