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
    tutorial_file?: string;
    description: string;
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

export const tutorialApi = {
    getTutorialsList,
    getTutorialInfo,
};
