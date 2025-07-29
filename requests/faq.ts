import api from '@/utils/axios';
import { Faq } from '@/types/faq';
import { ApiResponse } from '@/types/general';

//dashboard
//website
export const getAllFaqs = async (): Promise<ApiResponse<Faq[]>> => {
  try {
    // const res = await api.get<Faq[]>('/faqs');
    return { data: [
      {
        question: "What are your opening hours?",
        answer:
          "We are open Monday to Friday from 7 AM to 6 PM, and on weekends from 8 AM to 5 PM.",
        id: 1,
      },
      {
        question: "Do you offer dairy-free milk options?",
        answer:
          "Yes, we offer a variety of dairy-free milk alternatives including oat, almond, and soy milk.",
        id: 2,
      },
      {
        question: "Can I order online for pickup?",
        answer:
          "You can place your order through our website or mobile app for convenient in-store pickup.",
        id: 3,
      },
      {
        question: "Do you have gluten-free pastries?",
        answer:
          "Yes, we have a selection of delicious gluten-free pastries available daily. Please ask our staff for today's options.",
        id: 4,
      },
      {
        question: "Is there free Wi-Fi available?",
        answer:
          "Yes, we provide complimentary high-speed Wi-Fi for all our customers. Just ask for the password at the counter.",
        id: 5,
      },
    ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch faqs' };
  }
};

//dashboard
export const getFaqById = async (id: string): Promise<ApiResponse<Faq>> => {
  try {
    // const res = await api.get<Faq>(`/faqs/${id}`);
    return { data: {
      question: "What are your opening hours?",
        answer:
          "We are open Monday to Friday from 7 AM to 6 PM, and on weekends from 8 AM to 5 PM.",
        id: 1,
    } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch faq' };
  }
};

//dashboard
export const addFaq = async (
  data: Omit<Faq, 'id'>
): Promise<ApiResponse<Faq>> => {
  try {
    const res = await api.post<Faq>('/faqs', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add Faq' };
  }
};

//dashboard
export const updateFaqById = async (
  id: string,
  data: Partial<Omit<Faq, 'id'>>
): Promise<ApiResponse<Faq>> => {
  try {
    const res = await api.put<Faq>(`/faqs/${id}`, data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to update Faq' };
  }
};

//dashboard
export const deleteFaqById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/faqs/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete Faq' };
  }
};
