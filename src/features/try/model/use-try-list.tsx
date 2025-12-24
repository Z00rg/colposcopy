"use client";

import { useTryListQuery } from "@/entities/try-list";
import { useRouter } from "next/navigation";

/**
 * Хук для работы со списком попыток прохождения тестов
 *
 * Предоставляет:
 * - Список всех попыток пользователя
 * - Навигацию к детальному просмотру конкретной попытки
 * - Состояния загрузки и ошибок
 *
 * Используется на странице истории попыток тестирования
 */
export function useTryList() {
    // ========== Навигация ==========
    const router = useRouter();

    // ========== Запрос данных ==========
    const tryListQuery = useTryListQuery();

    // ========== Обработка данных ==========
    // Извлекаем список попыток с fallback на пустой массив
    const items = tryListQuery.data?.items ?? [];

    // ========== Обработчики ==========
    /**
     * Навигация к странице детального просмотра попытки
     * @param id - ID попытки тестирования
     */
    const handleTryClick = (id: number) => {
        router.push(`/try/${id}`);
    };

    // ========== Возвращаемые значения ==========
    return {
        items,                              // Список попыток тестирования
        isLoading: tryListQuery.isPending,  // Индикатор загрузки
        isError: tryListQuery.isError,        // Индикатор ошибки
        handleTryClick,                     // Обработчик клика по попытке
    };
}