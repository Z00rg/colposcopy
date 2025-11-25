import { createInstance, RequestOptions } from "./api-instance";

// DTO

export interface GetProfileInfoDto {
  firstName: string;
  surname: string;
  middleName: string;
  work: string;
  position: string;
  email: string;
  password: string;
}

// API

export const getProfileInfo = (options?: RequestOptions) =>
  createInstance<GetProfileInfoDto>(
    { url: `/account/profile`, method: "GET" },
    options
  );

export const editProfile = (
  body: Partial<GetProfileInfoDto>,
  options?: RequestOptions
) =>
  createInstance<void>(
    {
      url: `/account/edit`,
      method: "POST",
      data: body,
    },
    options
  );

export const accountApi = {
  getProfileInfo,
  editProfile,
};
