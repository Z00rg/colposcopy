import { UiCheckBox } from "@/shared/ui/ui-checkbox";
import { UiProgressBar } from "@/shared/ui/ui-progress-bar";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import clsx from "clsx";
import { useTestTasks } from "../model/use-test-tasks";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { useEffect, useRef } from "react";
import { ITestQuestion, IAnswers } from "@/shared/api/testApi";
import { UiErrorMessage } from "@/shared/ui/ui-errror-msg";

export function TestTasks() {
  const {
    tasks,
    setCurrentTaskIndex,
    isLoading,
    isError,
    isLoadingSubmit,
    isErrorSubmit,
    currentTaskIndex,
    handleTaskChange,
    handleFinishAttempt,
    getSelectedFor,
    toggleAnswer,
    completionByTask,
    isAllTasksComplete,
  } = useTestTasks();

  const textAreaRef = useRef<HTMLDivElement>(null);

  // Скролл при смене задания
  useEffect(() => {
    textAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTaskIndex]);

  return (
    <div className="flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5">
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
          <UiScrollImg
            key={currentTaskIndex}
            img={tasks[currentTaskIndex].imageSrcs}
            height="h-[28svh]"
          />

          {/* Компонент Блока для текста и вопросов */}
          <UiTextArea
            textAreaRef={textAreaRef}
            className="mt-5 gap-3 w-full text-[13px] items-start"
            height="h-[34svh]"
          >
            <div className="font-bold text-[15px]">
              Выполните следующие задания:
            </div>

            {/* Итерация по вопросам текущего задания */}
            {tasks[currentTaskIndex].testsQuestions.map(
              (item: ITestQuestion, questionIndex: number) => {
                const taskId = tasks[currentTaskIndex].id;
                const questionId =
                  tasks[currentTaskIndex].testsQuestions[questionIndex].id;
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
                    {item.answers.map(
                      (answer: IAnswers, answerIndex: number) => {
                        const answerId = answer.id;
                        const isChecked = selectedForThis.includes(answerIndex);
                        return (
                          <div
                            key={`${taskId}-${questionIndex}-${answerIndex}`}
                            className={clsx(
                              "flex items-center gap-3 cursor-pointer select-none border-b border-[#E0E0E0] px-3 py-3 rounded-xl transition-all duration-200 ease-out",
                              {
                                "hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01]":
                                  true,
                                "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 shadow-md":
                                  isChecked,
                              }
                            )}
                            onClick={() =>
                              toggleAnswer(
                                taskId,
                                questionIndex,
                                answerIndex,
                                item.typeQuestion
                              )
                            }
                          >
                            {/* Номер варианта ответа */}
                            <div className="text-gray-700 font-semibold">
                              {answerIndex + 1}.
                            </div>

                            {/* Текст варианта ответа */}
                            <div className="break-words whitespace-normal flex-1 text-gray-800 text-left">
                              {answer.text}
                            </div>

                            {/* Чекбокс/Радиобаттон */}
                            <div
                              className="ml-auto w-6 h-6 flex justify-center items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
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
                                id={`chk-${taskId}-${questionId}-${answerId}`}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
          </UiTextArea>

          {/* Навигационные кнопки */}
          <div className="flex w-full relative">
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
                "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointe"
              )}
              onClick={() => handleTaskChange(currentTaskIndex + 1)}
              disabled={currentTaskIndex === tasks.length - 1}
            >
              Далее
            </button>

            <UiErrorMessage condition={isErrorSubmit}>
              Не удалось отправить ответы. Попробуйте еще раз.
            </UiErrorMessage>

            {isLoadingSubmit && (
              <div className="ml-auto flex items-center">
                <UiSpinner />
              </div>
            )}

            {!isLoadingSubmit && (
              <button
                className={clsx(
                  { hidden: currentTaskIndex !== tasks.length - 1 },
                  "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer",
                  {
                    "text-gray-400 hover:text-gray-400 cursor-not-allowed":
                      !isAllTasksComplete,
                  }
                )}
                onClick={handleFinishAttempt}
                disabled={!isAllTasksComplete || isLoadingSubmit}
              >
                Закончить попытку
              </button>
            )}
          </div>
        </>
      )}

      <UiFooter activeStatus="test" />
    </div>
  );
}
