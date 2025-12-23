import {casesApi} from "@/shared/api/casesApi";
import {useQuery} from "@tanstack/react-query";

const clinicalCasesKey = ["clinical-cases"];
const caseKey = (id: string) => ["case", id];

// Запрос списка клинических кейсов
export function useClinicalCasesQuery() {

    return useQuery({
        queryKey: clinicalCasesKey,
        queryFn: casesApi.getCaseList,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
    });
}

// Запрос определенного кейса
export function useCaseQuery(caseId: string) {

    return useQuery({
        queryKey: caseKey(caseId),
        queryFn: () => casesApi.getCaseInfo(caseId),
        staleTime: 60 * 60 * 1000, // 60 минут
        retry: 0,
    });
}
