import { authControllerGetSessionInfo } from "@/shared/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sessionKey = ["session"];

export function useSessionQuery() {
    return useQuery({
        queryKey: sessionKey, //ключ для кеширования запроса с сервара
        queryFn: authControllerGetSessionInfo,
        retry: 0, //один запрос без повторений
        staleTime: 24 * 60 * 60 * 1000, //время жизни кеша 24 часа
      });
}


export function useResetSession(){
    const queryClient = useQueryClient();
    return () => queryClient.removeQueries();
}

