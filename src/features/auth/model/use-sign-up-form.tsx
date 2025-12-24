"use client";

import { authApi, SignUpBodyDto } from "@/shared/api/authApi";
import { ROUTES } from "@/shared/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Хук для формы регистрации
 *
 * Этапы:
 * 1. Личные данные (ФИО)
 * 2. Профессиональные данные (работа, должность)
 * 3. Данные для входа (email, пароль)
 */
export function useSignUpForm() {
  // ========== Навигация ==========
  const router = useRouter();

  // ========== Состояние шагов формы ==========
  // Текущий этап регистрации (1-3)
  const [currentStageIndex, setCurrentStageIndex] = useState(1);

  /**
   * Переключение между этапами формы
   * @param index - номер этапа (1, 2 или 3)
   */
  const handleStageChange = (index: number) => {
    setCurrentStageIndex(index);
  };

  // ========== Управление формой ==========
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    name: string;
    surname: string;
    patronymic: string;
    work: string;
    position: string;
    email: string;
    password: string;
    password2: string;
  }>({
    mode: "onChange", // Валидация при каждом изменении поля
  });

  // ========== Мутация регистрации ==========
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpBodyDto) => authApi.signUp(data),
    onSuccess: () => {
      router.push(ROUTES.SIGN_IN);
    },
  });

  // ========== Обработка ошибок ==========
  const errorMessage = signUpMutation.error
      ? "Проверьте введенные данные"
      : undefined;

  // ========== Возвращаемые значения ==========
  return {
    register,                                     // Регистрация полей формы
    errorMessage,                                 // Сообщение об ошибке
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)), // Отправка формы
    isPending: signUpMutation.isPending,          // Индикатор загрузки
    currentStageIndex,                            // Текущий этап (1-3)
    handleStageChange,                            // Переключение этапов
    isAllFieldsFilled: isValid,                   // Все поля заполнены корректно
  };
}