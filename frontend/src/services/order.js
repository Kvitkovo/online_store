import axiosInstance from './httpClient';

export const PostOrder = async (request) => {
  try {
    const response = await axiosInstance.post('/orders', {
      request,
    });

    alert(response);
  } catch (error) {
    console.error(error);
  }
};
