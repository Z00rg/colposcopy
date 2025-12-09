import { useTutorialQuery } from "@/entities/tutorials";
import { useRouter } from "next/router";

export function useTutorial() {
  const router = useRouter();

  const { tutorialId } = router.query;
  const validTutorialId =
    typeof tutorialId === "string" ? tutorialId : undefined;
  const tutorialQuery = useTutorialQuery(validTutorialId as string);

  return {
    tutorialDetails: tutorialQuery.data,
    isLoading: tutorialQuery.isPending,
    isError: tutorialQuery.isError,
  };
}