// import {
//   // testControllerGetTestListInfo,
//   // testControllerGetTestTasksInfo,
//   // testControllerSubmitTestAnswers,
// } from "@/shared/api/api";
import { queryClient } from "@/shared/api/query-client";
import { testApi, SubmitTestAnswersBodyDto } from "@/shared/api/testApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const testListKey = ["test-list"];

const testTasksKey = ["test-tasks"];

export function useTestListQuery() {
  return useQuery({
    queryKey: testListKey,
    // queryFn: testControllerGetTestListInfo,
    queryFn: testApi.getTestListInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}

export function useTestTasksQuery(tasksId: string) {
  return useQuery({
    queryKey: testTasksKey,
    // queryFn: () => testControllerGetTestTasksInfo(tasksId),
    queryFn: () => testApi.getTestTasks(tasksId),
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}

export function useSubmitAnswersMutation() {
  return useMutation({
    // mutationFn: (body: SubmitTestAnswersBodyDto) =>
    //   testControllerSubmitTestAnswers(body),
    mutationFn: (body: SubmitTestAnswersBodyDto) =>
      testApi.submitTestAnswers(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["try-list"] });
    },
  });
}
