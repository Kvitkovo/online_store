import axios from 'axios';
import { getLogoutUrl } from '../utils/utils';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
});

axiosInstance.interceptors.request.use((request) => {
  request.headers = {
    authorization: `Bearer ` + localStorage.getItem('authToken'),
  };
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const tempErrorObject = {
  validationResultList: [
    {
      validationMessage: 'Oops something went wrong!',
      severity: 0,
      validationCode: 0,
      validationTag: '',
      isValid: false,
    },
  ],
};

export const Post = (url, request, config) => {
  return new Promise((resolve) => {
    try {
      axiosInstance
        .post(url, request, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (
            err?.response?.headers['x-cpi-forbiddenreason'] === 'LogoutForced'
          ) {
            window.location.href = getLogoutUrl();
            return;
          }
          if (
            err.response &&
            ['400'].includes(err?.response?.status?.toString())
          ) {
            resolve(err.response.data);
          }
        });
    } catch (error) {
      resolve(tempErrorObject);
    }
  });
};

export const Get = (url, config) => {
  return new Promise((resolve, reject) => {
    try {
      axiosInstance
        .get(url, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          // if (err.response?.status == '301' || err.response?.status == '302'
          //   || err.response?.status == '501') {
          //   const refreshurl = getTokenRefreshUrl();
          //   window.location.href = refreshurl;
          // } else if (err.response && err.response.status == '400') {
          //   resolve(err.response.data);
          // } else {
          //   resolve(err);
          // }
          resolve(err);
        });
    } catch (error) {
      reject('exception');
    }
  });
};

export default axiosInstance;
