import React, { useCallback, useEffect, useState } from 'react';
import OpenMenu from './OpenMenu';
import ClosedMenu from './ClosedMenu';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../../../../../redux/slices/catalogSlice';

const BurgerMenu = ({
  toggleCart,
  toggleMyBouquet,
  cartQuantity,
  toggleLogin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  return (
    <>
      {isOpen ? (
        <OpenMenu toggleMenu={toggleMenu} />
      ) : (
        <ClosedMenu
          toggleMenu={toggleMenu}
          toggleCart={toggleCart}
          toggleMyBouquet={toggleMyBouquet}
          toggleLogin={toggleLogin}
          cartQuantity={cartQuantity}
        />
      )}
    </>
  );
};

export default BurgerMenu;
