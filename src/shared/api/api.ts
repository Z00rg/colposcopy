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
  id: number;
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
  university: string;
  course: number;
  group: string;
}

interface AtlasInfo {
  id: number;
  name: string;
}

export interface GetAtlasListInfoDto {
  items: AtlasInfo[];
}

export interface GetPathologyInfoDto {
  id: number;
  imgContainer: string[];
  imgSchema: string;
  textContainer: string[];
}

export interface GetInstructionInfoDto {
  text: string;
}



export const authControllerSignIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: signInBodyDto,
    },
    options
  );
};

export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetSessionInfoDto>(
    { url: `/auth/session`, method: "GET" },
    options
  );
};

export const tryControllerGetTryListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetTryListInfoDto>(
    { url: `/try/try-list`, method: "GET" },
    options
  );
};

export const accountControllerGetProfileInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetProfileInfoDto>(
    { url: `/account/profile`, method: "GET" },
    options
  );
};

export const atlasControllerGetAtlasListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetAtlasListInfoDto>(
    { url: `/atlas/atlas-list`, method: "GET" },
    options
  );
};

export const atlasControllerGetPathologyInfo = (
  pathologyId: number | string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyInfoDto>(
    { url: `/atlas/pathology-detail/${pathologyId}`, method: "GET" },
    options
  );
};

export const testControllerGetInstructionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyInfoDto>(
    { url: `/test/instruction`, method: "GET" },
    options
  );
};