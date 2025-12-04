import { useQuery } from "@tanstack/react-query";
import { atlasApi } from "@/shared/api/atlasApi";

const pathologyKey = (id: string) => ["pathology", id];

export function usePathologyQuery(pathologyId: string) {
  return useQuery({
    queryKey: pathologyKey(pathologyId),
    queryFn: () => atlasApi.getPathologyInfo(pathologyId),
    enabled: !!pathologyId,
    staleTime: 60 * 60 * 1000, // 60 минут
    retry: 0,
  });
}
