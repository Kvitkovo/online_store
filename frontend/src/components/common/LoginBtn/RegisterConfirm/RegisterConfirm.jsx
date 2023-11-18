import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ContactDetails from '../../../account/ContactDetails';
import HomePageComponent from '../../../Layouts/HomePageComponent';
import ResentLink from '../ConfirmationModals/ResentLink';

const RegisterConfirm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
        if (error.response && error.response.status === 404) {
          setError(error);
          console.error('Error confirming email:', error);
        }
      }
    };

    confirmRegistration();
  }, [code, navigate]);

  return (
    <div>
      {error ? (
        <ResentLink onClose={() => navigate('/')} />
      ) : (
        <>
          <ContactDetails />
          <HomePageComponent />
        </>
      )}
    </div>
  );
};

export default RegisterConfirm;
