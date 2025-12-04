import { tryApi } from "@/shared/api/tryApi";
import { useQuery } from "@tanstack/react-query";

const tryListKey = ["try-list"];
const tryKey = (id: string) => ["try", id];

export function useTryListQuery() {
    return useQuery({
        queryKey: tryListKey,
        queryFn: tryApi.getTryList,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
      });
}

export function useTryQuery(tryId: string) {
    return useQuery({
        queryKey: tryKey(tryId),
        queryFn: () => tryApi.getTryInfo(tryId),
        retry: 0, 
        staleTime: 60 * 60 * 1000, // 60 минут
      });
}
