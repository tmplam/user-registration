import axios from '@/apis/axios';
import { UserRegisterModel } from '@/models';
import { ApiResponse } from '@/models/apiResponse';

export const apiRegisterUser = (data: UserRegisterModel): Promise<ApiResponse<any>> =>
  axios({
    url: '/user/register',
    method: 'post',
    data,
  });
