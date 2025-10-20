import { UiFooter } from "@/shared/ui/ui-footer";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { useEffect, useMemo, useState } from "react";
import { UiProgressBar } from "@/shared/ui/ui-progress-bar";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/constants/routes";
import { UiCheckBox } from "@/shared/ui/ui-checkbox";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function PassingTestPage() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  // Cтруктура: { [taskId]: { [questionIndex]: number[] } }
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, Record<number, number[]>>
  >({});

  const router = useRouter();

  // Тут реализация получения testIds из query параметра

  // Получаем параметр testIds из URL
  const { testIds } = router.query;

  // useMemo для парсинга ID.
  // Зависим только от testIds, чтобы пересчитывать только при изменении URL.
  const selectedPathologyIds: number[] = useMemo(() => {
    let ids: number[] = [];
    if (typeof testIds === "string" && testIds.length > 0) {
      ids = testIds
        .split(",")
        .map((id) => Number(id))
        .filter((id) => !isNaN(id) && id > 0);
    }
    return ids;
  }, [testIds]);

  // Логика редиректа при отсутствии выбранных патологий
  useEffect(() => {
    if (router.isReady && selectedPathologyIds.length === 0) {
      router.push(ROUTES.TEST);
    }
  }, [router.isReady, selectedPathologyIds.length, router.push, router]);
  // ------------------------------------------------------------------

  // tasks данные заглушки
  const tasks = {
    items: [
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
            question: "ЭТО ОТ ТРЕТЬЕГО ВОПРОСА Первичный осмотр",
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
            question: " ЧЕТВЕРТЫЙ ПАТАЛОГИЯ Первичный осмотр",
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
        id: 5,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "ЭТО ОТ ПЯТЫЙ Первичный осмотр",
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
        id: 6,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "ШЕСТОЙ ПАТАЛОГИЯ Первичный осмотр",
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
    ],
  };

  // Фильтрация заданий на основе выбранных патологий
  const filteredTasks = useMemo(() => {
    return {
      ...tasks,
      items: tasks.items.filter((task) =>
        selectedPathologyIds.includes(task.id)
      ),
    };
  }, [tasks, selectedPathologyIds]);

  // Если фильтр вернул пустой список — редиректим пользователя
  useEffect(() => {
    if (router.isReady && filteredTasks.items.length === 0) {
      router.push(ROUTES.TEST);
    }
  }, [router.isReady, filteredTasks.items.length, router]);

  // Когда переключаешь паталогии без сброса ответов
  const handleTaskChange = (index: number) => {
    if (index < 0 || index >= tasks.items.length) return;
    setCurrentTaskIndex(index);
  };

  // Завершение попытки
  const handleFinishAttempt = () => {
    console.log("Завершение попытки с ответами:", selectedAnswers);
    // router.push(ROUTES.HOME);
  };

  // Получние массива выбранных индексов для конкретного задания+вопроса
  const getSelectedFor = (taskId: number, questionIndex: number): number[] =>
    selectedAnswers[taskId]?.[questionIndex] ?? [];

  // Обработчик изменения чекбокса для конкретного вопроса с учетом его типа
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
        // одиночный выбор: установить только этот индекс
        taskAnswers[questionIndex] = [answerIndex];
      } else {
        // множественный выбор: toggle
        if (current.includes(answerIndex)) {
          taskAnswers[questionIndex] = current.filter((i) => i !== answerIndex);
        } else {
          taskAnswers[questionIndex] = [...current, answerIndex];
        }
      }

      return { ...prev, [taskId]: taskAnswers };
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <div className="flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5">
        {/* Компонент Прогресс-бара */}
        <UiProgressBar
          numOfCurrentTask={currentTaskIndex} // Текущий индекс задания
          tasks={filteredTasks} // Общее количество отфильтрованных заданий
        />

        {/* Компонент Прокручиваемого Изображения (для текущего задания) */}
        <UiScrollImg img={filteredTasks.items[currentTaskIndex].imageSrcs} />

        {/* Компонент Блока для текста и вопросов */}
        <UiTextArea className="mt-5 gap-3 w-full text-[13px] items-start">
          <div className="font-bold text-[15px]">
            Выполните следующие задания:
          </div>

          {/* Итерация по вопросам текущего задания */}
          {filteredTasks.items[currentTaskIndex].testsQuestions.map(
            (item: any, questionIndex: number) => {
              const taskId = filteredTasks.items[currentTaskIndex].id;
              // Получение выбранных ответов для текущего вопроса
              const selectedForThis = getSelectedFor(taskId, questionIndex);

              return (
                <div
                  className="flex flex-col gap-2 w-full text-[13px] pb-5 border-b-2 border-[#BDBDBD]"
                  key={`${taskId}-${questionIndex}`}
                >
                  {/* Заголовок вопроса */}
                  <div className="flex w-full">
                    <span>
                      <span className="font-bold">
                        Задание №{questionIndex + 1}:
                      </span>{" "}
                      {item.question}
                    </span>
                  </div>

                  {/* Инструкция к вопросу */}
                  <div className="flex w-full">
                    <span>
                      <span className="font-bold">Инструкция:</span>{" "}
                      {item.instructions}
                    </span>
                  </div>

                  {/* Итерация по вариантам ответов текущего вопроса */}
                  {item.answers.map((answer: string, answerIndex: number) => {
                    const isChecked = selectedForThis.includes(answerIndex);
                    return (
                      <div
                        className="flex gap-2"
                        key={`${taskId}-${questionIndex}-${answerIndex}`}
                      >
                        {/* Номер варианта ответа */}
                        <div className="flex justify-center">
                          {answerIndex + 1}.
                        </div>
                        {/* Текст варианта ответа */}
                        <div className="flex justify-center break-words whitespace-normal">
                          {answer}
                        </div>
                        {/* Чекбокс/Радиобаттон для выбора ответа */}
                        <div className="ml-auto w-6 h-6 flex justify-center items-center">
                          <UiCheckBox // Используется UiCheckBox, но логика в `toggleAnswer` имитирует и одиночный выбор
                            checked={isChecked}
                            onChange={() =>
                              toggleAnswer(
                                taskId,
                                questionIndex,
                                answerIndex,
                                item.typeQuestion
                              )
                            }
                            id={`chk-${taskId}-${questionIndex}-${answerIndex}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
        </UiTextArea>

        {/* Навигационные кнопки (Назад / Далее / Закончить) */}
        <div className="flex w-full">
          {/* Кнопка "Назад" */}
          <button
            className={clsx(
              // Скрывается, если это первое задание (индекс 0)
              { hidden: currentTaskIndex === 0 },
              "mr-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={() => handleTaskChange(currentTaskIndex - 1)}
            disabled={currentTaskIndex === 0}
          >
            Назад
          </button>

          {/* Кнопка "Далее" */}
          <button
            className={clsx(
              // Скрывается, если это последнее задание
              { hidden: currentTaskIndex === filteredTasks.items.length - 1 },
              "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={() => handleTaskChange(currentTaskIndex + 1)}
            disabled={currentTaskIndex === filteredTasks.items.length - 1}
          >
            Далее
          </button>

          {/* Кнопка "Закончить попытку" */}
          <button
            className={clsx(
              // Отображается только на последнем задании
              { hidden: currentTaskIndex !== filteredTasks.items.length - 1 },
              "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={handleFinishAttempt}
            disabled={currentTaskIndex !== filteredTasks.items.length - 1}
          >
            Закончить попытку
          </button>
        </div>

        {/* Компонент Футера с активным статусом "test" */}
        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}



