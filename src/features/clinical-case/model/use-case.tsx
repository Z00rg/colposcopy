import { usePathologyQuery } from "@/entities/pathology";
import { useRouter } from "next/router";
import { useState } from "react";

export function useCase() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { caseId } = router.query;
  const validCaseId =
    typeof caseId === "string" ? caseId : undefined;
  const caseQuery = usePathologyQuery(validCaseId as string);

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