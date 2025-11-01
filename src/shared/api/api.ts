import { createInstance } from "./api-instance";
import type { BodyType } from "./api-instance";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface GetSessionInfoDto {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

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

export interface GetProfileInfoDto {
  email: string;
  firstName: string;
  surname: string;
  middleName: string;
  university: string;
  course: number;
  group: string;
}

interface PathologyInfo {
  id: number;
  name: string;
}

export interface GetPathologyListInfoDto {
  items: PathologyInfo[];
}

export interface GetPathologyInfoDto {
  id: number;
  imgContainer: string[];
  imgSchema: string;
  textContainer: string[];
}

export interface GetInstructionInfoDto {
  text: string;
}

export type QuestionType = 0 | 1; // 0: Одиночный выбор , 1: Множественный выбор

export interface ITestQuestion {
  /** Текст самого вопроса. */
  question: string;

  /** Тип вопроса: 0 - одиночный выбор, 1 - множественный выбор. */
  typeQuestion: QuestionType;

  /** Дополнительная инструкция для пользователя. */
  instructions: string;

  /** Массив строковых вариантов ответов. */
  answers: string[];
}

export interface ITestTask {
  /** Уникальный идентификатор задания/патологии. */
  id: number;

  /** Массив URL-адресов изображений для данного задания. */
  imageSrcs: string[];

  /** Основной текст описания патологии или контекста. */
  pathologyText: string;

  /** Массив вопросов, относящихся к данному заданию. */
  testsQuestions: ITestQuestion[];
}

export interface GetTestTasksDataDto {
  /** Массив всех доступных заданий. */
  items: ITestTask[];
}



export const authControllerSignIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: signInBodyDto,
    },
    options
  );
};

export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetSessionInfoDto>(
    { url: `/auth/session`, method: "GET" },
    options
  );
};

export const tryControllerGetTryListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetTryListInfoDto>(
    { url: `/try/try-list`, method: "GET" },
    options
  );
};

export const accountControllerGetProfileInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetProfileInfoDto>(
    { url: `/account/profile`, method: "GET" },
    options
  );
};

export const atlasControllerGetAtlasListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyListInfoDto>(
    { url: `/atlas/atlas-list`, method: "GET" },
    options
  );
};

export const atlasControllerGetPathologyInfo = (
  pathologyId: number | string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyInfoDto>(
    { url: `/atlas/pathology-detail/${pathologyId}`, method: "GET" },
    options
  );
};

export const testControllerGetInstructionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetInstructionInfoDto>(
    { url: `/test/instruction`, method: "GET" },
    options
  );
};

export const testControllerGetTestListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyListInfoDto>(
    { url: `/test/test-list`, method: "GET" },
    options
  );
};

export const testControllerGetTestTasksInfo = (
  tasksId: string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyListInfoDto>(
    { url: `/test/test-list/${tasksId}`, method: "GET" },
    options
  );
};