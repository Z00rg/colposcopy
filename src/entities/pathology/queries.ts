import {useQuery} from "@tanstack/react-query";
import {atlasApi} from "@/shared/api/atlasApi";

const pathologyKey = (id: number) => ["pathology", id];

// Запрос определенной патологии
export function usePathologyQuery(pathologyId: number) {

    return useQuery({
        queryKey: pathologyKey(pathologyId),
        queryFn: () => atlasApi.getPathologyInfo(pathologyId),
        enabled: !!pathologyId,
        staleTime: 60 * 60 * 1000, // 60 минут
        retry: 0,
    });
}
