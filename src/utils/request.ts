import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const REQUEST_TIMEOUT = 30000;

export const axiosClient = axios.create({
  // host api được cấu hình trong vite.config.ts -> thay đổi theo env
  baseURL: '/api',
  timeout: REQUEST_TIMEOUT,
});


const InterceptorsError = (error: AxiosError) => {
  // thông báo lỗi khi không gửi hay nhận được request
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('Lỗi: ', error);
  }
  return Promise.reject(error);
};

const InterceptorResponse = (response: AxiosResponse) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
};

axiosClient.interceptors.response.use(InterceptorResponse, InterceptorsError);