import { tryControllerGetTryListInfo, tryControllerGetTryAnswersInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const tryListKey = ["try-list"];
const tryAnswersKey = ["try-answers"];

export function useTryListQuery() {
    return useQuery({
        queryKey: tryListKey, //ключ для кеширования запроса с сервара
        queryFn: tryControllerGetTryListInfo,
        retry: 0, //один запрос без повторений
        staleTime: 60 * 60 * 1000, //время жизни кеша 1 час
      });
}

export function useTryAnswersQuery(tryId: string) {
    return useQuery({
        queryKey: tryAnswersKey, //ключ для кеширования запроса с сервара
        queryFn: () => tryControllerGetTryAnswersInfo(tryId),
        retry: 0, //один запрос без повторений
        staleTime: 5 * 60 * 1000, //время жизни кеша 5 минут
      });
}
