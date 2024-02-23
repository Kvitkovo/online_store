import React, { useCallback, useEffect } from 'react';
import './GoogleLogin.scss';
import { sendTokenToBackend } from '../../../services/login/login.service';

const GoogleLogin = React.memo(({ handleGoogleLogin }) => {
  const handleCallbackResponse = useCallback(
    async (response) => {
      const token = response.credential;
      await sendTokenToBackend(token);
      handleGoogleLogin(token);
    },
    [handleGoogleLogin],
  );

  useEffect(() => {
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
  }, [handleCallbackResponse]);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
});

export default GoogleLogin;
