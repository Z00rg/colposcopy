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
  // структура: { [taskId]: { [questionIndex]: number[] } }
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, Record<number, number[]>>
  >({});

  const router = useRouter();

  // --- tasks (тот же объект, который ты дал) ---
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
            question: "Первичный осмотр",
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
            question: "Первичный осмотр",
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

  // Когда переключаешь тему — не очищаем глобально selectedAnswers,
  // чтобы ответы сохранились при возвращении.
  const handleTaskChange = (index: number) => {
    if (index < 0 || index >= tasks.items.length) return;
    setCurrentTaskIndex(index);
  };

  const handleFinishAttempt = () => {
    router.push(ROUTES.HOME);
  };

  // Хелпер: получить массив выбранных индексов для конкретного задания+вопроса
  const getSelectedFor = (taskId: number, questionIndex: number): number[] =>
    selectedAnswers[taskId]?.[questionIndex] ?? [];

  // Обработчик изменения чекбокса для конкретного вопроса
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
        <UiProgressBar numOfCurrentTask={currentTaskIndex} tasks={tasks} />
        <UiScrollImg img={tasks.items[currentTaskIndex].imageSrcs} />
        <UiTextArea className="mt-5 gap-3 w-full text-[13px] items-start">
          <div className="font-bold text-[15px]">
            Выполните следующие задания:
          </div>

          {tasks.items[currentTaskIndex].testsQuestions.map(
            (item: any, questionIndex: number) => {
              const taskId = tasks.items[currentTaskIndex].id;
              const selectedForThis = getSelectedFor(taskId, questionIndex);

              return (
                <div
                  className="flex flex-col gap-2 w-full text-[13px] pb-5 border-b-2 border-[#BDBDBD]"
                  key={`${taskId}-${questionIndex}`}
                >
                  <div className="flex w-full">
                    <span>
                      <span className="font-bold">
                        Задание №{questionIndex + 1}:
                      </span>{" "}
                      {item.question}
                    </span>
                  </div>
                  <div className="flex w-full">
                    <span>
                      <span className="font-bold">Инструкция:</span>{" "}
                      {item.instructions}
                    </span>
                  </div>

                  {item.answers.map((answer: string, answerIndex: number) => {
                    const isChecked = selectedForThis.includes(answerIndex);
                    return (
                      <div
                        className="flex gap-2"
                        key={`${taskId}-${questionIndex}-${answerIndex}`}
                      >
                        <div className="flex justify-center">
                          {answerIndex + 1}.
                        </div>
                        <div className="flex justify-center break-words whitespace-normal">
                          {answer}
                        </div>
                        <div className="ml-auto w-6 h-6 flex justify-center items-center">
                          <UiCheckBox
                            checked={isChecked}
                            onChange={() =>
                              toggleAnswer(
                                taskId,
                                questionIndex,
                                answerIndex,
                                item.typeQuestion
                              )
                            }
                            // передаём уникальный id, если потребуется
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

        <div className="flex w-full">
          <button
            className={clsx(
              { hidden: currentTaskIndex === 0 },
              "mr-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={() => handleTaskChange(currentTaskIndex - 1)}
            disabled={currentTaskIndex === 0}
          >
            Назад
          </button>

          <button
            className={clsx(
              { hidden: currentTaskIndex === tasks.items.length - 1 },
              "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={() => handleTaskChange(currentTaskIndex + 1)}
            disabled={currentTaskIndex === tasks.items.length - 1}
          >
            Далее
          </button>

          <button
            className={clsx(
              { hidden: currentTaskIndex !== tasks.items.length - 1 },
              "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={handleFinishAttempt}
            disabled={currentTaskIndex !== tasks.items.length - 1}
          >
            Закончить попытку
          </button>
        </div>

        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}



