import { updateUser } from '../../redux/slices/userSlice';
import axiosInstance from '../httpClient';

export const editUserData = async (updatedData, dispatch) => {
  const id = localStorage.getItem('authId');
  try {
    const response = await axiosInstance.put(`/users/${id}`, updatedData, {});

    if (response.status === 200) {
      const updatedUserData = response.data;
      dispatch(updateUser(updatedUserData));
      return updatedUserData;
    }
  } catch (error) {
    console.error(
      'Error updating user details:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
