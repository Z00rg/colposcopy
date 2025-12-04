import { authApi } from "@/shared/api/authApi";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function useSignInForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: () => {
      router.push(ROUTES.HOME);
    },
  });

  const errorMessage = signInMutation.error
    ? "Неверный логин или пароль"
    : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isPending: signInMutation.isPending,
  };
}
