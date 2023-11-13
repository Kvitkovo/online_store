import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RegisterConfirm = () => {
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
      <p>Confirming registration...</p>
    </div>
  );
};

export default RegisterConfirm;
