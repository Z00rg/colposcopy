import {queryClient} from "@/shared/api/query-client";


export function useResetSession() {
  return () => {
    queryClient.removeQueries();
  };
}
