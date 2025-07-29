//@ts-nocheck
import { ApiResponse } from '@/types/general';
import api from '@/utils/axios';
import { objectToFormData } from '@/utils/formdata';

//dashboard
//website
export const getAboutPageData = async (): Promise<ApiResponse<unknown>> => {
  try {
    // const res = await api.get('/about');
    return { data: {
      our_story: 'Founded in 2020, The Koffee Room began with a simple passion: to bring the finest coffee experience to our community. We believe that every cup tells a story, from the rich soil it grew in to the hands that carefully brew it. Our journey started in a small, cozy corner, driven by a commitment to quality, sustainability, and a deep love for coffee. \n \n We source our beans ethically from the best farms around the globe, ensuring fair practices and exceptional flavor. Our values are steeped in community, craftsmanship, and creating a welcoming space where everyone can enjoy a perfect moment with their favorite brew.',
      image: '/logo.jpg',
      coffee_journey: [
        {
          title: 'Ethical Sourcing',
          description: 'We partner directly with sustainable farms, ensuring fair wages and high-quality beans from the start.',
        },
        {
          title: 'Expert Roasting',
          description: 'Our beans are carefully roasted in small batches to unlock their unique flavor profiles.',
        },
        {
          title: 'Precision Grinding',
          description: 'Each blend is ground to perfection, ensuring the ideal consistency for optimal extraction.',
        },
        {
          title: 'Masterful Brewing',
          description: 'Our skilled baristas craft each drink with precision, bringing out the best in every bean.',
        },
        {
          title: 'Your Perfect Cup',
          description: 'Finally, the moment of enjoyment. Savor the rich aromas and exquisite flavors in every sip.',
        },
      ],
    } };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to fetch items' };
  }
};

//dashboard
export const createOrUpdateAboutPageData = async ( data: unknown ) => {
  try {
    const payload = objectToFormData(data)
    const res = await api.post('/about', payload);
    return { data: res.data };
  } catch (error: any) {
    return { error: error?.response?.data?.message || 'Failed to add Item' };
  }
};

