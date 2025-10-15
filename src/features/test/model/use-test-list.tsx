import { useTestListQuery } from "@/entities/test-list";

export function useTestList() {
    const testListQuery = useTestListQuery();

    const items = testListQuery.data?.items ?? [];

    return {
        items,
        isLoading: testListQuery.isPending,
        isError: testListQuery.isError
    }
}