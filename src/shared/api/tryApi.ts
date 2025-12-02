import { createInstance, RequestOptions } from "./api-instance";

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

export type QuestionType = 0 | 1; // 0: Одиночный выбор , 1: Множественный выбор

export interface ITestQuestion {
  question: string;

  typeQuestion: QuestionType;

  instructions: string;

  answers: string[];
}

export interface ITestTask {
  id: number;

  imageSrcs: string[];

  pathologyText: string;

  testsQuestions: ITestQuestion[];
}

export interface GetTryInfoDto {
  items: ITestTask[];
  tryAnswers: Record<
    number, // taskId
    Record<
      number, // questionIndex
      {
        selected: number[];
        isCorrect: boolean;
      }
    >
  >;
}

// API

export const getTryList = (options?: RequestOptions) =>
  createInstance<GetTryListInfoDto>(
    { url: `/account/try-list/`, method: "GET" },
    options
  );

export const getTryInfo = (tryId: string, options?: RequestOptions) =>
  createInstance<GetTryInfoDto>(
    { url: `/try/viewing-try/${tryId}`, method: "GET" },
    options
  );

export const tryApi = {
  getTryList,
  getTryInfo,
};
