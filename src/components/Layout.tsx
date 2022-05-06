import AuthStatus from './AuthStatus';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

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
        <li>
          <Link to="/home">Home Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Layout;
