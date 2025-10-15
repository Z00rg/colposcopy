import { useTestListQuery } from "@/entities/test-list";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter } from "next/router";
import { useState } from "react";

export function useTestList() {
  const router = useRouter();

  // Состояние для хранения ID
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Функция для переключения выбора патологии
  const handleTogglePathology = (id: number) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        // Удалить ID
        return prevIds.filter((selectedId) => selectedId !== id);
      } else {
        // Добавить ID
        return [...prevIds, id];
      }
    });
  };

  // Обработчик начала попытки
  const handleStartAttempt = () => {
    if (selectedIds.length === 0) {
      alert("Пожалуйста, выберите хотя бы одну патологию для теста.");
      return;
    }

    // Преобразуем массив в строку
    const idsString = selectedIds.join(",");

    // Навигация с параметром запроса (Query Parameter)
    router.push({
      pathname: ROUTES.PASSING,
      query: { testIds: idsString },
    });
  };

  const testListQuery = useTestListQuery();

  const items = testListQuery.data?.items ?? [];

  return {
    items,
    isLoading: testListQuery.isPending,
    isError: testListQuery.isError,
    selectedIds,
    handleTogglePathology,
    handleStartAttempt,
  };
}