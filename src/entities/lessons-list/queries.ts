import { atlasApi } from "@/shared/api/atlasApi";
import { useQuery } from "@tanstack/react-query";

const lessonsListKey = ["lessons-list"];

export function useLessonsListQuery() {
  return useQuery({
    queryKey: lessonsListKey,
    queryFn: atlasApi.getLessonsList,
    retry: 0,
    staleTime: 60 * 60 * 1000, // 60 минут
  });
}
