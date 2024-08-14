export interface UserModelInterface {
  id: string;
  name: string;
  email: string;
}

export interface ResetPasswordInterface {
  token: string;
  password: string;
}

export interface RequestHeaders {
  'x-access-token'?: string;
  Authorization: string;
  'Accept-Language': string;
}
