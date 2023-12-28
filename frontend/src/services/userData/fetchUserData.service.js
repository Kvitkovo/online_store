import axios from 'axios';

export const fetchUserData = async () => {
  const id = localStorage.getItem('authId');
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(
      `https://api.imperiaholoda.com.ua:4446/v1/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      const fetchedData = response.data;
      localStorage.setItem('userfetchedData', JSON.stringify(fetchedData));
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
