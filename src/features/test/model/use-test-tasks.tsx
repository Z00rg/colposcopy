import { useSubmitAnswersMutation, useTestTasksQuery } from "@/entities/test/queries";
import { ROUTES } from "@/shared/constants/routes";
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
  const tasksTesting = [
    {
      id: 1,
      imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
      pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
      testsQuestions: [
        {
          question: "ПЕЕРВЫЙ ПТАЛАГОИЯ Первичный осмотр",
          typeQuestion: 0,
          instructions: "Выберите один ответ.",
          answers: [
            "Кольпоскопическая картина адекватная ",
            "Кольпоскопическая картина неадекватная ",
          ],
        },
        {
          question: "Граница между МПЭ и ЦЭ",
          typeQuestion: 1,
          instructions:
            "Оцените видимость границы между эпителиями. Выберите один ответ.",
          answers: [
            "Визуализируется полностью",
            "Визуализируется частично",
            "Не визуализируется",
          ],
        },
      ],
    },
    {
      id: 2,
      imageSrcs: [
        "/test2.png",
        "/test2.png",
        "/test2.png",
        "/test2.png",
        "/test2.png",
      ],
      pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
      testsQuestions: [
        {
          question: "ЭТО ОТ ВТОРОГО ВОПРОСА Первичный осмотр",
          typeQuestion: 0,
          instructions: "Выберите один ответ.",
          answers: [
            "Кольпоскопическая картина адекватная ",
            "Кольпоскопическая картина неадекватная ",
          ],
        },
        {
          question: "Граница между МПЭ и ЦЭ",
          typeQuestion: 1,
          instructions:
            "Оцените видимость границы между эпителиями. Выберите один ответ.",
          answers: [
            "Визуализируется полностью",
            "Визуализируется частично",
            "Не визуализируется",
          ],
        },
      ],
    },
    {
      id: 3,
      imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
      pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
      testsQuestions: [
        {
          question: "ТРЕТИЙ ПТАЛАГОИЯ Первичный осмотр",
          typeQuestion: 0,
          instructions: "Выберите один ответ.",
          answers: [
            "Кольпоскопическая картина адекватная ",
            "Кольпоскопическая картина неадекватная ",
          ],
        },
        {
          question: "Граница между МПЭ и ЦЭ",
          typeQuestion: 1,
          instructions:
            "Оцените видимость границы между эпителиями. Выберите один ответ.",
          answers: [
            "Визуализируется полностью",
            "Визуализируется частично",
            "Не визуализируется",
          ],
        },
      ],
    },
    {
      id: 4,
      imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
      pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
      testsQuestions: [
        {
          question: "ЭТО ОТ ЧЕТВЕРТОГО ВОПРОСА Первичный осмотр",
          typeQuestion: 0,
          instructions: "Выберите один ответ.",
          answers: [
            "Кольпоскопическая картина адекватная ",
            "Кольпоскопическая картина неадекватная ",
          ],
        },
        {
          question: "Граница между МПЭ и ЦЭ",
          typeQuestion: 1,
          instructions:
            "Оцените видимость границы между эпителиями. Выберите один ответ.",
          answers: [
            "Визуализируется полностью",
            "Визуализируется частично",
            "Не визуализируется",
          ],
        },
      ],
    },
  ];

  // ------------------------------------------------------------------
  // ЗАПРОС К СЕРВЕРУ
  // ------------------------------------------------------------------
  const testTasksQuery = useTestTasksQuery(selectedPathologyIds);

  // Для разработки выбран тестовый набор вопросов
  // const tasks = testTasksQuery.data?.items ?? [];
  const tasks = tasksTesting;

  // ------------------------------------------------------------------
  // ОБРАБОТЧИКИ
  // ------------------------------------------------------------------
  const handleTaskChange = (index: number) => {
    // Проверяем границы, защищаемся от undefined
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };

  const handleFinishAttempt = async () => {
    // if (!selectedPathologyIds) return;

    // try {
    //   await submitAnswersMutation.mutateAsync({
    //     testIds: selectedPathologyIds,
    //     answers: selectedAnswers,
    //   });

    //   console.log("✅ Ответы успешно отправлены!");
    //   router.push(ROUTES.HOME);
    // } catch (error) {
    //   console.error("❌ Ошибка при отправке ответов:", error);
    // }
    console.log(selectedAnswers);
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
    currentTaskIndex,
    handleTaskChange,
    handleFinishAttempt,
    getSelectedFor,
    toggleAnswer,
    completionByTask, // [{ taskId, answeredCount, totalQuestions, isComplete }]
    isAllTasksComplete,
  };
}
