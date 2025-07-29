import { ApiResponse } from '@/types/general';
import api from '@/utils/axios';

//dashboard
//website
export const getContactUsPageData = async (): Promise<ApiResponse<unknown>> => {
  try {
    // const res = await api.get('/contact-us');
    return { data: {
      location: 'UAE, Dubai, Abu Dhabi',
      phone: '+(123) 456 789',
      email: 'hani2003s@gmail.com',
      map_url: 'test_map_url',
      title: 'the title',
      description: 'the description the description the description the description the description the description the description ',
      our_hours: [
        { day: 'Monday - Friday', hours: '7:00 AM - 6:00 PM' },
        { day: 'Saturday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Sunday', hours: '9:00 AM - 4:00 PM' },
      ]
    } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch items' };
  }
};

//dashboard
export const createOrUpdateContactUsPageData = async ( data: unknown ) => {
  try {
    const res = await api.post('/contact-us', data);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add Item' };
  }
};

