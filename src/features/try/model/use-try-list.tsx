import { useTryListQuery } from "@/entities/try-list";

export function useTryList() {
    const tryListQuery = useTryListQuery();

    const items = tryListQuery.data?.items ?? [];

    return {
        items,
        isLoading: tryListQuery.isPending,
        isError: tryListQuery.error,
    };
}