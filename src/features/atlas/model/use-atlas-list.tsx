"use client";

import { useAtlasListQuery } from "@/entities/atlas-list";
import { useRouter } from "next/navigation";

/**
 * Хук для работы со списком патологий в атласе
 *
 * Предоставляет:
 * - Список всех патологий
 * - Навигацию к деталям патологии
 * - Состояния загрузки и ошибок
 */
export function useAtlasList( adminList?: boolean ) {
  // ========== Навигация ==========
  const router = useRouter();

  // ========== Запрос данных ==========
  const atlasListQuery = useAtlasListQuery(adminList);

  // Извлекаем список патологий (с fallback на пустой массив)
  const items = atlasListQuery.data?.items ?? [];

  // ========== Обработчики ==========
  /**
   * Навигация к странице детальной информации о патологии
   * @param id - ID патологии
   */
  const handleItemClick = (id: number) => {
    router.push(`/pathology/${id}`);
  };

  // ========== Возвращаемые значения ==========
  return {
    items,                                 // Список патологий
    isLoading: atlasListQuery.isPending,   // Загрузка данных
    isError: atlasListQuery.isError,       // Ошибка загрузки
    handleClick: handleItemClick,          // Обработчик клика по элементу
  };
}