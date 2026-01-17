import {createInstance, RequestOptions} from "./api-instance";

// DTO
export interface PathologyCreateDto {
    name: string;
    description: string;
}

// API Патологий
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

// API Туториалов
// Удаление туториала
export const deleteTutorial = (
    id: number,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `tutorial/delete/${id}/`,
            method: "DELETE",
        },
        options
    );

export const adminApi = {
    createPathology,
    deletePathology,
    deleteTutorial,
};
