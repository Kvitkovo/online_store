import axiosInstance from './httpClient';

export const addOrderToDB = async (request) => {
  try {
    const response = await axiosInstance.post('/orders', request);
    if (response.status === 200) {
      return response.data.id;
    } else {
      throw new Error(`Помилка: Отримано статус відповіді ${response.status}`);
    }
  } catch (error) {
    console.error(
      'Виникла помилка під час виконання запиту до сервера:',
      error.message,
    );
  }
};

export const getUsersOrders = async () => {
  const userId = localStorage.getItem('authId');
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    if (response.status === 200) {
      return response.data.content;
    } else {
      throw new Error(`Помилка: Отримано статус відповіді ${response.status}`);
    }
  } catch (error) {
    console.error('Помилка отримання данних', error.message);
    throw error;
  }
};
