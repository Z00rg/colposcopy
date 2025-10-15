import { testControllerGetTestListInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const testListKey = ["test-list"];

export function useTestListQuery() {
  return useQuery({
    queryKey: testListKey,
    queryFn: testControllerGetTestListInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}
