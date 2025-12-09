import { createInstance, RequestOptions } from "./api-instance";

// DTO

interface PathologyInfo {
  id: number;
  name: string;
}

export interface GetPathologyListInfoDto {
  items: PathologyInfo[];
}

interface TutorialInfo {
  id: number;
  name: string;
}

export interface GetTutorialsListInfoDto {
  items: TutorialInfo[];
}

export interface GetPathologyInfoDto {
  id: number;
  imgContainer: string[];
  description: string;
}

// API
//+
export const getAtlasList = (options?: RequestOptions) =>
  createInstance<GetPathologyListInfoDto>(
    { url: `/atlas/atlas-list/`, method: "GET" },
    options
  );

export const getTutorialsList = (options?: RequestOptions) =>
  createInstance<GetTutorialsListInfoDto>(
    { url: `/tutorial/tutorials-list/`, method: "GET" },
    options
  );
//+
export const getPathologyInfo = (
  pathologyId: number | string,
  options?: RequestOptions
) =>
  createInstance<GetPathologyInfoDto>(
    { url: `/atlas/pathology/${pathologyId}/`, method: "GET" },
    options
  );

export const atlasApi = {
  getAtlasList,
  getPathologyInfo,
  getTutorialsList,
};
