import {
  useSubmitAnswersMutation,
  useTestTasksQuery,
} from "@/entities/test/queries";
import {
  ISelectedCase,
  ISelectedQuestion,
} from "@/shared/api/testApi";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export function useTestTasks() {
  //Состояния
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, Record<number, number[]>>
  >({});
  const [startTime, setStartTime] = useState<number | null>(null);

  const router = useRouter();

  const submitAnswersMutation = useSubmitAnswersMutation();

  // URL параметры
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

  // Работа с запросами
  const testTasksQuery = useTestTasksQuery(selectedPathologyIds);

  const tasks = useMemo(
    () => testTasksQuery.data?.items ?? [],
    [testTasksQuery]
  );

  // Время начала попытки
  useEffect(() => {
    if (tasks.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [tasks, startTime]);

  // Преобразует ответы из формата Record<taskId, Record<questionIndex, answerIndex[]>> в формат SubmitTestAnswersBodyDto.
  const transformAnswersToDto = () => {
    const selectedCases: ISelectedCase[] = tasks
      .map((task) => {
        const answersForTask = selectedAnswers[task.id];
        if (!answersForTask) {
          return null; // Если для таска нет ответов, пропускаем его
        }

        const selectedQuestions: ISelectedQuestion[] = task.testsQuestions
          .map((question, questionIndex) => {
            const selectedAnswersForQuestion = answersForTask[questionIndex];
            const selectedAnswersIdForQuestion: number[] = [];
            question.answers.map((answer, answerIndex) => {
              if (selectedAnswersForQuestion.includes(answerIndex)) {
                selectedAnswersIdForQuestion.push(answer.id);
              }
            });

            // Проверяем, есть ли ответы для этого вопроса по его индексу
            if (
              selectedAnswersForQuestion &&
              selectedAnswersForQuestion.length > 0
            ) {
              return {
                questionId: question.id, // ID вопроса
                selectedAnswers: selectedAnswersIdForQuestion, // Массив ID ответов
              };
            }
            return null;
          })
          .filter((q): q is ISelectedQuestion => q !== null); // Фильтр вопросов без ответов

        // Возвращаем объект кейса, если есть хоть один отвеченный вопрос
        if (selectedQuestions.length > 0) {
          return {
            caseId: task.id,
            answers: selectedQuestions,
          };
        }
        return null;
      })
      .filter((c): c is ISelectedCase => c !== null); // Отфильтровываем кейсы без ответов

    return { items: selectedCases };
  };

  // Обработчики на батоны
  const handleTaskChange = (index: number) => {
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };

  const handleFinishAttempt = async () => {
    const selectedAnswersForSubmit = transformAnswersToDto();
    // Длительность теста в секундах
    const duration = startTime
      ? Math.round((Date.now() - startTime) / 1000)
      : 0;

    if (!selectedPathologyIds) return;

    try {
      await submitAnswersMutation.mutateAsync({
        items: selectedAnswersForSubmit.items,
        duration: duration,
      });

      console.log("Ответы успешно отправлены!");
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
    }
  };

  const getSelectedFor = (taskId: number, questionIndex: number): number[] =>
    selectedAnswers[taskId]?.[questionIndex] ?? [];

  const toggleAnswer = (
    taskId: number,
    questionIndex: number,
    answerIndex: number,
    typeQuestion: number
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

  // Статус заполнения
  const completionByTask = useMemo(() => {
    return tasks.map((task) => {
      const answersForTask = selectedAnswers[task.id] || {};
      const totalQuestions = task.testsQuestions.length;

      // количество отвеченных вопросов (где есть хотя бы 1 выбранный ответ)
      const answeredCount = Object.values(answersForTask).filter(
        (arr) => arr.length > 0
      ).length;

      return {
        taskId: task.id,
        totalQuestions,
        answeredCount,
        isComplete: answeredCount === totalQuestions,
      };
    });
  }, [selectedAnswers, tasks]);

  const isAllTasksComplete = useMemo(
    () => completionByTask.every((t) => t.isComplete),
    [completionByTask]
  );

  return {
    tasks,
    setCurrentTaskIndex,
    isLoading: testTasksQuery.isPending,
    isError: testTasksQuery.isError,
    isLoadingSubmit: submitAnswersMutation.isPending,
    isErrorSubmit: submitAnswersMutation.isError,
    currentTaskIndex,
    handleTaskChange,
    handleFinishAttempt,
    getSelectedFor,
    toggleAnswer,
    completionByTask,
    isAllTasksComplete,
  };
}
