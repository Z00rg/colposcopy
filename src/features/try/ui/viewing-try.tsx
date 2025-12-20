"use client";

import { UiCheckBox } from "@/shared/ui/ui-checkbox";
import { UiProgressBar } from "@/shared/ui/ui-progress-bar";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import clsx from "clsx";
import { useViewingTry } from "../model/use-viewing-try";
import { UiFooter } from "@/shared/ui/ui-footer";
import { IAnswers, ITestQuestion } from "@/shared/api/tryApi";

export function ViewingTry() {
  const {
    tasks,
    setCurrentTaskIndex,
    isLoading,
    isError,
    currentTaskIndex,
    handleTaskChange,
  } = useViewingTry();

  return (
    <div className="flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5">
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
      {isLoading && (
          <>
            {/* Скелетон прогресс-бара */}
            <div className="w-1/2 mx-auto h-12 bg-gray-300 rounded-2xl animate-pulse"></div>

            {/* Скелетон изображения */}
            <UiScrollImg img={[]} height="h-[28svh]" isLoading={true} />

            {/* Скелетон текстовой области с вопросами */}
            <div className="mt-5 w-full h-[34svh] bg-[#F1F1F1] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] pt-3 px-[17px] flex flex-col gap-3 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mt-3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </>
      )}
      {tasks.length > 0 && (
        <>
          {/* Компонент Прогресс-бара */}
          <UiProgressBar
            numOfCurrentTask={currentTaskIndex}
            tasks={tasks}
            changeCurrentTaskAction={setCurrentTaskIndex}
          />

          {/* Компонент Прокручиваемого Изображения (для текущего задания) */}
          <UiScrollImg
            key={currentTaskIndex}
            img={tasks[currentTaskIndex].imageSrcs}
            height="h-[30svh]"
          />

          {/* Компонент Блока для текста и вопросов */}
          <UiTextArea
            contentKey={currentTaskIndex}
            className="mt-5 gap-3 w-full text-[13px] items-start"
            height="h-[39svh]"
          >
            {/* Итерация по вопросам текущего задания */}
            {tasks[currentTaskIndex].testsQuestions.map(
              (item: ITestQuestion, questionIndex: number) => {
                const taskId = tasks[currentTaskIndex].id;
                const isCorrect = item.isCorrect;

                return (
                  <div
                    className="flex flex-col gap-2 w-full text-[13px] pb-5 border-b-2 border-[#BDBDBD]"
                    key={`${taskId}-${questionIndex}`}
                  >
                    {/* Заголовок вопроса */}
                    <div className="flex w-full">
                      <span>
                        <span
                          className={clsx(
                            "font-bold",
                            { "text-green-600": isCorrect },
                            { "text-red-600": !isCorrect }
                          )}
                        >
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
                        const isChecked = answer.isSelected;
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
                                readOnly
                                id={`chk-${taskId}-${questionIndex}-${answerIndex}`}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}

                    {isCorrect !== null && (
                      <div className="text-sm font-semibold">
                        {isCorrect ? (
                          <span className="text-green-600">
                            ✔ Ответ верный
                          </span>
                        ) : (
                          <span className="text-red-600">✘ Ответ неверный</span>
                        )}
                      </div>
                    )}
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
