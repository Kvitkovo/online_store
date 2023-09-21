import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://195.191.104.138:4446',
  timeout: 1000,
});

export default axiosInstance;
