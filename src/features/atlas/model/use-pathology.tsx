"use client";

import { usePathologyQuery } from "@/entities/pathology";
import { useParams } from "next/navigation";
import { useState } from "react";

/**
 * Хук для отображения детальной информации о патологии
 *
 * Функциональность:
 * - Загрузка данных патологии по ID из URL
 * - Отслеживание текущего отображаемого изображения (для галереи)
 */
export function usePathology() {
  // ========== Получение параметров из URL ==========
  const params = useParams();
  const pathologyId = params?.pathologyId;

  // Нормализация ID (может быть массивом в dynamic routes)
  const validPathologyId = Array.isArray(pathologyId)
      ? pathologyId[0]
      : pathologyId;

  // ========== Состояние галереи изображений ==========
  // Индекс текущего отображаемого изображения
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ========== Запрос данных патологии ==========
  const pathologyQuery = usePathologyQuery(validPathologyId as string);

  // ========== Обработчики ==========
  /**
   * Обновляет индекс текущего изображения при прокрутке галереи
   * @param index - новый индекс изображения
   */
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // ========== Возвращаемые значения ==========
  return {
    pathologyDetails: pathologyQuery.data,  // Данные патологии
    isLoading: pathologyQuery.isPending,    // Загрузка
    isError: pathologyQuery.isError,        // Ошибка
    currentImageIndex,                      // Текущее изображение
    handleImageChange,                      // Обработчик смены изображения
  };
}