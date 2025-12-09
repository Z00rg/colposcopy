import { useTutorialsListQuery } from "@/entities/tutorials";
import router from "next/router";

export function useTutorialsList() {
  const tutorialsListQuery = useTutorialsListQuery();

  const tutorials = tutorialsListQuery.data?.items ?? [];

  const handleItemClick = (id: number) => {
    router.push(`/tutorials/tutorial/${id}`);
  };

  return {
    tutorials,
    isLoadingTutorials: tutorialsListQuery.isPending,
    isErrorTutorials: tutorialsListQuery.isError,
    handleTutorialClick: handleItemClick,
  };
}