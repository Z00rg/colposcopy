"use client";

import { useTutorialQuery } from "@/entities/tutorials";
import { useParams } from "next/navigation";

/**
 * Хук для отображения детальной информации об обучающем материале (туториале)
 *
 * Функциональность:
 * - Загрузка данных туториала по ID из URL
 * - Обработка состояний загрузки и ошибок
 *
 * Используется на странице просмотра конкретного туториала
 */
export function useTutorial() {
  // ========== Получение параметров из URL ==========
  const params = useParams();
  const tutorialId = params?.tutorialId;

  // ========== Нормализация ID ==========
  // Обработка случая, когда ID может быть массивом (dynamic routes в Next.js)
  const validTutorialId = Array.isArray(tutorialId)
      ? tutorialId[0]
      : tutorialId;

  // ========== Запрос данных туториала ==========
  const tutorialQuery = useTutorialQuery(validTutorialId as string);

  // ========== Возвращаемые значения ==========
  return {
    tutorialDetails: tutorialQuery.data, // Детальная информация о туториале
    isLoading: tutorialQuery.isPending,  // Состояние загрузки данных
    isError: tutorialQuery.isError,      // Состояние ошибки загрузки
  };
}