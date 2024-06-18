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
  try {
    const response = await axiosInstance.get(`/orders/user/current`);
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
export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Помилка: Отримано статус відповіді ${response.status}`);
    }
  } catch (error) {
    console.error('Помилка отримання данних', error.message);
    throw error;
  }
};

export const cancelUserOrder = async (id) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}/cancel`);
    if (response.status === 200) {
      return response.data.id;
    } else {
      throw new Error(`Помилка: Отримано статус відповіді ${response.status}`);
    }
  } catch (error) {
    console.error(
      'Виникла помилка при зміні статусу замовлення',
      error.message,
    );
    throw error;
  }
};
