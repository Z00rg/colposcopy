import { createInstance, RequestOptions } from "./api-instance";

// DTO

interface ClinicalCaseInfo {
  id: number;
  name: string;
  cases: { id: number }[];
}

export interface GetClinicalCasesInfoDto {
  items: ClinicalCaseInfo[];
}

export interface GetCaseInfoDto {
  id: number;
  imgContainer: string[];
  imgSchema: string;
  descriptionContainer: string[];
}

// API
//+
export const getCaseList = (options?: RequestOptions) =>
  createInstance<GetClinicalCasesInfoDto>(
    { url: `/clincal-cases/cases/`, method: "GET" },
    options
  );

export const getCaseInfo = (
  caseId: number | string,
  options?: RequestOptions
) =>
  createInstance<GetCaseInfoDto>(
    { url: `/clincal-cases/case/${caseId}/`, method: "GET" },
    options
  );

export const casesApi = {
  getCaseList,
  getCaseInfo,
};
