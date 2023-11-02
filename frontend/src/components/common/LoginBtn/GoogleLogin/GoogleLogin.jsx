import React, { useEffect } from 'react';
import './GoogleLogin.scss';
import axios from 'axios';

const GoogleLogin = () => {
  useEffect(() => {
    async function handleCallbackResponse(response) {
      const token = response.credential;
      const axiosResponse = await sendTokenToBackend(token);
      alert(
        'Token sent to the backend and response received:',
        axiosResponse.data,
      );
    }

    const sendTokenToBackend = async (token) => {
      return axios.post(
        'https://api.imperiaholoda.com.ua:4446/v1/auth/google',
        {
          token,
        },
      );
    };

    /* global google */
    google.accounts.id.initialize({
      client_id:
        '1019151190572-o2ugc16c2c2d5p7hv6aic2j5di8m0nc4' +
        '.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      logo_alignment: 'center',
      width: '312',
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default GoogleLogin;
