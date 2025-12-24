"use client"

import {useProfileQuery} from "@/entities/profile";
import {accountApi, GetProfileInfoDto} from "@/shared/api/accountApi";
import {queryClient} from "@/shared/api/query-client";
import {useMutation} from "@tanstack/react-query";
import {useState, useMemo} from "react";

/**
 * Хук для управления профилем пользователя
 *
 * Функциональность:
 * - Отображение данных профиля
 * - Редактирование различных секций (личные данные, работа, учетные данные)
 * - Раскрытие/скрытие аккордеона профиля
 */

export function useProfile() {
    // ========== Запрос данных профиля ==========
    const profileQuery = useProfileQuery();
    const info = profileQuery.data;

    // ========== Локальное состояние ==========
    // Состояние раскрытия/скрытия аккордеона профиля
    const [active, setActive] = useState(false);

    // Состояние редактирования для каждой секции: [личные данные, работа, учетные данные]
    const [editState, setEditState] = useState<boolean[]>([false, false, false]);

    // Временное хранилище изменений формы (до сохранения)
    const [formData, setFormData] = useState<Partial<GetProfileInfoDto>>({});

    // ========== Объединение данных ==========
    // Комбинируем данные с сервера и локальные изменения для отображения
    const displayData = useMemo(() => ({
        ...info,
        ...formData
    }), [info, formData]);

    // ========== Мутация для сохранения изменений ==========
    const profileEditMutation = useMutation({
        mutationFn: (data: Partial<GetProfileInfoDto>) => accountApi.editProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"]});
            setFormData({});
        },
    });

    // ========== Обработчики ==========
    /**
     * Обновляет поле формы в локальном состоянии
     */
    const handleChange = (field: keyof GetProfileInfoDto, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    /**
     * Сохраняет изменения секции профиля
     * @param index - индекс секции (0: личные данные, 1: работа, 2: учетные данные)
     */
    const handleSave = (index: number) => {
        // Фильтруем только измененные поля
        const changedFields = Object.entries(formData).reduce(
            (acc, [key, value]) => {
                const fieldKey = key as keyof GetProfileInfoDto;
                // Включаем только непустые и измененные поля
                if (value !== info?.[fieldKey] && value !== "") {
                    acc[fieldKey] = value as GetProfileInfoDto[keyof GetProfileInfoDto];
                }
                return acc;
            },
            {} as Partial<GetProfileInfoDto>
        );

        // Отправляем на сервер только если есть изменения
        if (Object.keys(changedFields).length > 0) {
            profileEditMutation.mutate(changedFields);
        }

        // Выходим из режима редактирования
        toggleEdit(index);
    };

    /**
     * Переключает режим редактирования для секции
     * @param index - индекс секции
     */
    const toggleEdit = (index: number) => {
        if (!profileQuery.isError) {
            setEditState((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    return {
        formData: displayData,         // Данные для отображения (с учетом локальных изменений)
        active,                         // Состояние раскрытия аккордеона
        setActive,                      // Функция переключения аккордеона
        editState,                      // Массив состояний редактирования секций
        toggleEdit,                     // Переключение режима редактирования
        handleChange,                   // Обработчик изменения полей
        handleSave,                     // Сохранение изменений
        isLoading: profileQuery.isPending, // Загрузка данных профиля
        isError: profileQuery.isError,     // Ошибка загрузки профиля
    };
}