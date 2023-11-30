import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactDetails from '../../../account/ContactDetails';
import HomePageComponent from '../../../Layouts/HomePageComponent';
/* eslint-disable max-len */
import { registrationConfirm } from '../../../../services/registration/registrationConfirm.service';
import RegistrationFailed from '../ConfirmationModals/RegistrationFailed';

const RegisterConfirm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    registrationConfirm(code, navigate, setError);
  }, [code, navigate, setError]);

  return (
    <div>
      {error ? (
        <RegistrationFailed onClose={() => navigate('/')} />
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
