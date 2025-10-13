import { usePathologyDetailQuery } from "@/entities/pathology-detail";

export function usePathologyDetail(pathologyId: string) {
    const pathologyDetailQuery = usePathologyDetailQuery(pathologyId);

    return {
        pathologyDetails: pathologyDetailQuery.data,
        isLoading: pathologyDetailQuery.isPending,
        isError: pathologyDetailQuery.isError
    }
}