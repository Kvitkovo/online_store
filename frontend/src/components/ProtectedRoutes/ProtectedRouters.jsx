import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const ProtectedRoutes = ({ isLoggedIn, updateLoginStatus }) => {
  let auth = { token: true };
  const handleAuthentication = () => {
    if (!auth.token && isLoggedIn) {
      updateLoginStatus(false);
    }
  };
  handleAuthentication();
  return <>{auth.token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
