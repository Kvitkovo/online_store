import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import SideMenu from '../account/SideMenu/SideMenu';
import styles from './ProtectedRouters.module.scss';

const ProtectedRoutes = () => {
  let auth = { token: true };
  return (
    <div className={styles.gridTwoBlocks}>
      <SideMenu />
      {auth.token ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default ProtectedRoutes;
