"use client";

import { useCaseQuery } from "@/entities/clinical-cases/queries";
import { useParams } from "next/navigation";
import { useState } from "react";

export function useCase() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const caseId = params?.caseId;
  const validCaseId = Array.isArray(caseId) ? caseId[0] : caseId;
  const caseQuery = useCaseQuery(validCaseId as string);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    caseDetails: caseQuery.data,
    isLoading: caseQuery.isPending,
    isError: caseQuery.isError,
    currentImageIndex,
    handleImageChange,
  };
}