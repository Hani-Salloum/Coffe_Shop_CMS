import api from '@/utils/axios';
import { Item } from '@/types/item';
import { ApiResponse } from '@/types/general';
import { objectToFormData } from '@/utils/formdata';

interface AllItemsParams {
    search: string, category: string, min_price: number, max_price: number  
}

//dashboard
//website
// export const getAllItems = async (): Promise<ApiResponse<Item[]>> => {
export const getAllItems = async () => {
  // console.log(params)
  // https://tatianatay.pythonanywhere.com/coffeeshop/item/
  try {
    // const res = await api.get<Item[]>('/item', { params });
    // const res = await api.get<Item[]>('/item/');
    // console.log(res.data)
    return { data: [
      {
        id: 1,
        name: "Premium Espresso Blend",
        price: 24.99,
        avg_rating: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg',
        reviews: [
          {
            id: 1, 
            rate: 4,
            email: 'hani2003s@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 2, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
        ]
      },
      {
        id: 2,
        name: "Premium Espresso Blend",
        price: 24.99,
        avg_rating: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg',
        reviews: [
          {
            id: 1, 
            rate: 4,
            email: 'hani2003s@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 2, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
        ]
      },
      {
        id: 3,
        name: "Premium Espresso Blend",
        price: 24.99,
        avg_rating: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg',
        reviews: [
          {
            id: 1, 
            rate: 4,
            email: 'hani2003s@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 2, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 3, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 4, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 5, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
          {
            id: 6, 
            rate: 3,
            email: 'hiba@gmail.com',
            description: 'description description description description description description description description ',
          },
        ]
      }
    ] };
  } catch (error: any) {
    console.log(error?.response?.data?.message)
    return { error: error?.response?.data?.message || 'Failed to fetch items' };
  }
};

//website
// export const getTodayPicks = async (): Promise<ApiResponse<Item[]>> => {
export const getTodayPicks = async () => {
  try {
    // const res = await api.get<Item[]>('/today-picks');
    return { data: [
      {
        id: 1,
        name: "Premium Espresso Blend",
        price: 24.99,
        rate: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg',
      },
      {
        id: 1,
        name: "Premium Espresso Blend",
        price: 24.99,
        rate: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg'
      },
      {
        id: 1,
        name: "Premium Espresso Blend",
        price: 24.99,
        rate: 4.8,
        categories: ["Premium", "Espresso", "Organic"],
        image: '/hero_img.jpeg'
      }
    ]};
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch items' };
  }
};

//dashboard
//website
// export const getItemById = async (id: string): Promise<ApiResponse<Item>> => {
export const getItemById = async (id: string) => {
  try {
    // const res = await api.get<Item>(`/item/${id}/`);
    // console.log(res.data)
    return { data: {
      id: 1,
      name: "Premium Espresso Blend",
      price: 24.99,
      rate: 4.8,
      categories: [{id: '1', name: 'cold'}],
      related_items: [{id: '2', name: 'Premium Espresso Blend'}],
      sizes: [{ id: '1', name: 'Small' }, { id: '2', name: 'Medium' }],
      ingredients: [{ id: '1', name: 'Milk' }, { id: '3', name: 'Sugar' }],
      description: 'test test',
      origin_story: 'test test',
      image: '/hero_img.jpeg'
    } };
  } catch (error: any) {
    console.log(error?.response?.data?.message)
    return { error: error?.response?.data?.message || 'Failed to fetch item' };
  }
};

//dashboard
export const addItem = async (
  data: Omit<Item, 'id'>
): Promise<ApiResponse<Item>> => {
  try {
    const formData = objectToFormData(data)
    const res = await api.post<Item>('/items', formData);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add Item' };
  }
};

//dashboard
export const updateItemById = async (
  id: string,
  data: Partial<Omit<Item, 'id'>>
): Promise<ApiResponse<Item>> => {
  try {
    const payload = objectToFormData(data)
    const res = await api.put<Item>(`/items/${id}`, payload);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update Item' };
  }
};

//dashboard
export const deleteItemById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/items/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete Item' };
  }
};
