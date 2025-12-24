"use client";

import { useTestListQuery } from "@/entities/test";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Хук для работы со списком патологий и созданием теста
 *
 * Функциональность:
 * - Отображение списка доступных патологий
 * - Множественный выбор патологий для тестирования
 * - Формирование и запуск теста с выбранными патологиями
 *
 * Используется на странице создания нового теста
 */
export function useTestList() {
  // ========== Навигация ==========
  const router = useRouter();

  // ========== Локальное состояние ==========
  // Массив ID выбранных патологий для включения в тест
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // ========== Запрос данных ==========
  const testListQuery = useTestListQuery();

  // Извлекаем список патологий с fallback на пустой массив
  const items = testListQuery.data?.items ?? [];

  // ========== Обработчики ==========
  /**
   * Переключает выбор патологии (добавление/удаление из списка)
   *
   * Логика:
   * - Если патология уже выбрана → удаляем из списка
   * - Если патология не выбрана → добавляем в список
   *
   * @param id - ID патологии для переключения
   */
  const handleTogglePathology = (id: number) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        // Патология выбрана → удаляем
        return prevIds.filter((selectedId) => selectedId !== id);
      } else {
        // Патология не выбрана → добавляем
        return [...prevIds, id];
      }
    });
  };

  /**
   * Запускает тест с выбранными патологиями
   *
   * Процесс:
   * 1. Валидация: проверяет, что выбрана хотя бы одна патология
   * 2. Формирование URL с ID патологий в query параметрах
   * 3. Навигация на страницу прохождения теста
   */
  const handleStartAttempt = () => {
    // ========== Валидация выбора ==========
    if (selectedIds.length === 0) {
      alert("Пожалуйста, выберите хотя бы одну патологию для теста.");
      return;
    }

    // ========== Формирование параметров ==========
    // Преобразуем массив ID в строку формата: "1,2,3"
    const idsString = selectedIds.join(",");

    // ========== Навигация ==========
    // Переход на страницу прохождения теста с передачей выбранных ID
    router.push(`${ROUTES.PASSING}?testIds=${idsString}`);
  };

  // ========== Возвращаемые значения ==========
  return {
    items,                              // Список доступных патологий
    isLoading: testListQuery.isPending, // Индикатор загрузки списка
    isError: testListQuery.isError,     // Индикатор ошибки загрузки
    selectedIds,                        // Массив ID выбранных патологий
    handleTogglePathology,              // Функция переключения выбора патологии
    handleStartAttempt,                 // Функция запуска теста
  };
}