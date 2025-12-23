import {createInstance, RequestOptions} from "./api-instance";

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

// Список клинических случаев
export const getCaseList = (options?: RequestOptions) =>
    createInstance<GetClinicalCasesInfoDto>(
        {url: `/clincal-cases/cases/`, method: "GET"},
        options
    );

// Определенный клинический случай
export const getCaseInfo = (
    caseId: number | string,
    options?: RequestOptions
) =>
    createInstance<GetCaseInfoDto>(
        {url: `/cases/case/${caseId}/`, method: "GET"},
        options
    );

export const casesApi = {
    getCaseList,
    getCaseInfo,
};
