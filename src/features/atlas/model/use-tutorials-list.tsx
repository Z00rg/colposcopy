"use client";

import { useTutorialsListQuery } from "@/entities/tutorials";
import { useRouter } from "next/navigation";

export function useTutorialsList() {
  const router = useRouter();
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