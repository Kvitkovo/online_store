import axiosInstance from '../httpClient';

export const passwordReset = async ({ verificationCode, newPassword }) => {
  try {
    const response = await axiosInstance.post('/users/resetPassword', {
      verificationCode,
      newPassword,
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return true;
    }
  }
};
