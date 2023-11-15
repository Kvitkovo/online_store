import React, { useEffect } from 'react';
import './GoogleLogin.scss';
import axios from 'axios';

const GoogleLogin = ({ handleGoogleLogin }) => {
  useEffect(() => {
    async function handleCallbackResponse(response) {
      const token = response.credential;
      await sendTokenToBackend(token);
      handleGoogleLogin(token);
    }

    const sendTokenToBackend = async (token) => {
      return axios.post(
        'https://api.imperiaholoda.com.ua:4446/v1/auth/google',
        {
          token,
        },
      );
    };

    const initializeGoogleSignIn = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id:
          '1019151190572-o2ugc16c2c2d5p7hv6aic2j5di8m0nc4' +
          '.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });

      const options = {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: '312',
      };

      const signInDiv = document.getElementById('signInDiv');
      google.accounts.id.renderButton(signInDiv, options);
      google.accounts.id.prompt();
    };
    if (typeof google !== 'undefined' && google.accounts) {
      initializeGoogleSignIn();
    }
  }, [handleGoogleLogin]);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default GoogleLogin;
