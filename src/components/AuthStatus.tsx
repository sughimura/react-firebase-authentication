import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>Your are not logged in.</p>
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
    </p>
  )
}

export default AuthStatus;
