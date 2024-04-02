import axiosInstance from '../httpClient';

export const changePassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const response = await axiosInstance.post(`/users/changePassword`, {
      email,
      oldPassword,
      newPassword,
    });

    if (response.status === 200) {
      return { success: true };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: 'Невірний пароль!' };
    }
    console.error(
      'Error updating user details:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
