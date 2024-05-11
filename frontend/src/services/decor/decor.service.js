import axiosInstance from '../httpClient';

export const addDecorRequest = async (request) => {
  try {
    const response = await axiosInstance.post('/decor', request);
    if (response.status === 200) {
      return response.status;
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
