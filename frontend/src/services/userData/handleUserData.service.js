import { fetchUserData } from './fetchUserData.service';
import { login } from '../../redux/slices/userSlice';

export const handleUserData = async (token, id, navigate, dispatch) => {
  try {
    const fetchedData = await fetchUserData(token, id);
    if (fetchedData) {
      const userData = {
        firstName: fetchedData.firstName,
        lastName: fetchedData.lastName,
        surname: fetchedData.surname,
        phone: fetchedData.phone,
        email: fetchedData.email,
        birthday: fetchedData.birthday,
      };
      dispatch(login(userData));
      navigate('/account', { state: { userData: fetchedData } });
    } else {
      console.error('Error: User data is undefined');
      navigate('/');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
