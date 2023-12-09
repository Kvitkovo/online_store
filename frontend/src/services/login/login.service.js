import axiosInstance from '../httpClient';

const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    if (response.status === 200) {
      const { token, id } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('authId', id);
      return { success: true };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: 'Невірна пошта та/або пароль!' };
    }
  }
};

const googleLoginRequest = async (token) => {
  const response = await axiosInstance.post('/auth/google', {
    token,
  });
  if (response && response.status === 200) {
    const authToken = response.data.token;
    localStorage.setItem('authToken', authToken);
    return true;
  }
};

const resetPasswordRequest = async (email) => {
  try {
    const response = await axiosInstance.post(`/users/resetPassword/${email}`);
    if (response.status === 200) {
      return { success: true };
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { success: true };
    } else if (error.response && error.response.status) {
      return { error: 'Електрона пошта не зареєстрована!' };
    }
  }
};

export { loginUser, resetPasswordRequest, googleLoginRequest };
