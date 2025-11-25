import { useClinicalCasesQuery } from "@/entities/clinical-cases";

export function useClinicalCases() {
  const clinicalCasesQuery = useClinicalCasesQuery();

  const items = clinicalCasesQuery.data?.items ?? [];

  return {
    items,
    isLoading: clinicalCasesQuery.isPending,
    isError: clinicalCasesQuery.isError,
  };
}