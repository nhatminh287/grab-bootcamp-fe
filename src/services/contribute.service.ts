import { IContribute } from '@/types';
import { axiosClient } from '@/utils';

export interface Review {
  username: string;
  rating: string;
  type_trip: string;
  title: string;
  content: string;
}

export interface IContributeResponse {
  message: string;
  review: Review;
}

export const contributeApi = {

  postContribute: (payload: IContribute): Promise<IContributeResponse> => {
    return axiosClient.post(`/add-review`, payload);
  },

};