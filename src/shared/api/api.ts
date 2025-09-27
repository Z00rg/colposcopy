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