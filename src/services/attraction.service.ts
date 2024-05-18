import { IApiAttractionResponse } from '@/types';
import { axiosClient } from '@/utils';

export const attractionApi = {

  getAttractions: (state: string): Promise<IApiAttractionResponse> => {
    return axiosClient.get(`/recommendations/${state}`);
  },

};