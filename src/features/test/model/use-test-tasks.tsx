"use client";

import {
  useSubmitAnswersMutation,
  useTestTasksQuery,
} from "@/entities/test/queries";
import {
  ISelectedCase,
  ISelectedQuestion,
} from "@/shared/api/testApi";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form"; // Добавили useWatch

// ========== Типы ==========

/**
 * Структура формы для хранения ответов теста
 * Ключ: `${taskId}_${questionIndex}` (например, "1_0", "1_1", "2_0")
 * Значение: массив индексов выбранных ответов
 */
type TestFormData = Record<string, number[]>;

// Ключи для localStorage
const TEST_ANSWERS_STORAGE_KEY = "test_answers_progress";
const TEST_START_TIME_KEY = "test_start_time";
const TEST_IDS_KEY = "test_ids";

// ========== Утилиты ==========

/**
 * Генерирует уникальный ключ для поля формы
 */
const getFieldKey = (taskId: number, questionIndex: number): string => {
  return `${taskId}_${questionIndex}`;
};

/**
 * Парсит ключ поля обратно в taskId и questionIndex
 */
const parseFieldKey = (key: string): { taskId: number; questionIndex: number } | null => {
  const parts = key.split("_");
  if (parts.length === 2) {
    const taskId = parseInt(parts[0], 10);
    const questionIndex = parseInt(parts[1], 10);
    if (!isNaN(taskId) && !isNaN(questionIndex)) {
      return { taskId, questionIndex };
    }
  }
  return null;
};

/**
 * Хук для прохождения теста
 *
 * Функциональность:
 * - Загрузка заданий теста по ID патологий из URL
 * - Управление ответами через react-hook-form
 * - Автосохранение прогресса в localStorage
 * - Отслеживание заполненности заданий
 * - Отправка результатов на сервер
 */
export function useTestTasks() {
  // ========== Навигация и параметры ==========
  const router = useRouter();
  const searchParams = useSearchParams();
  const testIds = searchParams.get("testIds");

  // ========== Состояние ==========
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [startTime] = useState<number>(() => {
    // Инициализируем время начала теста
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(TEST_START_TIME_KEY);
      if (saved) return parseInt(saved, 10);
    }
    const now = Date.now();
    if (typeof window !== "undefined") {
      localStorage.setItem(TEST_START_TIME_KEY, now.toString());
    }
    return now;
  });

  // ========== Преобразование ID патологий ==========
  // Формат URL: "1,2,3" → Формат API: "1-2-3"
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

  // ========== Запросы ==========
  const testTasksQuery = useTestTasksQuery(selectedPathologyIds);
  const submitAnswersMutation = useSubmitAnswersMutation();

  const tasks = useMemo(
      () => testTasksQuery.data?.items ?? [],
      [testTasksQuery.data]
  );

  // ========== React Hook Form ==========
  const {
    control,
    setValue,
    getValues,
  } = useForm<TestFormData>({
    mode: "onChange",
    defaultValues: {},
  });

  // Получаем все значения формы для отслеживания изменений
  // useWatch безопасен для React Compiler
  const formData = useWatch({ control }) as TestFormData;

  // ========== Восстановление прогресса из localStorage ==========
  useEffect(() => {
    if (typeof window === "undefined" || tasks.length === 0) return;

    try {
      const savedAnswers = localStorage.getItem(TEST_ANSWERS_STORAGE_KEY);
      const savedTestIds = localStorage.getItem(TEST_IDS_KEY);

      // Проверяем, что сохраненные данные относятся к текущему тесту
      if (savedAnswers && savedTestIds === testIds) {
        const parsed = JSON.parse(savedAnswers) as TestFormData;

        // Восстанавливаем ответы
        Object.entries(parsed).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            setValue(key, value);
          }
        });
      } else {
        // Если это новый тест, очищаем старые данные
        localStorage.setItem(TEST_IDS_KEY, testIds || "");
      }
    } catch (error) {
      console.error("Ошибка восстановления прогресса теста:", error);
    }
  }, [tasks, testIds, setValue]);

  // ========== Автосохранение в localStorage ==========
  useEffect(() => {
    if (typeof window === "undefined" || !formData) return;

    try {
      localStorage.setItem(TEST_ANSWERS_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Ошибка сохранения прогресса теста:", error);
    }
  }, [formData]);

  // ========== Обработчики ==========

  /**
   * Переключение задания
   */
  const handleTaskChange = (index: number) => {
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };

  /**
   * Получает выбранные ответы для конкретного вопроса
   */
  const getSelectedFor = (taskId: number, questionIndex: number): number[] => {
    const key = getFieldKey(taskId, questionIndex);
    return formData?.[key] || [];
  };

  /**
   * Переключает выбор ответа
   */
  const toggleAnswer = (
      taskId: number,
      questionIndex: number,
      answerIndex: number,
      typeQuestion: number // 0: один ответ, 1: множественный
  ) => {
    const key = getFieldKey(taskId, questionIndex);
    const current = getValues(key) || [];

    if (typeQuestion === 0) {
      // Один ответ - заменяем
      setValue(key, [answerIndex], { shouldValidate: true });
    } else {
      // Множественный выбор - добавляем/удаляем
      if (current.includes(answerIndex)) {
        setValue(
            key,
            current.filter((i) => i !== answerIndex),
            { shouldValidate: true }
        );
      } else {
        setValue(key, [...current, answerIndex], { shouldValidate: true });
      }
    }
  };

  /**
   * Преобразует ответы из формы в DTO для отправки на сервер
   */
  const transformAnswersToDto = (): { items: ISelectedCase[] } => {
    const currentFormData = getValues();
    const taskMap = new Map<number, Map<number, number[]>>();

    // Группируем ответы по taskId и questionIndex
    Object.entries(currentFormData).forEach(([key, answerIndices]) => {
      const parsed = parseFieldKey(key);
      if (!parsed || !Array.isArray(answerIndices) || answerIndices.length === 0) {
        return;
      }

      const { taskId, questionIndex } = parsed;

      if (!taskMap.has(taskId)) {
        taskMap.set(taskId, new Map());
      }
      taskMap.get(taskId)!.set(questionIndex, answerIndices);
    });

    // Преобразуем в формат DTO
    const selectedCases: ISelectedCase[] = [];

    taskMap.forEach((questionsMap, taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const selectedQuestions: ISelectedQuestion[] = [];

      questionsMap.forEach((answerIndices, questionIndex) => {
        const question = task.testsQuestions[questionIndex];
        if (!question) return;

        // Преобразуем индексы ответов в ID
        const selectedAnswerIds = answerIndices
            .map((idx) => question.answers[idx]?.id)
            .filter((id): id is number => id !== undefined);

        if (selectedAnswerIds.length > 0) {
          selectedQuestions.push({
            questionId: question.id,
            selectedAnswers: selectedAnswerIds,
          });
        }
      });

      if (selectedQuestions.length > 0) {
        selectedCases.push({
          caseId: taskId,
          answers: selectedQuestions,
        });
      }
    });

    return { items: selectedCases };
  };

  /**
   * Завершает тест и отправляет результаты
   */
  const handleFinishAttempt = async () => {
    if (!selectedPathologyIds) return;

    const selectedAnswersForSubmit = transformAnswersToDto();

    // Вычисляем длительность теста в секундах
    const duration = Math.round((Date.now() - startTime) / 1000);

    try {
      submitAnswersMutation.mutateAsync({
        items: selectedAnswersForSubmit.items,
        duration: duration,
      }).then(() => {
        // Очищаем сохраненный прогресс после успешной отправки
        if (typeof window !== "undefined") {
          localStorage.removeItem(TEST_ANSWERS_STORAGE_KEY);
          localStorage.removeItem(TEST_START_TIME_KEY);
          localStorage.removeItem(TEST_IDS_KEY);
        }

        router.push(ROUTES.HOME);
      }).catch((error) => {
        console.error("Ошибка при отправке ответов:", error);
      });
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
    }
  };

  // ========== Статус заполненности ==========

  /**
   * Вычисляет статус заполненности для каждого задания
   */
  const completionByTask = useMemo(() => {
    if (!formData) return [];

    return tasks.map((task) => {
      const totalQuestions = task.testsQuestions.length;
      let answeredCount = 0;

      // Подсчитываем количество отвеченных вопросов
      for (let questionIndex = 0; questionIndex < totalQuestions; questionIndex++) {
        const key = getFieldKey(task.id, questionIndex);
        const answers = formData[key];
        if (answers && answers.length > 0) {
          answeredCount++;
        }
      }

      return {
        taskId: task.id,
        totalQuestions,
        answeredCount,
        isComplete: answeredCount === totalQuestions,
      };
    });
  }, [tasks, formData]);

  /**
   * Проверяет, все ли задания выполнены
   */
  const isAllTasksComplete = useMemo(
      () => completionByTask.every((t) => t.isComplete),
      [completionByTask]
  );

  // ========== Возвращаемые значения ==========
  return {
    tasks,                                      // Массив заданий теста
    setCurrentTaskIndex,                        // Функция установки текущего задания
    isLoading: testTasksQuery.isPending,        // Загрузка заданий
    isError: testTasksQuery.isError,            // Ошибка загрузки заданий
    isLoadingSubmit: submitAnswersMutation.isPending, // Отправка ответов
    isErrorSubmit: submitAnswersMutation.isError,     // Ошибка отправки
    currentTaskIndex,                           // Индекс текущего задания
    handleTaskChange,                           // Переключение заданий
    handleFinishAttempt,                        // Завершение теста
    getSelectedFor,                             // Получение выбранных ответов
    toggleAnswer,                               // Переключение ответа
    completionByTask,                           // Статус заполненности заданий
    isAllTasksComplete,                         // Все задания выполнены
  };
}