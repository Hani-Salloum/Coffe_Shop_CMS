import api from '@/utils/axios';
import { GalleryImage } from '@/types/gallery';
import { ApiResponse } from '@/types/general';
import { objectToFormData } from '@/utils/formdata';

//dashboard
//website
export const getAllGalleryImages = async (): Promise<ApiResponse<GalleryImage[]>> => {
  try {
    // const res = await api.get<GalleryImage[]>('/gallery-images');
    return { data: [
      { id: 1, title: 'title 1', image: '/logo.jpg' },
      { id: 2, title: 'title 2', image: '/coffee_shop.jpg' },
      { id: 3, title: 'title 3', image: '/coffee_shop.jpg' },
      { id: 4, title: 'title 4', image: '/coffee_shop.jpg' },
      { id: 5, title: 'title 5', image: '/coffee_shop.jpg' },
      { id: 6, title: 'title 6', image: '/coffee_shop.jpg' },
    ]
   };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch gallery images' };
  }
};

//dashboard
export const addGalleryImage = async (
  data: Omit<GalleryImage, 'id'>
): Promise<ApiResponse<GalleryImage>> => {
  try {
    const payload = objectToFormData(data)
    const res = await api.post<GalleryImage>('/gallery-images', payload);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add gallery image' };
  }
};

//dashboard
export const deleteGalleryImageById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/gallery-images/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete gallery image' };
  }
};
