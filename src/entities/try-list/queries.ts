import { tryControllerGetTryListInfo, tryControllerGetTryInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const tryListKey = ["try-list"];
const tryKey = (id: string) => ["try", id];

export function useTryListQuery() {
    return useQuery({
        queryKey: tryListKey,
        queryFn: tryControllerGetTryListInfo,
        retry: 0,
        staleTime: 60 * 60 * 1000, //время жизни кеша 1 час
      });
}

export function useTryQuery(tryId: string) {
    return useQuery({
        queryKey: tryKey(tryId),
        queryFn: () => tryControllerGetTryInfo(tryId),
        retry: 0, 
        staleTime: 5 * 60 * 1000, //время жизни кеша 5 минут
      });
}
