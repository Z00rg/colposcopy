import { createInstance, RequestOptions } from "./api-instance";

// DTO

export interface GetInstructionInfoDto {
  text: string;
}

interface PathologyInfo {
  id: number;
  name: string;
}

export interface GetPathologyListInfoDto {
  items: PathologyInfo[];
}

export type QuestionType = 0 | 1; // 0: Один ответ , 1: Множественный ответ

export interface IAnswers {
  id: number;

  text: string;
}

export interface ITestQuestion {
  id: number;

  question: string;

  typeQuestion: QuestionType;

  instructions: string;

  answers: IAnswers[];
}

export interface ITestTask {
  id: number;

  imageSrcs: string[];

  testsQuestions: ITestQuestion[];
}

export interface GetTestTasksDataDto {
  items: ITestTask[];
}

export type SubmitTestAnswersBodyDto = {
  testIds: string;
  answers: Record<number, Record<number, number[]>>;
};

// API

export const getInstructionInfo = (options?: RequestOptions) =>
  createInstance<GetInstructionInfoDto>(
    { url: `/test/instruction`, method: "GET" },
    options
  );
//+
export const getTestListInfo = (options?: RequestOptions) =>
  createInstance<GetPathologyListInfoDto>(
    { url: `/atlas/atlas-list/`, method: "GET" },
    options
  );

export const getTestTasks = (tasksId: string, options?: RequestOptions) =>
  createInstance<GetTestTasksDataDto>(
    { url: `/test/test-tasks/${tasksId}`, method: "GET" },
    options
  );

export const submitTestAnswers = (
  body: SubmitTestAnswersBodyDto,
  options?: RequestOptions
) =>
  createInstance<void>(
    {
      url: `/test/submit-answers`,
      method: "POST",
      data: body,
    },
    options
  );

export const testApi = {
  getInstructionInfo,
  getTestListInfo,
  getTestTasks,
  submitTestAnswers,
};
