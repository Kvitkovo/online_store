import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDataFetcher = async () => {
  const id = localStorage.getItem('authId');
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
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
      localStorage.setItem('userData', JSON.stringify(fetchedData));
      navigate('/account', { state: { userData: fetchedData } });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};
export default UserDataFetcher;
