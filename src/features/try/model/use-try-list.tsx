"use client"

import { useTryListQuery } from "@/entities/try-list";
import { useRouter } from "next/navigation";

export function useTryList() {
    const tryListQuery = useTryListQuery();
    const router = useRouter();

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