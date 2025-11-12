import { UiCheckBox } from "@/shared/ui/ui-checkbox";
import { UiProgressBar } from "@/shared/ui/ui-progress-bar";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import clsx from "clsx";
import { useViewingTry } from "../model/use-viewing-try";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { useEffect, useRef } from "react";

export function ViewingTry() {
  const {
    tasks,
    setCurrentTaskIndex,
    isLoading,
    isError,
    currentTaskIndex,
    handleTaskChange,
    getSelectedFor,
    completionByTask,
  } = useViewingTry();

  const textAreaRef = useRef<HTMLDivElement>(null);

  // Скролл при смене задания
  useEffect(() => {
    textAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTaskIndex]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5">
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full">
          <UiSpinner />
        </div>
      )}
      {isError && (
        <div className="font-bold text-red-500">
          Ошибка загрузки заданий. Пожалуйста, попробуйте позже.
        </div>
      )}
      {!isLoading && !isError && tasks.length === 0 && (
        <div className="font-bold text-gray-700">
          Нет доступных заданий для выбранных патологий.
        </div>
      )}
      {tasks.length > 0 && (
        <>
          {/* Компонент Прогресс-бара */}
          <UiProgressBar
            numOfCurrentTask={currentTaskIndex}
            tasks={tasks}
            completionByTask={completionByTask}
            changeCurrentTask={setCurrentTaskIndex}
          />

          {/* Компонент Прокручиваемого Изображения (для текущего задания) */}
          <UiScrollImg isAtlas={false} img={tasks[currentTaskIndex].imageSrcs} />

          {/* Компонент Блока для текста и вопросов */}
          <UiTextArea
            textAreaRef={textAreaRef}
            className="mt-5 gap-3 w-full text-[13px] items-start"
          >

            {/* Итерация по вопросам текущего задания */}
            {tasks[currentTaskIndex].testsQuestions.map(
              (item: any, questionIndex: number) => {
                const taskId = tasks[currentTaskIndex].id;
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
                          key={`${taskId}-${questionIndex}-${answerIndex}`}
                          className={clsx(
                            "flex items-center gap-3 select-none border-b border-[#E0E0E0] px-3 py-3 rounded-xl transition-all duration-200 ease-out",
                            {
                              "hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01]":
                                true,
                              "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 shadow-md":
                                isChecked,
                            }
                          )}
                        >
                          {/* Номер варианта ответа */}
                          <div className="text-gray-700 font-semibold">
                            {answerIndex + 1}.
                          </div>

                          {/* Текст варианта ответа */}
                          <div className="break-words whitespace-normal flex-1 text-gray-800">
                            {answer}
                          </div>

                          {/* Чекбокс/Радиобаттон */}
                          <div
                            className="ml-auto w-6 h-6 flex justify-center items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <UiCheckBox
                              checked={isChecked}
                              readOnly
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

          {/* Навигационные кнопки */}
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
                { hidden: currentTaskIndex === tasks.length - 1 },
                "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
              )}
              onClick={() => handleTaskChange(currentTaskIndex + 1)}
              disabled={currentTaskIndex === tasks.length - 1}
            >
              Далее
            </button>
          </div>
        </>
      )}

      <UiFooter activeStatus="main" />
    </div>
  );
}
