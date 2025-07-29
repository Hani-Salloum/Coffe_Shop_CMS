import api from '@/utils/axios';
import { Barista } from '@/types/barista';
import { ApiResponse } from '@/types/general';
import { objectToFormData } from '@/utils/formdata';

//dashboard
//website
export const getAllBaristas = async (): Promise<ApiResponse<Barista[]>> => {
  try {
    // const res = await api.get<Barista[]>('/baristas');
    return { data: [
      {
        id: 1,
        name: "Elena Rodriguez",
        image: "/hani_salloum.jpg",
        age: 32,
        position: "Head Barista",
        experience_years: 8,
        nationality: { code: "italy", name: "Italian" },
        description:
          "Elena is our passionate Head Barista, known for her exceptional latte art and deep knowledge of coffee origins. She believes every cup is an opportunity to create a moment of joy. Her dedication to the craft ensures every beverage is a masterpiece.",
      },
      {
        id: 2,
        name: "Marcus Chen",
        image: "/hani_salloum.jpg",
        age: 28,
        position: "Lead Roaster & Barista",
        experience_years: 6,
        nationality: { code: "france", name:"France" },
        description:
          "Marcus brings a unique perspective from his family's coffee farm in Brazil. He oversees our roasting process, ensuring each bean reaches its peak flavor before it's brewed to perfection. His expertise guarantees a rich and consistent taste.",
      },
      {
        id: 3,
        name: "Sophia Lee",
        image: "/hani_salloum.jpg",
        age: 25,
        position: "Specialty Coffee Barista",
        experience_years: 4,
        nationality: { code: "south-korea", name: "South Korean" },
        description:
          "Sophia is our expert in specialty brews, always experimenting with new methods to highlight the subtle notes in our single-origin coffees. Her precision and dedication are unmatched, creating unique and memorable coffee experiences.",
      },
      {
        name: "Elena Rodriguez",
        image: "/hani_salloum.jpg",
        age: 32,
        position: "Head Barista",
        experience_years: 8,
        nationality: { code: "italy", name: "Italian" },
        description:
          "Elena is our passionate Head Barista, known for her exceptional latte art and deep knowledge of coffee origins. She believes every cup is an opportunity to create a moment of joy. Her dedication to the craft ensures every beverage is a masterpiece.",
      },
      {
        name: "Marcus Chen",
        image: "/hani_salloum.jpg",
        age: 28,
        position: "Lead Roaster & Barista",
        experience_years: 6,
        nationality: { code: "france", name:"France" },
        description:
          "Marcus brings a unique perspective from his family's coffee farm in Brazil. He oversees our roasting process, ensuring each bean reaches its peak flavor before it's brewed to perfection. His expertise guarantees a rich and consistent taste.",
      },
      {
        name: "Sophia Lee",
        image: "/hani_salloum.jpg",
        age: 25,
        position: "Specialty Coffee Barista",
        experience_years: 4,
        nationality: { code: "south-korea", name: "South Korean" },
        description:
          "Sophia is our expert in specialty brews, always experimenting with new methods to highlight the subtle notes in our single-origin coffees. Her precision and dedication are unmatched, creating unique and memorable coffee experiences.",
      },
    ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch baristas' };
  }
};

//dashboard
export const getBaristaById = async (id: string): Promise<ApiResponse<Barista>> => {
  try {
    // const res = await api.get<Barista>(`/baristas/${id}`);
    return { data: {
      id: 1,
      name: "Elena Rodriguez",
      image: "/hani_salloum.jpg",
      age: 32,
      position: "Head Barista",
      experience_years: 8,
      nationality: { code: "italy", name: "Italian" },
      description:
        "Elena is our passionate Head Barista, known for her exceptional latte art and deep knowledge of coffee origins. She believes every cup is an opportunity to create a moment of joy. Her dedication to the craft ensures every beverage is a masterpiece.",
    }};
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch barista' };
  }
};

//dashboard
export const addBarista = async (
  data: Omit<Barista, 'id'>
): Promise<ApiResponse<Barista>> => {
  try {
    const payload = objectToFormData(data)
    const res = await api.post<Barista>('/baristas', payload);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add barista' };
  }
};

//dashboard
export const updateBaristaById = async (
  id: string,
  data: Partial<Omit<Barista, 'id'>>
): Promise<ApiResponse<Barista>> => {
  try {
    const payload = objectToFormData(data)
    const res = await api.put<Barista>(`/baristas/${id}`, payload);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update barista' };
  }
};

//dashboard
export const deleteBaristaById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/baristas/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete barista' };
  }
};
