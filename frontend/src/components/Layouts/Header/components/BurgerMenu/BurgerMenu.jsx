import React, { useCallback, useState } from 'react';
import OpenMenu from './OpenMenu';
import ClosedMenu from './ClosedMenu';

const BurgerMenu = ({ toggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);
  return (
    <>
      {isOpen ? (
        <OpenMenu toggleMenu={toggleMenu} />
      ) : (
        <ClosedMenu toggleMenu={toggleMenu} toggleCart={toggleCart} />
      )}
    </>
  );
};

export default BurgerMenu;
