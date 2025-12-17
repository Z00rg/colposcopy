"use client";

import { useAtlasListQuery } from "@/entities/atlas-list";
import { useRouter } from "next/navigation";

export function useAtlasList() {
  const router = useRouter();
  const atlasListQuery = useAtlasListQuery();

  const items = atlasListQuery.data?.items ?? [];

  const handleItemClick = (id: number) => {
    router.push(`/pathology/${id}`);
  };

  return {
    items,
    isLoading: atlasListQuery.isPending,
    isError: atlasListQuery.isError,
    handleClick: handleItemClick,
  };
}