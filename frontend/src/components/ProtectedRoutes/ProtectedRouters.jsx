import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';

const ProtectedRoutes = ({ updateLoginStatus }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('authToken'),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTokenExpirationTime = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  };

  const isTokenValid = (token) => {
    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) return false;
    const currentTime = new Date().getTime();
    return currentTime < expirationTime;
  };

  const handleAuthentication = () => {
    if (!auth.token || !isTokenValid(auth.token)) {
      const itemsToRemove = ['authToken', 'authId', 'userfetchedData', 'email'];
      itemsToRemove.forEach((item) => localStorage.removeItem(item));
      dispatch(logout());
      updateLoginStatus(false);
      setAuth({ token: null });
      navigate('/');
    }
  };
  useEffect(() => {
    handleAuthentication();
  });

  return <>{auth.token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
