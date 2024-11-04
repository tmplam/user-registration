import axios from '@/apis/axios';
import { LoginModel, LoginResponse, UserRegisterModel } from '@/models';
import { ApiResponse } from '@/models/apiResponse';

export const apiRegisterUser = (data: UserRegisterModel): Promise<ApiResponse<unknown>> =>
  axios({
    url: '/auth/register',
    method: 'post',
    data,
  });

export const apiLogin = (data: LoginModel): Promise<ApiResponse<LoginResponse>> =>
  axios({
    url: '/auth/login',
    method: 'post',
    data,
  });

export const apiGetProfile = (): Promise<ApiResponse<unknown>> =>
  axios({
    url: '/users/profile',
    method: 'get',
  });
