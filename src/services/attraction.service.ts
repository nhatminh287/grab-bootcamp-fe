import { IApiAttractionResponse, IAttraction, IHotel, IApiAttractionDetailResponse } from '@/types';
import { axiosClient } from '@/utils';

export const attractionApi = {

  getAttractions: (state: string): Promise<IApiAttractionResponse> => {
    return axiosClient.get(`/recommendations/${state}`);
  },

  getTopAttractions: (): Promise<IAttraction[]> =>{
    return axiosClient.get(`/top-trending-attractions`);
  },

  attractionDetail: (name: string): Promise<IApiAttractionDetailResponse> => {
    return axiosClient.get(`/attraction-detail/${name}`);
  }
};