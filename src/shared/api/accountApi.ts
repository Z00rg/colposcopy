import {createInstance, RequestOptions} from "./api-instance";

// DTO

export interface GetProfileInfoDto {
    name: string;
    surname: string;
    patronymic: string;
    work: string;
    position: string;
    email: string;
    password: string;
}

// API

// Профиль
export const getProfileInfo = (options?: RequestOptions) =>
    createInstance<GetProfileInfoDto>(
        {url: `/account/profile/`, method: "GET"},
        options
    );

// Редактирование профиля
export const editProfile = (
    body: Partial<GetProfileInfoDto>,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/account/profile/`,
            method: "PATCH",
            data: body,
        },
        options
    );

export const accountApi = {
    getProfileInfo,
    editProfile,
};
