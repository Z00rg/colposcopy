import { casesControllerGetClinicalCasesInfo } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";

const clinicalCasesKey = ["clinical-cases"];

export function useClinicalCasesListQuery() {
  return useQuery({
    queryKey: clinicalCasesKey,
    queryFn: casesControllerGetClinicalCasesInfo,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}
