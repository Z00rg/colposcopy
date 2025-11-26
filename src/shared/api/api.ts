import { createInstance } from "./api-instance";

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
//
export interface SignInBodyDto {
  email: string;
  password: string;
}
//
export interface SignUpBodyDto {
  firstName: string;
  surname: string;
  middleName: string;
  work: string;
  position: string;
  email: string;
  password: string;
}
//
export interface GetSessionInfoDto {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
//
interface TryInfo {
  id: number;
  date: string;
  status: boolean;
  mark: string;
  time: string;
}
//
export interface GetTryListInfoDto {
  items: TryInfo[];
}
//
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
//
export interface GetProfileInfoDto {
  firstName: string;
  surname: string;
  middleName: string;
  work: string;
  position: string;
  email: string;
  password: string;
}
//
interface PathologyInfo {
  id: number;
  name: string;
}
//
export interface GetPathologyListInfoDto {
  items: PathologyInfo[];
}
//
interface ClinicalCaseInfo {
  id: number;
  name: string;
  cases: { id: number }[];
}
//
export interface GetClinicalCasesInfoDto {
  items: ClinicalCaseInfo[];
}
//
export interface GetCaseInfoDto {
  id: number;
  imgContainer: string[];
  imgSchema: string;
  textContainer: string[];
}
//
export interface GetPathologyInfoDto {
  id: number;
  imgContainer: string[];
  description: string;
}
//
export interface GetInstructionInfoDto {
  text: string;
}
//
export type QuestionType = 0 | 1; // 0: Одиночный выбор , 1: Множественный выбор
//
export interface ITestQuestion {
  question: string;

  typeQuestion: QuestionType;

  instructions: string;

  answers: string[];
}
//
export interface ITestTask {
  id: number;

  imageSrcs: string[];

  pathologyText: string;

  testsQuestions: ITestQuestion[];
}
//
export interface GetTestTasksDataDto {
  items: ITestTask[];
}
//
export type SubmitTestAnswersBodyDto = {
  testIds: string;
  answers: Record<number, Record<number, number[]>>;
};
//+
export const authControllerSignIn = (
  signInBodyDto: SignInBodyDto,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: "POST",
      data: signInBodyDto,
    },
    options
  );
};
//+
export const authControllerSignUp = (
  signUpBodyDto: SignUpBodyDto,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-up`,
      method: "POST",
      data: signUpBodyDto,
    },
    options
  );
};
//+
export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetSessionInfoDto>(
    { url: `/auth/session`, method: "GET" },
    options
  );
};

//Выход из аккаунта
//+
export const authControllerSignOut = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    { url: `/auth/sign-out`, method: "POST" },
    options
  );
};
//+
export const tryControllerGetTryListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetTryListInfoDto>(
    { url: `/try/try-list`, method: "GET" },
    options
  );
};
//+
export const tryControllerGetTryInfo = (
  tryId: string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetTryInfoDto>(
    { url: `/try/viewing-try/${tryId}`, method: "GET" },
    options
  );
};
//+
export const accountControllerGetProfileInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetProfileInfoDto>(
    { url: `/account/profile`, method: "GET" },
    options
  );
};
// Редактирование профиля
//+
export const accountControllerProfileEdit = (
  body: Partial<GetProfileInfoDto>,
  options?: Parameters<typeof createInstance>[1]
) => {
  return createInstance<void>(
    {
      url: `/account/profile/edit`,
      method: "POST",
      data: body,
    },
    options
  );
};
//
export const atlasControllerGetAtlasListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyListInfoDto>(
    { url: `/atlas/atlas-list`, method: "GET" },
    options
  );
};
//
export const atlasControllerGetPathologyInfo = (
  pathologyId: number | string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyInfoDto>(
    { url: `/atlas/pathology-detail/${pathologyId}`, method: "GET" },
    options
  );
};
//
export const casesControllerGetClinicalCasesInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetClinicalCasesInfoDto>(
    { url: `/clinical-cases`, method: "GET" },
    options
  );
};
//
export const casesControllerGetCaseInfo = (
  caseId: number | string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetCaseInfoDto>(
    { url: `/case/${caseId}`, method: "GET" },
    options
  );
};
//
export const testControllerGetInstructionInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetInstructionInfoDto>(
    { url: `/test/instruction`, method: "GET" },
    options
  );
};
//
export const testControllerGetTestListInfo = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetPathologyListInfoDto>(
    { url: `/test/test-list`, method: "GET" },
    options
  );
};
//
export const testControllerGetTestTasksInfo = (
  tasksId: string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<GetTestTasksDataDto>(
    { url: `/test/test-list/${tasksId}`, method: "GET" },
    options
  );
};
//
export const testControllerSubmitTestAnswers = (
  body: SubmitTestAnswersBodyDto,
  options?: Parameters<typeof createInstance>[1]
) => {
  return createInstance<void>(
    {
      url: `/test/submit-answers`,
      method: "POST",
      data: body,
    },
    options
  );
};


