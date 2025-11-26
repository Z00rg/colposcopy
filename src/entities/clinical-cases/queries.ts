// import { casesControllerGetClinicalCasesInfo } from "@/shared/api/api";
// import { casesControllerGetCaseInfo } from "@/shared/api/api";
import { casesApi } from "@/shared/api/casesApi";
import { useQuery } from "@tanstack/react-query";

const clinicalCasesKey = ["clinical-cases"];
const caseKey = (id: string) => ["case", id];

export function useClinicalCasesQuery() {
  return useQuery({
    queryKey: clinicalCasesKey,
    // queryFn: casesControllerGetClinicalCasesInfo,
    queryFn: casesApi.getCaseList,
    retry: 0,
    staleTime: 60 * 60 * 1000,
  });
}

export function useCaseQuery(caseId: string) {
  return useQuery({
    queryKey: caseKey(caseId),
    // queryFn: () => casesControllerGetCaseInfo(caseId),
    queryFn: () => casesApi.getCaseInfo(caseId),
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
  });
}
