import axiosInstance from '../httpClient';

export const registerUser = async ({ firstName, email, password }) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      firstName,
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: 'Електронна пошта вже зареєстрована!!' };
    } else if (error.code === 'ECONNABORTED') {
      return true;
    }
  }
};
