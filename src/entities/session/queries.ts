import { useQueryClient } from "@tanstack/react-query";

export function useResetSession() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.removeQueries();
  };
}
