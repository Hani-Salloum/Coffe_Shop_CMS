//@ts-nocheck
import api from '@/utils/axios';
import { ContactUsFormPayload as UserMessage } from '@/types/general';
import { ApiResponse } from '@/types/general';

//dashboard
export const getAllUserMessages = async (): Promise<ApiResponse<UserMessage[]>> => {
  try {
    // const res = await api.get<UserMessage[]>('/mail-collector');
    return { data: [
      {
        id: 1,
        name: 'hani',
        email: 'hani@salloum.com',
        phone: '0958325462',
        message: 'userMessage userMessage userMessage userMessage userMessage userMessage userMessage ',
        ai_response: 'ai_response ai_response ai_response ai_response ai_response ai_response ai_response ai_response ',
      }
    ] };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch mails' };
  }
};

//website
export const addUserMessage = async (
  data: Omit<UserMessage, 'id'>
): Promise<ApiResponse<string>> => {
  try {
    // const res = await api.post<UserMessage>('/mail-collector', data);
    console.log(data)
    const res = { data: 'done' }
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add mail' };
  }
};

//dashboard
export const deleteUserMessageById = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await api.delete(`/mail-collector/${id}`);
    return { data: null };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to delete mail' };
  }
};
