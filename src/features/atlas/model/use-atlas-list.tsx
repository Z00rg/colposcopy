import { useAtlasListQuery } from "@/entities/atlas-list";
import router from "next/router";

export function useAtlasList() {
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