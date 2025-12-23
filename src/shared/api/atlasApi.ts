import {createInstance, RequestOptions} from "./api-instance";

// DTO

interface PathologyInfo {
    id: number;
    name: string;
}

export interface GetPathologyListInfoDto {
    items: PathologyInfo[];
}

export interface GetPathologyInfoDto {
    id: number;
    imgContainer: string[];
    description: string;
}

// API

// Список патологий
export const getAtlasList = (options?: RequestOptions) =>
    createInstance<GetPathologyListInfoDto>(
        {url: `/atlas/atlas-list/`, method: "GET"},
        options
    );

// Определенная патология
export const getPathologyInfo = (
    pathologyId: number | string,
    options?: RequestOptions
) =>
    createInstance<GetPathologyInfoDto>(
        {url: `/atlas/pathology/${pathologyId}/`, method: "GET"},
        options
    );

export const atlasApi = {
    getAtlasList,
    getPathologyInfo,
};
