import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <h1>React Firebase Authentication Example</h1>
      <div style={{ margin: '2em' }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<RequireAuth><ProtectedPage /></RequireAuth>}/>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

function PublicPage() {
  return <h3>Public</h3>
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function ProtectedPage() {
  return <h3>Protected</h3>
}

export default App;
