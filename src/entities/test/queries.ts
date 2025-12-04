import { queryClient } from "@/shared/api/query-client";
import { testApi, SubmitTestAnswersBodyDto } from "@/shared/api/testApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const testListKey = ["test-list"];

const testTasksKey = ["test-tasks"];

export function useTestListQuery() {
  return useQuery({
    queryKey: testListKey,
    queryFn: testApi.getTestListInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000, // 60 минут
  });
}

export function useTestTasksQuery(tasksId: string) {
  return useQuery({
    queryKey: testTasksKey,
    queryFn: () => testApi.getTestTasks(tasksId),
    retry: 0,
    staleTime: 60 * 60 * 1000, // 60 минут
  });
}

export function useSubmitAnswersMutation() {
  return useMutation({
    mutationFn: (body: SubmitTestAnswersBodyDto) =>
      testApi.submitTestAnswers(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["try-list"] });
    },
  });
}
