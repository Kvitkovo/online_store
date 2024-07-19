import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import Account from '../account/Account';

const ProtectedRoutes = ({ updateLoginStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const itemsToRemove = ['authToken', 'authId', 'userfetchedData', 'email'];

  const onExpire = () => {
    dispatch(logout());
    itemsToRemove.forEach((item) => localStorage.removeItem(item));
    updateLoginStatus(false);
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      const decodedTocken = jwtDecode(token);
      const currentTime = new Date().getTime();
      const expiryTime = new Date(decodedTocken.exp * 1000).getTime();
      const timeout = expiryTime - currentTime;

      if (timeout > 0) {
        setTimeout(onExpire, timeout);
      } else {
        onExpire();
      }
    }
  });

  return <Account>{token ? <Outlet /> : <Navigate to="/" />}</Account>;
};

export default ProtectedRoutes;
