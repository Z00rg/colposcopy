// import { testControllerGetInstructionInfo } from "@/shared/api/api";
import { testApi } from "@/shared/api/testApi";
import { useQuery } from "@tanstack/react-query";

const instructionKey = ["instruction"];

export function useInstructionQuery() {
    return useQuery({
        queryKey: instructionKey,
        // queryFn: testControllerGetInstructionInfo,
        queryFn: testApi.getInstructionInfo,
        retry: 0,
        staleTime: 10 * 60 * 1000, //время жизни кеша 10 минут
    });
}