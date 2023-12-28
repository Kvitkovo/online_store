import axiosInstance from '../httpClient';

export const registrationConfirm = async (code, setError) => {
  try {
    const response = await axiosInstance.get(`/users/email/${code}/confirm`);

    if (response.status === 200) {
      const { token, id } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('authId', id);

      return { token, id };
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.response && error.response.status === 404) {
      setError(error);
    } else if (error.code === 'ECONNABORTED') {
      return true;
    }
  }
};
