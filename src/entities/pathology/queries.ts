import { useQuery } from "@tanstack/react-query";
import { atlasControllerGetPathologyInfo } from "@/shared/api/api";

const pathologyKey = (id: string) => ["pathology", id];

export function usePathologyQuery(pathologyId: string) {
  return useQuery({
    queryKey: pathologyKey(pathologyId),
    queryFn: () => atlasControllerGetPathologyInfo(pathologyId),
    enabled: !!pathologyId,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
}
