"use client";

import { useClinicalCasesQuery } from "@/entities/clinical-cases";

/**
 * Хук для работы со списком клинических случаев
 *
 * Предоставляет:
 * - Список всех доступных клинических случаев
 * - Состояния загрузки и ошибок
 *
 * Используется на странице выбора клинического случая
 */
export function useClinicalCases() {
  // ========== Запрос данных ==========
  const clinicalCasesQuery = useClinicalCasesQuery();

  // ========== Обработка данных ==========
  // Извлекаем список случаев с fallback на пустой массив
  // (защита от undefined, если запрос еще не выполнен или данных нет)
  const items = clinicalCasesQuery.data?.items ?? [];

  // ========== Возвращаемые значения ==========
  return {
    items,                                    // Массив клинических случаев
    isLoading: clinicalCasesQuery.isPending,  // Индикатор загрузки данных
    isError: clinicalCasesQuery.isError,      // Индикатор ошибки загрузки
  };
}