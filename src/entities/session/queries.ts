// import { authControllerGetSessionInfo } from "@/shared/api/api";
import { authApi } from "@/shared/api/authApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sessionKey = ["session"];

export function useSessionQuery() {
  return useQuery({
    queryKey: sessionKey,
    // queryFn: authControllerGetSessionInfo,
    queryFn: authApi.getSession,
    retry: 0,
    staleTime: 60 * 1000, //время жизни кеша 1 мин
  });
}

export function useResetSession() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.removeQueries();
  };
}
