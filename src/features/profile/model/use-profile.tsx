import { useProfileQuery } from "@/entities/profile";

export function useProfile() {
    const profileQuery = useProfileQuery();

    const info = profileQuery.data

    return {
        info,
        isLoading: profileQuery.isPending,
        isError: profileQuery.isError
    }
}