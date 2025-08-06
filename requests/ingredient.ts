import api from '@/utils/axios';
import { Ingredient } from '@/types/ingredient';
import { ApiResponse } from '@/types/general';

//dashboard
//website
export const getAllIngredients = async (): Promise<ApiResponse<Ingredient[]>> => {
  try {
    // const res = await api.get<ingredient[]>('/ingredients');
    return { data: [
      { id: '1', name: 'Milk' },
      { id: '2', name: 'Egg' },
      { id: '3', name: 'Sugar' },
  ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch ingredients' };
  }
};

//dashboard
export const getIngredientById = async (id: string): Promise<ApiResponse<Ingredient>> => {
  try {
    // const res = await api.get<ingredient>(`/ingredients/${id}`);
    return { data: { id: '1', name: 'Milk' } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch ingredient' };
  }
};

//dashboard
export const addIngredient = async (
  data: Omit<Ingredient, 'id'>
): Promise<ApiResponse<Ingredient>> => {
  try {
    const res = await api.post<Ingredient>('/ingredients', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add ingredient' };
  }
};

//dashboard
export const updateIngredientById = async (
  id: string,
  data: Partial<Omit<Ingredient, 'id'>>
): Promise<ApiResponse<Ingredient>> => {
  try {
    const res = await api.put<Ingredient>(`/ingredients/${id}`, data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update ingredient' };
  }
};

//dashboard
export const deleteIngredientById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/ingredients/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete ingredient' };
  }
};
