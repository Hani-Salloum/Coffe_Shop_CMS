// lib/apiClient.ts
'use server'; // for redirect support on server

import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

async function handleRequest(promise: Promise<any>) {
  try {
    const res = await promise;
    return res;
  } catch (error: any) {
    if (error.response?.status === 401) {
      if (isServer) {
        redirect('/login');
      } else {
        window.location.href = '/login';
      }
    }
    throw error;
  }
}

export const apiGet = async (url: string, config: AxiosRequestConfig = {}) => {
    // console.log(url)
  return await handleRequest(axiosInstance.get(url, config));
};

export const apiPost = async (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return await handleRequest(axiosInstance.post(url, data, config));
};

export const apiPatch = async (url: string, data = {}, config: AxiosRequestConfig = {}) => {
  return await handleRequest(axiosInstance.patch(url, data, config));
};

export const apiDelete = async (url: string, config: AxiosRequestConfig = {}) => {
  return await handleRequest(axiosInstance.delete(url, config));
};
