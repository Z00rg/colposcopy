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
  // ------------------------------------------------------------------
  // СОСТОЯНИЕ
  // ------------------------------------------------------------------
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, Record<number, number[]>>
  >({});
  const [startTime, setStartTime] = useState<number | null>(null);

  const router = useRouter();

  const submitAnswersMutation = useSubmitAnswersMutation();

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
  // 🧩 ДАННЫЕ ЗАДАНИЙ (ЗАГЛУШКА)
  // ------------------------------------------------------------------

  // tasks данные заглушки
  // const tasksTesting: ITestTask[] = [
  //   {
  //     id: 132,
  //     imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //     testsQuestions: [
  //       {
  //         id: 123,
  //         question: "ПЕЕРВЫЙ ПТАЛАГОИЯ Первичный осмотр",
  //         typeQuestion: 0,
  //         instructions: "Выберите один ответ.",
  //         answers: [
  //           { id: 123, text: "Кольпоскопическая картина адекватная " },
  //           { id: 124, text: "Кольпоскопическая картина неадекватная " },
  //         ],
  //       },
  //       {
  //         id: 124,
  //         question: "Граница между МПЭ и ЦЭ",
  //         typeQuestion: 1,
  //         instructions:
  //           "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //         answers: [
  //           { id: 125, text: "Визуализируется полностью" },
  //           { id: 126, text: "Визуализируется частично" },
  //           { id: 127, text: "Не визуализируется" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 212,
  //     imageSrcs: [
  //       "/test2.png",
  //       "/test2.png",
  //       "/test2.png",
  //       "/test2.png",
  //       "/test2.png",
  //     ],
  //     testsQuestions: [
  //       {
  //         id: 125,
  //         question: "ЭТО ОТ ВТОРОГО ВОПРОСА Первичный осмотр",
  //         typeQuestion: 0,
  //         instructions: "Выберите один ответ.",
  //         answers: [
  //           { id: 123, text: "Кольпоскопическая картина адекватная " },
  //           { id: 124, text: "Кольпоскопическая картина неадекватная " },
  //         ],
  //       },
  //       {
  //         id: 126,
  //         question: "Граница между МПЭ и ЦЭ",
  //         typeQuestion: 1,
  //         instructions:
  //           "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //         answers: [
  //           { id: 125, text: "Визуализируется полностью" },
  //           { id: 126, text: "Визуализируется частично" },
  //           { id: 127, text: "Не визуализируется" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 311,
  //     imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //     testsQuestions: [
  //       {
  //         id: 127,
  //         question: "ТРЕТИЙ ПТАЛАГОИЯ Первичный осмотр",
  //         typeQuestion: 0,
  //         instructions: "Выберите один ответ.",
  //         answers: [
  //           { id: 123, text: "Кольпоскопическая картина адекватная " },
  //           { id: 124, text: "Кольпоскопическая картина неадекватная " },
  //         ],
  //       },
  //       {
  //         id: 128,
  //         question: "Граница между МПЭ и ЦЭ",
  //         typeQuestion: 1,
  //         instructions:
  //           "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //         answers: [
  //           { id: 125, text: "Визуализируется полностью" },
  //           { id: 126, text: "Визуализируется частично" },
  //           { id: 127, text: "Не визуализируется" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 144,
  //     imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //     testsQuestions: [
  //       {
  //         id: 129,
  //         question: "ЭТО ОТ ЧЕТВЕРТОГО ВОПРОСА Первичный осмотр",
  //         typeQuestion: 0,
  //         instructions: "Выберите один ответ.",
  //         answers: [
  //           { id: 123, text: "Кольпоскопическая картина адекватная " },
  //           { id: 124, text: "Кольпоскопическая картина неадекватная " },
  //         ],
  //       },
  //       {
  //         id: 130,
  //         question: "Граница между МПЭ и ЦЭ",
  //         typeQuestion: 1,
  //         instructions:
  //           "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //         answers: [
  //           { id: 125, text: "Визуализируется полностью" },
  //           { id: 126, text: "Визуализируется частично" },
  //           { id: 127, text: "Не визуализируется" },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // ------------------------------------------------------------------
  // ЗАПРОС К СЕРВЕРУ
  // ------------------------------------------------------------------
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

  // const tasks = tasksTesting;

  // ------------------------------------------------------------------
  // 🛠️ ПРЕОБРАЗОВАНИЕ ДАННЫХ
  // ------------------------------------------------------------------

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
                questionId: question.id, // Используем фактический ID вопроса
                selectedAnswers: selectedAnswersIdForQuestion, // Массив ID ответов
              };
            }
            return null;
          })
          .filter((q): q is ISelectedQuestion => q !== null); // Отфильтровываем вопросы без ответов

        // Возвращаем объект кейса, только если есть хоть один отвеченный вопрос
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

  // ------------------------------------------------------------------
  // ОБРАБОТЧИКИ
  // ------------------------------------------------------------------
  const handleTaskChange = (index: number) => {
    // Проверяем границы, защищаемся от undefined
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

      console.log("✅ Ответы успешно отправлены!");
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("❌ Ошибка при отправке ответов:", error);
    }
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
  // 🧮 СТАТУС ЗАПОЛНЕНИЯ
  // ------------------------------------------------------------------

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
    completionByTask, // [{ taskId, answeredCount, totalQuestions, isComplete }]
    isAllTasksComplete,
  };
}
