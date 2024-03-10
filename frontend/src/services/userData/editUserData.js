import axiosInstance from '../httpClient';

export const editUserData = async (updatedData) => {
  const id = localStorage.getItem('authId');
  const token = localStorage.getItem('authToken');
  try {
    const response = await axiosInstance.put(`/users/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const updatedUserData = response.data;
      alert('User data updated successfully:', updatedUserData);
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
