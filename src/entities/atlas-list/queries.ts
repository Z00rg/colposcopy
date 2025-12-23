import {atlasApi} from "@/shared/api/atlasApi";
import {useQuery} from "@tanstack/react-query";

const atlasListKey = ["atlas-list"];

// Запрос списка патологий
export function useAtlasListQuery() {

    return useQuery({
        queryKey: atlasListKey,
        queryFn: atlasApi.getAtlasList,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
    });
}
