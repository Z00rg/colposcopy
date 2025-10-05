import { tryControllerGetTryListInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const tryListKey = ["try-list"];

export function useTryListQuery() {
    return useQuery({
        queryKey: tryListKey, //ключ для кеширования запроса с сервара
        queryFn: tryControllerGetTryListInfo,
        retry: 0, //один запрос без повторений
        staleTime: 60 * 60 * 1000, //время жизни кеша 1 час
      });
}
