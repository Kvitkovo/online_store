import axiosInstance from '../httpClient';

const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/v1/auth/login', {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return { status: 400 };
      }
    }
  }
};

const resetPasswordRequest = async (email) => {
  try {
    const response = await axiosInstance.post(
      `/v1/users/resetPassword/${email}`,
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const googleLoginRequest = async (token) => {
  try {
    const response = await axiosInstance.post('/v1/auth/google', {
      token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { loginUser, resetPasswordRequest, googleLoginRequest };
