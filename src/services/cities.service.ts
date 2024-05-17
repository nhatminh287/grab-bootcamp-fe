import { ICitiesNearby } from '@/types';
import { axiosClient } from '@/utils';

export const citiesApi = {

  getCities: (): Promise<ICitiesNearby[]> => {
    return axiosClient.get(`/cities`);
  },

  getCitiesNearby: (city: string): Promise<any> => {
    return axiosClient.get(`/nearby-city/${city}`);
  },

};