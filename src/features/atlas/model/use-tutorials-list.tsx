"use client";

import { useTutorialsListQuery } from "@/entities/tutorials";
import { useRouter } from "next/navigation";
import {useTutorialFilesListQuery} from "@/entities/tutorials/queries";

/**
 * Хук для работы со списком обучающих материалов (туториалов)
 *
 * Предоставляет:
 * - Список всех туториалов
 * - Навигацию к конкретному туториалу
 * - Состояния загрузки и ошибок
 */
export function useTutorialsList() {
  // ========== Навигация ==========
  const router = useRouter();

  // ========== Запрос данных ==========
  const tutorialsListQuery = useTutorialsListQuery();
  const tutorialFilesListQuery = useTutorialFilesListQuery();

  // Извлекаем список туториалов (с fallback на пустой массив)
  const tutorials = tutorialsListQuery.data?.items ?? [];
  const tutorialFiles = tutorialFilesListQuery.data?.items ?? [];

  // ========== Обработчики ==========
  /**
   * Навигация к странице конкретного туториала
   * @param id - ID туториала
   */
  const handleItemClick = (id: number) => {
    router.push(`/tutorials/tutorial/${id}`);
  };


  // ========== Возвращаемые значения ==========
  return {
    tutorials,                                      // Список туториалов
    tutorialFiles,                                      // Список файлов туториалов
    isLoadingTutorialFiles: tutorialFilesListQuery.isPending, // Загрузка файлов
    isErrorTutorialFiles: tutorialFilesListQuery.isError,     // Ошибка файлов
    isLoadingTutorials: tutorialsListQuery.isPending, // Загрузка
    isErrorTutorials: tutorialsListQuery.isError,     // Ошибка
    handleTutorialClick: handleItemClick,             // Обработчик клика
  };
}