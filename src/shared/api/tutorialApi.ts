import { createInstance, RequestOptions } from "./api-instance";

interface TutorialInfo {
  id: number;
  name: string;
}

export interface GetTutorialsListInfoDto {
  items: TutorialInfo[];
}

export interface GetTutorialInfoDto {
  id: number;
  video?: string;
  description: string;
}

export const getTutorialsList = (options?: RequestOptions) =>
  createInstance<GetTutorialsListInfoDto>(
    { url: `/tutorial/tutorials-list/`, method: "GET" },
    options
  );

export const getTutorialInfo = (
  tutorialId: number | string,
  options?: RequestOptions
) =>
  createInstance<GetTutorialInfoDto>(
    { url: `/tutorial/${tutorialId}/`, method: "GET" },
    options
  );

export const tutorialApi = {
  getTutorialsList,
  getTutorialInfo,
};
