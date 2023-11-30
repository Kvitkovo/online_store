import axiosInstance from '../httpClient';

export const registrationConfirm = async (code, navigate, setError) => {
  try {
    const response = await axiosInstance.get(`/users/email/${code}/confirm`);
    if (response.status === 200) {
      navigate('/account');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setError(error);
      console.error('Error confirming email:', error);
    }
  }
};
