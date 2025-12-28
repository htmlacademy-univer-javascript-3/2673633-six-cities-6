import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '@/services/token/token.ts';
import { BASE_URL, TIMEOUT } from '@/constants/constants.ts';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  return api;
};
