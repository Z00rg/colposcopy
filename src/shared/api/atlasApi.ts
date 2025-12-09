import { createInstance, RequestOptions } from "./api-instance";

// DTO

interface PathologyInfo {
  id: number;
  name: string;
}

export interface GetPathologyListInfoDto {
  items: PathologyInfo[];
}

interface LessonInfo {
  id: number;
  name: string;
}

export interface GetLessonsListInfoDto {
  items: LessonInfo[];
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

export const getLessonsList = (options?: RequestOptions) =>
  createInstance<GetLessonsListInfoDto>(
    { url: `/lessons/lessons-list/`, method: "GET" },
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
  getLessonsList,
};
