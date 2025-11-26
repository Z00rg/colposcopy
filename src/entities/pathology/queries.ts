import { useQuery } from "@tanstack/react-query";
// import { atlasControllerGetPathologyInfo } from "@/shared/api/api";
import { atlasApi } from "@/shared/api/atlasApi";

const pathologyKey = (id: string) => ["pathology", id];

export function usePathologyQuery(pathologyId: string) {
  return useQuery({
    queryKey: pathologyKey(pathologyId),
    // queryFn: () => atlasControllerGetPathologyInfo(pathologyId),
    queryFn: () => atlasApi.getPathologyInfo(pathologyId),
    enabled: !!pathologyId,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
}
