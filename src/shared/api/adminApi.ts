import {createInstance, RequestOptions} from "./api-instance";

// DTO
export interface PathologyCreateDto {
    name: string;
    description: string;
}

// API
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

export const adminApi = {
    createPathology,
};
