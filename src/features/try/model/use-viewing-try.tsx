import { useTryQuery } from "@/entities/try-list";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export function useViewingTry() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const router = useRouter();

  const { tryId } = router.query;

  const tryQuery = useTryQuery(tryId as string);
  const tasks = useMemo(
    () => tryQuery.data?.items ?? [],
    [tryQuery]
  );

  const handleTaskChange = (index: number) => {
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };


  return {
    tasks,
    setCurrentTaskIndex,
    isLoading: tryQuery.isPending,
    isError: tryQuery.isError,
    currentTaskIndex,
    handleTaskChange,
  };
}
