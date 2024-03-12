import axios from 'axios';
import { updateUser } from '../../redux/slices/userSlice';

export const editUserData = async (updatedData, dispatch) => {
  const id = localStorage.getItem('authId');
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.put(
      `https://api.imperiaholoda.com.ua:4446/v1/users/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
