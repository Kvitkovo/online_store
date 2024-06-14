import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import Account from '../account/Account';

const ProtectedRoutes = ({ isLoggedIn, updateLoginStatus }) => {
  let auth = { token: localStorage.getItem('authToken') };

  const handleAuthentication = () => {
    if (!auth.token && isLoggedIn) {
      updateLoginStatus(false);
    }
  };
  handleAuthentication();
  return (
    <>
      <Account>{auth.token ? <Outlet /> : <Navigate to="/" />}</Account>
    </>
  );
};

export default ProtectedRoutes;
