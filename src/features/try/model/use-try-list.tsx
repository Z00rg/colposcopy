import { useTryListQuery } from "@/entities/try-list";
import router from "next/router";

export function useTryList() {
    const tryListQuery = useTryListQuery();

    const items = tryListQuery.data?.items ?? [];

    const handleTryClick = (id: number) => {
    router.push(`/try/${id}`);
  };

    return {
        items,
        isLoading: tryListQuery.isPending,
        isError: tryListQuery.error,
        handleTryClick,
    };
}