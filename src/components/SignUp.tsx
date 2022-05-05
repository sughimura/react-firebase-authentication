import React, { useRef } from 'react';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const emailPassword = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(emailRef.current?.value, emailPassword.current?.value)
  }
  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" ref={emailRef}/>
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" ref={emailPassword}/>
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
