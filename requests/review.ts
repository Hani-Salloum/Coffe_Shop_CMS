import api from '@/utils/axios';
import { Review } from '@/types/review';
import { ApiResponse } from '@/types/general';

//dashboard
//website
export const getAllReviews = async (): Promise<ApiResponse<Review[]>> => {
  try {
    const res = await api.get<Review[]>('/reviews');
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch reviews' };
  }
};

//website
export const getReviewById = async (id: string): Promise<ApiResponse<Review>> => {
  try {
    const res = await api.get<Review>(`/reviews/${id}`);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch review' };
  }
};

//website
export const addReview = async (
  data: Omit<Review, 'id'>
): Promise<ApiResponse<Review>> => {
  try {
    const res = await api.post<Review>('/reviews', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add review' };
  }
};

//website
export const updateReviewById = async (
  id: string,
  data: Partial<Omit<Review, 'id'>>
): Promise<ApiResponse<Review>> => {
  try {
    const res = await api.put<Review>(`/reviews/${id}`, data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update review' };
  }
};

//dashboard
//website
export const deleteReviewById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/reviews/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete review' };
  }
};
