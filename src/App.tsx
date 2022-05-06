import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <SignUp />
      </div>
    </AuthProvider>
  );
}

export default App;
