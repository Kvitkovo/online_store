import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ContactDetails from '../../../account/ContactDetails';
import HomePageComponent from '../../../Layouts/HomePageComponent';

const RegisterConfirm = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        /* eslint-disable max-len */
        const response = await axios.get(
          `https://api.imperiaholoda.com.ua:4446/v1/users/email/${code}/confirm`,
        );
        if (response.status === 200) {
          navigate('/account');
          alert('Пошту підтверджено!');
        }
      } catch (error) {
        navigate('/');
        alert('Пошту не підтверджено!');
      }
    };

    confirmRegistration();
  }, [code, navigate]);

  return (
    <div>
      <ContactDetails />
      <HomePageComponent />
    </div>
  );
};

export default RegisterConfirm;
