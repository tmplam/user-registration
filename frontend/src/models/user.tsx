export interface UserRegisterModel {
  email: string;
  password: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}
