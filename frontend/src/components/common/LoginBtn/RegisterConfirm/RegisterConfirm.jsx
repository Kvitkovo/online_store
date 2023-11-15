import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
/* import ContactDetails from '../../../account/ContactDetails'; */
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

const RegisterConfirm = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(true);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const toggleLogin = () => {
    setIsOpenLogin((prev) => !prev);
    setIsOpenRegister(false);
  };
  const toggleRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister((prev) => !prev);
  };
  const { code } = useParams();

  useEffect(() => {
    const confirmRegistration = async () => {
      const response = await axios.get(
        `https://api.imperiaholoda.com.ua:4446/v1/users/email/${code}/confirm`,
      );
      if (response.status === 200) {
        alert('Registration confirmed!');
      } else {
        alert('Registration confirmation failed');
      }
    };

    confirmRegistration();
  }, [code]);

  return (
    <div>
      {isOpenLogin && (
        <LoginModal toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
      )}
      {isOpenRegister && (
        <RegisterModal
          toggleLogin={toggleLogin}
          toggleRegister={toggleRegister}
        />
      )}

      {/* <ContactDetails /> */}
    </div>
  );
};

export default RegisterConfirm;
