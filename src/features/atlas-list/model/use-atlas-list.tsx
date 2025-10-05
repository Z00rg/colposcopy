import { useAtlasListQuery } from "@/entities/atlas-list";

export function useAtlasList() {
    const atlasListQuery = useAtlasListQuery();

    const items = atlasListQuery.data?.items ?? [];

    return {
        items,
        isLoading: atlasListQuery.isPending,
        isError: atlasListQuery.isError
    }
}