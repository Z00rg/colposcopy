import {createInstance, RequestOptions} from "./api-instance";

// DTO
export interface PathologyCreateDto {
    name: string;
    description: string;
}

// API
// Добавление патологии
export const createPathology = (
    body: PathologyCreateDto,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: "/pathologies/",
            method: "POST",
            data: body,
        },
        options
    );

// Удаление патологии
export const deletePathology = (
    id: number,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/pathologies/${id}/`,
            method: "DELETE",
        },
        options
    );

export const adminApi = {
    createPathology,
    deletePathology,
};
