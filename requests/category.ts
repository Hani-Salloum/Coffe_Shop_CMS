import api from '@/utils/axios';
import { Category } from '@/types/category';
import { ApiResponse } from '@/types/general';

//dashboard
//website
export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    // const res = await api.get<Category[]>('/categories');
    return { data: [
      { id: '1', name: 'cold' },
      { id: '2', name: 'hot' },
      { id: '3', name: 'iced' },
      { id: '4', name: 'beverage' },
      { id: '5', name: 'dessert' },
  ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch categories' };
  }
};

//dashboard
export const getCategoryById = async (id: string): Promise<ApiResponse<Category>> => {
  try {
    // const res = await api.get<Category>(`/categories/${id}`);
    return { data: { id: '1', name: 'cold' } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch category' };
  }
};

//dashboard
export const addCategory = async (
  data: Omit<Category, 'id'>
): Promise<ApiResponse<Category>> => {
  try {
    const res = await api.post<Category>('/categories', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add category' };
  }
};

//dashboard
export const updateCategoryById = async (
  id: string,
  data: Partial<Omit<Category, 'id'>>
): Promise<ApiResponse<Category>> => {
  try {
    const res = await api.put<Category>(`/categories/${id}`, data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update category' };
  }
};

//dashboard
export const deleteCategoryById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/categories/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete category' };
  }
};
