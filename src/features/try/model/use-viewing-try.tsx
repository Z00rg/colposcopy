"use client"

import { useTryQuery } from "@/entities/try-list";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export function useViewingTry() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const params = useParams();

  const tryId = params?.tryId;
  const validTryId = Array.isArray(tryId) ? tryId[0] : tryId;

  const tryQuery = useTryQuery(validTryId as string);
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
