import React, { useCallback, useEffect, useState } from 'react';
import OpenMenu from './OpenMenu';
import ClosedMenu from './ClosedMenu';
import { useLocation } from 'react-router-dom';

const BurgerMenu = ({ toggleCart, toggleMyBouquet, toggleLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

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
        />
      )}
    </>
  );
};

export default BurgerMenu;
