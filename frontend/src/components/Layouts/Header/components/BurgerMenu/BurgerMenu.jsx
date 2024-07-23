import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../../../../../redux/slices/catalogSlice';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import OpenMenu from './OpenMenu';
import ClosedMenu from './ClosedMenu';

const BurgerMenu = ({
  toggleCart,
  toggleMyBouquet,
  cartQuantity,
  toggleLogin,
  flowerQuantity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const screen = useWindowSize();

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
    if (screen.width > 868) setIsOpen(false);
  }, [location.pathname, screen.width]);

  useEffect(() => {
    isOpen && document.body.classList.add('disableScroll');

    return () => {
      document.body.classList.remove('disableScroll');
    };
  }, [isOpen, screen.width]);

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
          flowerQuantity={flowerQuantity}
        />
      )}
    </>
  );
};

export default BurgerMenu;
