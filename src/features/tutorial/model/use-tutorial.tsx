"use client";

import { useTutorialQuery } from "@/entities/tutorials";
import { useParams } from "next/navigation";

export function useTutorial() {
  const params = useParams();

  const tutorialId = params?.tutorialId;
  const validTutorialId = Array.isArray(tutorialId) ? tutorialId[0] : tutorialId;
  const tutorialQuery = useTutorialQuery(validTutorialId as string);

  return {
    tutorialDetails: tutorialQuery.data,
    isLoading: tutorialQuery.isPending,
    isError: tutorialQuery.isError,
  };
}