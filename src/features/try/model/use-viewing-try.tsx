import { useTryQuery } from "@/entities/try-list";
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

  // ------------------------------------------------------------------
  // ДАННЫЕ ЗАДАНИЙ (ЗАГЛУШКА)
  // ------------------------------------------------------------------

  // const tasksTesting = [
  //     {
  //       id: 132,
  //       imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //       testsQuestions: [
  //         {
  //           id: 123,
  //           question: "ПЕЕРВЫЙ ПТАЛАГОИЯ Первичный осмотр",
  //           typeQuestion: 0 as const,
  //           isCorrect: true,
  //           instructions: "Выберите один ответ.",
  //           answers: [
  //             { id: 123, text: "Кольпоскопическая картина адекватная ", isSelected: true, },
  //             { id: 124, text: "Кольпоскопическая картина неадекватная ", isSelected: false, },
  //           ],
  //         },
  //         {
  //           id: 124,
  //           question: "Граница между МПЭ и ЦЭ",
  //           typeQuestion: 1 as const,
  //           isCorrect: true,
  //           instructions:
  //             "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //           answers: [
  //             { id: 125, text: "Визуализируется полностью", isSelected: true, },
  //             { id: 126, text: "Визуализируется частично", isSelected: true, },
  //             { id: 127, text: "Не визуализируется", isSelected: true, },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       id: 212,
  //       imageSrcs: [
  //         "/test2.png",
  //         "/test2.png",
  //         "/test2.png",
  //         "/test2.png",
  //         "/test2.png",
  //       ],
  //       testsQuestions: [
  //         {
  //           id: 125,
  //           question: "ЭТО ОТ ВТОРОГО ВОПРОСА Первичный осмотр",
  //           typeQuestion: 0 as const,
  //           isCorrect: true,
  //           instructions: "Выберите один ответ.",
  //           answers: [
  //             { id: 123, text: "Кольпоскопическая картина адекватная ", isSelected: true, },
  //             { id: 124, text: "Кольпоскопическая картина неадекватная ", isSelected: false, },
  //           ],
  //         },
  //         {
  //           id: 126,
  //           question: "Граница между МПЭ и ЦЭ",
  //           typeQuestion: 1 as const,
  //           isCorrect: true,
  //           instructions:
  //             "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //           answers: [
  //             { id: 125, text: "Визуализируется полностью", isSelected: true, },
  //             { id: 126, text: "Визуализируется частично", isSelected: false, },
  //             { id: 127, text: "Не визуализируется", isSelected: true, },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       id: 311,
  //       imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //       testsQuestions: [
  //         {
  //           id: 127,
  //           question: "ТРЕТИЙ ПТАЛАГОИЯ Первичный осмотр",
  //           typeQuestion: 0 as const,
  //           isCorrect: true,
  //           instructions: "Выберите один ответ.",
  //           answers: [
  //             { id: 123, text: "Кольпоскопическая картина адекватная ", isSelected: true, },
  //             { id: 124, text: "Кольпоскопическая картина неадекватная ", isSelected: false, },
  //           ],
  //         },
  //         {
  //           id: 128,
  //           question: "Граница между МПЭ и ЦЭ",
  //           typeQuestion: 1 as const,
  //           isCorrect: true,
  //           instructions:
  //             "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //           answers: [
  //             { id: 125, text: "Визуализируется полностью", isSelected: true, },
  //             { id: 126, text: "Визуализируется частично", isSelected: false, },
  //             { id: 127, text: "Не визуализируется", isSelected: true, },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       id: 144,
  //       imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
  //       testsQuestions: [
  //         {
  //           id: 129,
  //           question: "ЭТО ОТ ЧЕТВЕРТОГО ВОПРОСА Первичный осмотр",
  //           typeQuestion: 0 as const,
  //           isCorrect: false,
  //           instructions: "Выберите один ответ.",
  //           answers: [
  //             { id: 123, text: "Кольпоскопическая картина адекватная ", isSelected: true, },
  //             { id: 124, text: "Кольпоскопическая картина неадекватная ", isSelected: false, },
  //           ],
  //         },
  //         {
  //           id: 130,
  //           question: "Граница между МПЭ и ЦЭ",
  //           typeQuestion: 1 as const,
  //           isCorrect: true,
  //           instructions:
  //             "Оцените видимость границы между эпителиями. Выберите один ответ.",
  //           answers: [
  //             { id: 125, text: "Визуализируется полностью", isSelected: false, },
  //             { id: 126, text: "Визуализируется частично", isSelected: true, },
  //             { id: 127, text: "Не визуализируется", isSelected: true, },
  //           ],
  //         },
  //       ],
  //     },
  //   ];

  // ------------------------------------------------------------------
  // ЗАПРОС К СЕРВЕРУ
  // ------------------------------------------------------------------

  const tryQuery = useTryQuery(tryId as string);
  const tasks = useMemo(
    () => tryQuery.data?.items ?? [],
    [tryQuery]
  );
  // const tasks = tasksTesting;

  // ------------------------------------------------------------------
  // ОБРАБОТЧИКИ
  // ------------------------------------------------------------------
  const handleTaskChange = (index: number) => {
    // Проверяем границы, защищаемся от undefined
    if (index < 0 || index >= tasks.length) return;
    setCurrentTaskIndex(index);
  };


  return {
    tasks,
    setCurrentTaskIndex,
    isLoading: tryQuery.isPending,
    isError: tryQuery.isError,
    currentTaskIndex,
    handleTaskChange,
  };
}
