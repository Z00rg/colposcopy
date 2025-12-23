import {createInstance, RequestOptions} from "./api-instance";

// DTO

interface TryInfo {
    id: number;
    date: string;
    status: boolean;
    mark: string;
    time: string;
}

export interface GetTryListInfoDto {
    items: TryInfo[];
}

export type QuestionType = 0 | 1; // 0: Один ответ , 1: Множественный ответ

export interface IAnswers {
    id: number;

    text: string;

    isSelected: boolean;
}

export interface ITestQuestion {
    id: number;

    question: string;

    isCorrect: boolean;

    typeQuestion: QuestionType;

    instructions: string;

    answers: IAnswers[];
}

export interface ITestTask {
    id: number;

    imageSrcs: string[];

    testsQuestions: ITestQuestion[];
}

export interface GetTryInfoDto {
    items: ITestTask[];
}

// API

// Список попыток
export const getTryList = (options?: RequestOptions) =>
    createInstance<GetTryListInfoDto>(
        {url: `/account/try-list/`, method: "GET"},
        options
    );

// Определенная попытка
export const getTryInfo = (tryId: string, options?: RequestOptions) =>
    createInstance<GetTryInfoDto>(
        {url: `/account/attempt/${tryId}/`, method: "GET"},
        options
    );

export const tryApi = {
    getTryList,
    getTryInfo,
};
