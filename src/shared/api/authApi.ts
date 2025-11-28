import { createInstance, RequestOptions } from "./api-instance";

// DTO

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface GetTokenDto {
  refresh_token: string;
  access_token: string;
}

export interface SignUpBodyDto {
  firstName: string;
  surname: string;
  middleName: string;
  work: string;
  position: string;
  email: string;
  password: string;
  password2: string;
}

export interface GetSessionInfoDto {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

// API
//+
const signIn = (body: SignInBodyDto, options?: RequestOptions) =>
  createInstance<GetTokenDto>(
    {
      url: "/auth/login/",
      method: "POST",
      data: body,
    },
    options
  );
//Замена названий полей осталась на беке/фронте
const signUp = (body: SignUpBodyDto, options?: RequestOptions) =>
  createInstance<void>(
    {
      url: "/auth/register/worker/",
      method: "POST",
      data: body,
    },
    options
  );

const getSession = (options?: RequestOptions) =>
  createInstance<GetSessionInfoDto>(
    {
      url: "/auth/session",
      method: "GET",
    },
    options
  );
//+
const signOut = (options?: RequestOptions) =>
  createInstance<void>(
    {
      url: "/auth/logout/",
      method: "POST",
    },
    options
  );

export const authApi = {
  signIn,
  signUp,
  getSession,
  signOut,
};
