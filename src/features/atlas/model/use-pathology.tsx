import { usePathologyQuery } from "@/entities/pathology";

export function usePathology(pathologyId: string) {
    const pathologyQuery = usePathologyQuery(pathologyId);

    return {
        pathologyDetails: pathologyQuery.data,
        isLoading: pathologyQuery.isPending,
        isError: pathologyQuery.isError
    }
}