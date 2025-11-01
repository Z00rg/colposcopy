import { useTestTasksQuery } from "@/entities/test/queries";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export function useTestTasks() {
  // ------------------------------------------------------------------
  // СОСТОЯНИЕ
  // ------------------------------------------------------------------
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, Record<number, number[]>>
  >({});

  const router = useRouter();

  // ------------------------------------------------------------------
  // ОБРАБОТКА URL-ПАРАМЕТРОВ
  // ------------------------------------------------------------------
  const { testIds } = router.query;

  // Преобразуем testIds из query в формат "1-2-3"
  const selectedPathologyIds: string = useMemo(() => {
    if (typeof testIds === "string" && testIds.length > 0) {
      const ids = testIds
        .split(",")
        .map((id) => Number(id))
        .filter((id) => !isNaN(id) && id > 0);
      return ids.join("-");
    }
    return "";
  }, [testIds]);

  // ------------------------------------------------------------------
  // ЗАПРОС К СЕРВЕРУ
  // ------------------------------------------------------------------
  const testTasksQuery = useTestTasksQuery(selectedPathologyIds);
  const tasks = testTasksQuery.data?.items ?? [];

  // ------------------------------------------------------------------
  // ОБРАБОТЧИКИ
  // ------------------------------------------------------------------
  const handleTaskChange = (index: number) => {
    // Проверяем границы, защищаемся от undefined
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };

  const handleFinishAttempt = () => {
    console.log("Завершение попытки с ответами:", selectedAnswers);
    // router.push(ROUTES.HOME);
  };

  const getSelectedFor = (taskId: number, questionIndex: number): number[] =>
    selectedAnswers[taskId]?.[questionIndex] ?? [];

  const toggleAnswer = (
    taskId: number,
    questionIndex: number,
    answerIndex: number,
    typeQuestion: number // 0 - одиночный, 1 - множественный
  ) => {
    setSelectedAnswers((prev) => {
      const taskAnswers = { ...(prev[taskId] || {}) };
      const current = taskAnswers[questionIndex]
        ? [...taskAnswers[questionIndex]]
        : [];

      if (typeQuestion === 0) {
        taskAnswers[questionIndex] = [answerIndex];
      } else {
        if (current.includes(answerIndex)) {
          taskAnswers[questionIndex] = current.filter((i) => i !== answerIndex);
        } else {
          taskAnswers[questionIndex] = [...current, answerIndex];
        }
      }

      return { ...prev, [taskId]: taskAnswers };
    });
  };

  // ------------------------------------------------------------------
  // ВОЗВРАТ
  // ------------------------------------------------------------------
  return {
    tasks,
    isLoading: testTasksQuery.isPending,
    isError: testTasksQuery.isError,
    currentTaskIndex,
    handleTaskChange,
    handleFinishAttempt,
    getSelectedFor,
    toggleAnswer,
  };
}
