"use client";

import { useCaseQuery } from "@/entities/clinical-cases/queries";
import { useParams } from "next/navigation";
import { useState } from "react";

/**
 * Хук для отображения детальной информации о клиническом случае
 *
 * Функциональность:
 * - Загрузка данных клинического случая по ID из URL
 * - Отслеживание текущего отображаемого изображения в галерее
 * - Обработка состояний загрузки и ошибок
 */
export function useCase() {
  // ========== Получение параметров из URL ==========
  const params = useParams();
  const caseId = params?.caseId;

  // Нормализация ID (может быть массивом в dynamic routes Next.js)
  const validCaseId = Array.isArray(caseId) ? caseId[0] : caseId;

  // ========== Состояние галереи изображений ==========
  // Индекс текущего отображаемого изображения (для переключения между фото)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ========== Запрос данных клинического случая ==========
  const caseQuery = useCaseQuery(validCaseId as string);

  // ========== Обработчики ==========
  /**
   * Обновляет индекс текущего изображения при прокрутке галереи
   * @param index - новый индекс изображения (от 0 до длины массива изображений)
   */
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // ========== Возвращаемые значения ==========
  return {
    caseDetails: caseQuery.data,       // Детальная информация о клиническом случае
    isLoading: caseQuery.isPending,    // Состояние загрузки данных
    isError: caseQuery.isError,        // Ошибка при загрузке данных
    currentImageIndex,                 // Текущий индекс изображения в галерее
    handleImageChange,                 // Функция для смены изображения
  };
}