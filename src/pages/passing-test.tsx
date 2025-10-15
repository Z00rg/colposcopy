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

  // Обработка состояния загрузки/ожидания
  if (!router.isReady || selectedPathologyIds.length === 0) {
    return (
      <div className="p-5 flex justify-center items-center h-screen">
        <UiSpinner />
      </div>
    );
  }

  const handleFinishAttempt = () => {
    router.push(ROUTES.HOME);
    return null;
  };
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
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
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
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
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
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
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
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
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
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
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
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 7,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 8,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 9,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 10,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 11,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 12,
        imageSrcs: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
        pathologyText: `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
        testsQuestions: [
          {
            question: "Первичный осмотр",
            instructions: "Выберите один ответ.",
            answers: [
              "Кольпоскопическая картина адекватная ",
              "Кольпоскопическая картина неадекватная ",
            ],
            correctAnswer: 1,
          },
          {
            question: "Граница между МПЭ и ЦЭ",
            instructions:
              "Оцените видимость границы между эпителиями. Выберите один ответ.",
            answers: [
              "Визуализируется полностью",
              "Визуализируется частично",
              "Не визуализируется",
            ],
            correctAnswer: 2,
          },
        ],
      },
    ],
  };

  const handleTaskChange = (index: number) => {
    setCurrentTaskIndex(index);
    console.log(index);
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
          {tasks.items[currentTaskIndex].testsQuestions.map((item, index) => (
            <div
              className="flex flex-col gap-2 w-full text-[13px] pb-5 border-b-2 border-[#BDBDBD]"
              key={index}
            >
              <div className="flex w-full">
                <span>
                  {" "}
                  <span className="font-bold">Задание №{index + 1}:</span>{" "}
                  {item.question}
                </span>
              </div>
              <div className="flex w-full">
                <span>
                  {" "}
                  <span className="font-bold">Инструкция:</span>{" "}
                  {item.instructions}
                </span>
              </div>
              {item.answers.map((answer, answerIndex) => (
                <div className="flex gap-2" key={answerIndex}>
                  <div className="flex justify-center">{answerIndex + 1}.</div>
                  <div className="flex justify-center break-words whitespace-normal">
                    {answer}
                  </div>
                  <div className="ml-auto w-6 h-6 flex justify-center items-center">
                    <UiCheckBox />
                  </div>
                </div>
              ))}
            </div>
          ))}
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
              { hidden: currentTaskIndex != tasks.items.length - 1 },
              "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
            )}
            onClick={() => handleFinishAttempt}
            disabled={currentTaskIndex != tasks.items.length - 1}
          >
            Закончить попытку
          </button>
        </div>
        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}
