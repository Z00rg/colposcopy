import { useTestTasksQuery } from "@/entities/test/queries";
import { useTryAnswersQuery } from "@/entities/try-list";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export function useViewingTry() {
  // ------------------------------------------------------------------
  // СОСТОЯНИЕ
  // ------------------------------------------------------------------
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const router = useRouter();

  // ------------------------------------------------------------------
  // ОБРАБОТКА URL-ПАРАМЕТРОВ
  // ------------------------------------------------------------------
  const { tryId } = router.query;
  console.log(`Открыта страница попытки с id ${tryId}`);

  // ------------------------------------------------------------------
  // ДАННЫЕ ЗАДАНИЙ (ЗАГЛУШКА)
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
      imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
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
  const testTasksQuery = useTestTasksQuery(tryId as string);

  // Для разработки выбран тестовый набор вопросов
  // const tasks = testTasksQuery.data?.items ?? [];
  const tasks = tasksTesting;

  const tryAnswersQuery = useTryAnswersQuery(tryId as string);
  const tryAnswersData = tryAnswersQuery.data?.tryAnswers;

  //Заполнено заглушкой заполненных ответов
  const selectedAnswers: Record<
  number, // taskId
  Record<
    number, // questionIndex
    {
      selected: number[];
      isCorrect: boolean;
    }
  >
> = useMemo(
  () => ({
    1: {
      0: { selected: [0], isCorrect: true },
      1: { selected: [0, 1], isCorrect: false },
    },
    2: {
      0: { selected: [1], isCorrect: false },
      1: { selected: [1, 2], isCorrect: true },
    },
    3: {
      0: { selected: [1], isCorrect: false },
      1: { selected: [1, 2], isCorrect: false },
    },
    4: {
      0: { selected: [0], isCorrect: true },
      1: { selected: [0, 1], isCorrect: true },
    },
  }),
  []
);
  // Реализация через данные с сервера
  // const selectedAnswers: Record<number, Record<number, number[]>> = useMemo(
  //   () => ({
  //     tryAnswersData
  //   }),
  //   [tryAnswersData]
  // );

  // ------------------------------------------------------------------
  // ОБРАБОТЧИКИ
  // ------------------------------------------------------------------
  const handleTaskChange = (index: number) => {
    // Проверяем границы, защищаемся от undefined
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };

  const getSelectedFor = (taskId: number, questionIndex: number): number[] =>
    selectedAnswers[taskId]?.[questionIndex]?.selected ?? [];

  // ------------------------------------------------------------------
  // СТАТУС ЗАПОЛНЕНИЯ
  // ------------------------------------------------------------------

  const completionByTask = useMemo(() => {
    return tasks.map((task) => {
      const answersForTask = selectedAnswers[task.id] || {};
      const totalQuestions = task.testsQuestions.length;

      // количество отвеченных вопросов (где есть хотя бы 1 выбранный ответ)
      const answeredCount = Object.values(answersForTask).filter(
        (arr) => arr.selected.length > 0
      ).length;

      return {
        taskId: task.id,
        totalQuestions,
        answeredCount,
        isComplete: answeredCount === totalQuestions,
      };
    });
  }, [selectedAnswers, tasks]);

  // ------------------------------------------------------------------
  // СТАТУС КОРРЕКТНОСТИ ОТВЕТОВ
  // ------------------------------------------------------------------
  const getIsCorrect = (taskId: number, questionIndex: number): boolean | null =>
  selectedAnswers[taskId]?.[questionIndex]?.isCorrect ?? null;

  return {
    tasks,
    setCurrentTaskIndex,
    isLoading: testTasksQuery.isPending,
    isError: testTasksQuery.isError,
    currentTaskIndex,
    handleTaskChange,
    getSelectedFor,
    completionByTask, // [{ taskId, answeredCount, totalQuestions, isComplete }]
    getIsCorrect,
  };
}
