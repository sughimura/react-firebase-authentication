import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Routes, Route, useNavigate, Link, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <h1>React Firebase Authentication Example</h1>
      <div style={{ margin: '2em' }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

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

function PublicPage() {
  return <h3>Public</h3>
}

export default App;
