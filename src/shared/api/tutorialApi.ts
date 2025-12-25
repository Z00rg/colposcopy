import {createInstance, RequestOptions} from "./api-instance";

// DTO

interface TutorialInfo {
    id: number;
    name: string;
}

export interface GetTutorialsListInfoDto {
    items: TutorialInfo[];
}

export interface GetTutorialInfoDto {
    id: number;
    name: string;
    video?: string;
    poster?: string;
    description: string;
}

interface TutorialFileInfo {
    name: string;
    tutorial_file: string;
}

export interface GetTutorialsFilesListInfoDto {
    items: TutorialFileInfo[];
}

// API

// Список уроков
export const getTutorialsList = (options?: RequestOptions) =>
    createInstance<GetTutorialsListInfoDto>(
        {url: `/tutorial/tutorials-list/`, method: "GET"},
        options
    );

// Определенный урок
export const getTutorialInfo = (
    tutorialId: number | string,
    options?: RequestOptions
) =>
    createInstance<GetTutorialInfoDto>(
        {url: `/tutorial/${tutorialId}/`, method: "GET"},
        options
    );

// Список файлов
export const getTutorialFilesList = (options?: RequestOptions) =>
    createInstance<GetTutorialsFilesListInfoDto>(
        {url: `api/tutorialfiles/tutorials-list`, method: "GET"},
        options
    );

export const tutorialApi = {
    getTutorialsList,
    getTutorialInfo,
    getTutorialFilesList,
};
