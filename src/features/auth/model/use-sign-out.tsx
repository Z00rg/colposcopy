import { useResetSession } from "@/entities/session";
import { authApi } from "@/shared/api/authApi";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useSignOut() {
  const resetSession = useResetSession();
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: authApi.signOut,
    async onSuccess() {
      router.push(ROUTES.SIGN_IN);
      resetSession();
    },
  });

  return {
    signOut: signOutMutation.mutate,
  };
}
