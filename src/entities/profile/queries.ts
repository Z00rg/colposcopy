import { authControllerGetProfileInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const profileKey = ["profile"];

export function useProfileQuery() {
    return useQuery({
        queryKey: profileKey,
        queryFn: authControllerGetProfileInfo,
        retry: 0,
        staleTime: 60 * 60 * 1000, //время жизни кеша 1 час
      });
}

