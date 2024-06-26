import axiosInstance from '../httpClient';

export const fetchUserData = async () => {
  const id = localStorage.getItem('authId');
  const token = localStorage.getItem('authToken');

  try {
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const fetchedData = response.data;
      const email = fetchedData.email;
      localStorage.setItem('userfetchedData', JSON.stringify(fetchedData));
      localStorage.setItem('email', email);
      return fetchedData;
    }
  } catch (error) {
    console.error(
      'Error fetching user details:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
