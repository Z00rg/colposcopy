import { tutorialApi } from "@/shared/api/tutorialApi";
import { useQuery } from "@tanstack/react-query";

const tutorialsListKey = ["tutorials-list"];

export function useTutorialsListQuery() {
  return useQuery({
    queryKey: tutorialsListKey,
    queryFn: tutorialApi.getTutorialsList,
    retry: 0,
    staleTime: 60 * 60 * 1000, // 60 минут
  });
}

const tutorialKey = (id: string) => ["tutorial", id];

export function useTutorialQuery(tutorialId: string) {
  return useQuery({
    queryKey: tutorialKey(tutorialId),
    queryFn: () => tutorialApi.getTutorialInfo(tutorialId),
    enabled: !!tutorialId,
    staleTime: 60 * 60 * 1000, // 60 минут
    retry: 0,
  });
}
