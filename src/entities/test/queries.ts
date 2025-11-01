import { testControllerGetTestListInfo, testControllerGetTestTasksInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const testListKey = ["test-list"];

const testTasksKey = ["test-tasks"];

export function useTestListQuery() {
  return useQuery({
    queryKey: testListKey,
    queryFn: testControllerGetTestListInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}

export function useTestTasksQuery(tasksId: string) {
  return useQuery({
    queryKey: testListKey,
    queryFn: () => testControllerGetTestTasksInfo(tasksId),
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}
