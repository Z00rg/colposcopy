import { atlasControllerGetAtlasListInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const atlasListKey = ["atlas-list"];

export function useAtlasListQuery() {
  return useQuery({
    queryKey: atlasListKey,
    queryFn: atlasControllerGetAtlasListInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}
