import { IStateResponse } from '@/types';
import { axiosClient } from '@/utils';

export const statesApi = {

  getStates: (): Promise<IStateResponse[]> => {
    return axiosClient.get(`/states`);
  },

};