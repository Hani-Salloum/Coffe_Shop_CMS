import api from '@/utils/axios';
import { Size } from '@/types/size';
import { ApiResponse } from '@/types/general';

//dashboard
//website
export const getAllSizes = async (): Promise<ApiResponse<Size[]>> => {
  try {
    // const res = await api.get<size[]>('/sizes');
    return { data: [
      { id: '1', name: 'Small' },
      { id: '2', name: 'Medium' },
      { id: '3', name: 'Large' },
  ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch sizes' };
  }
};

//dashboard
export const getSizeById = async (id: string): Promise<ApiResponse<Size>> => {
  try {
    // const res = await api.get<size>(`/sizes/${id}`);
    return { data: { id: '1', name: 'Small' } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch size' };
  }
};

//dashboard
export const addSize = async (
  data: Omit<Size, 'id'>
): Promise<ApiResponse<Size>> => {
  try {
    const res = await api.post<Size>('/sizes', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add size' };
  }
};

//dashboard
export const updateSizeById = async (
  id: string,
  data: Partial<Omit<Size, 'id'>>
): Promise<ApiResponse<Size>> => {
  try {
    const res = await api.put<Size>(`/sizes/${id}`, data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update size' };
  }
};

//dashboard
export const deleteSizeById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/sizes/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete size' };
  }
};
