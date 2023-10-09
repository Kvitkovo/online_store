import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const ProtectedRoutes = () => {
  let auth = { token: true };
  return <>{auth.token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
