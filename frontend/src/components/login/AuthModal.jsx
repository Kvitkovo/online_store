import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Modals from '../common/Modals';

const AuthModal = () => {
  const [modalType, setModalType] = useState('login');

  const toggleModal = (type) => {
    setModalType(type);
  };
  return (
    <Modals type={modalType} onClick={() => toggleModal('login')}>
      {modalType === 'login' ? (
        <LoginModal toggleModal={toggleModal} />
      ) : (
        <RegisterModal toggleModal={toggleModal} />
      )}
    </Modals>
  );
};

export default AuthModal;
