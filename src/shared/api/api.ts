import { createInstance } from "./api-instance";
import type { BodyType } from "./api-instance";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface GetSessionInfoDto {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface TryInfo {
  id: string;
  date: string;
  status: boolean;
  mark: string;
  time: string;
}

export interface GetTryListInfoDto {
    items: TryInfo[];
}

export interface GetProfileInfoDto {
  email: string;
  firstName: string;
  surname: string;
  middleName: string;
  course: number;
  group: string;
}

export const authControllerSignIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: signInBodyDto,
    },
    options,
  );
};

export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<GetSessionInfoDto>(
    { url: `/auth/session`, method: "GET" },
    options,
  );
};

export const authControllerGetTryListInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<GetTryListInfoDto>(
    { url: `/auth/try-list`, method: "GET" },
    options,
  );
};

export const authControllerGetProfileInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<GetProfileInfoDto>(
    { url: `/auth/profile`, method: "GET" },
    options,
  );
};