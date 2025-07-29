import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from "@uidotdev/usehooks";
import Cookies from 'js-cookie';
import { handleUnauthorized } from './handle-unauthorized';

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

let token = null

if (typeof window !== 'undefined') { // Checks if in browser
  token = localStorage.getItem('accessToken');
}

const axiosIns: AxiosInstance = axios.create({
  // withCredentials: false,
  baseURL: `${baseURL}/api`,
  // timeout: 10000, 
  headers: {
    // 'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  },
});

axiosIns.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
    //   const token = localStorage.getItem('accessToken');
    // // const [ token ] = useLocalStorage("accessToken", null);
    //   if (token) {
    //     config.headers!['Authorization'] = `Bearer ${token}`;
    //   }
    //   return config;
    if (typeof window === 'undefined') { 
        const cookieStore = require('next/headers').cookies()
        const token = cookieStore.get('accessToken')?.value
        if(token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } else {
        const token = Cookies.get('accessToken')
        if(token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      console.log(config.url)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response?.status === 401) {
      handleUnauthorized()
    }
    return Promise.reject(error);
  }
);

export default axiosIns;