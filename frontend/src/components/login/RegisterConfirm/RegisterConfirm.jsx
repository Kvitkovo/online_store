import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/* eslint-disable max-len */
import { registrationConfirm } from '../../../services/registration/registrationConfirm.service';
import RegistrationFailed from '../ConfirmationModals/RegistrationFailed';
import { handleUserData } from '../../../services/userData/handleUserData.service';
import { useDispatch } from 'react-redux';

const RegisterConfirm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        const { token, id } = await registrationConfirm(code);
        if (token && id) {
          const success = await handleUserData(token, id, navigate, dispatch);
          if (!success) {
            setError('Failed to fetch user data');
          }
        } else {
          setError('Token or ID is missing');
        }
      } catch (error) {
        setError('Error confirming registration');
      }
    };

    confirmRegistration();
  }, [code, navigate, dispatch]);
  if (error) {
    return <RegistrationFailed onClose={() => navigate('/')} />;
  }
  return null;
};

export default RegisterConfirm;
