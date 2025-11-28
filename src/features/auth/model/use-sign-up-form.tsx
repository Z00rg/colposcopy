// import { authControllerSignUp } from "@/shared/api/api";
import { authApi } from "@/shared/api/authApi";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useSignUpForm() {
  const router = useRouter();
  const [currentStageIndex, setCurrentStageIndex] = useState(1);

  const handleStageChange = (index: number) => {
    setCurrentStageIndex(index);
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    firstName: string;
    surname: string;
    patronymic: string;
    work: string;
    position: string;
    email: string;
    password: string;
    password2: string;
  }>({
    mode: "onChange",
  });

  const signInMutation = useMutation({
    // mutationFn: authControllerSignUp,
    mutationFn: authApi.signUp,
    onSuccess: () => {
      router.push(ROUTES.SIGN_IN);
    },
  });

  const errorMessage = signInMutation.error ? "Ошибка сервера" : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isPending: signInMutation.isPending,
    currentStageIndex,
    handleStageChange,
    isAllFieldsFilled: isValid,
  };
}
