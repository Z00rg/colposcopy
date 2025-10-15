import { useInstructionQuery } from "@/entities/instruction";

export function useInstruction() {
  const instructionQuery = useInstructionQuery();

  return {
    instructionDetails: instructionQuery.data,
    isLoading: instructionQuery.isPending,
    isError: instructionQuery.isError,
  };
}
