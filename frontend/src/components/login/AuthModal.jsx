import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Modals from '../common/Modals';

const AuthModal = ({ isOpen, toggleModal }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthState = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Modals type="login" isOpen={isOpen} toggleModal={toggleModal}>
      {isLogin ? (
        <LoginModal
          toggleModal={toggleModal}
          toggleAuthState={toggleAuthState}
        />
      ) : (
        <RegisterModal
          toggleModal={toggleModal}
          toggleAuthState={toggleAuthState}
        />
      )}
    </Modals>
  );
};

export default AuthModal;
