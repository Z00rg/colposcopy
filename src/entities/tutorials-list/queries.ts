import { atlasApi } from "@/shared/api/atlasApi";
import { useQuery } from "@tanstack/react-query";

const tutorialsListKey = ["tutorials-list"];

export function useTutorialsListQuery() {
  return useQuery({
    queryKey: tutorialsListKey,
    queryFn: atlasApi.getTutorialsList,
    retry: 0,
    staleTime: 60 * 60 * 1000, // 60 минут
  });
}
