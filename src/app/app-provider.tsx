import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./store/root-store-context";
import { ReactNode } from "react";

export function AppProvider({ children }: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>
    </QueryClientProvider>
  );
}