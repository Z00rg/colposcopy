import { useQuery } from "@tanstack/react-query";
import { atlasControllerGetPathologyInfo } from "@/shared/api/api";

const pathologyDetailKey = (id: string) => ["pathology-detail", id];

export function usePathologyDetailQuery(pathologyId: string) {
  return useQuery({
    queryKey: pathologyDetailKey(pathologyId),
    queryFn: () => {
      if (!pathologyId) {
        throw new Error("Pathology ID is required.");
      }
      return atlasControllerGetPathologyInfo(pathologyId);
    },
    enabled: !!pathologyId,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
}
