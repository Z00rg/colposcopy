"use client";

import clsx from "clsx";
import {motion, AnimatePresence} from "framer-motion";
import {ITestTask as TryApiITestTask} from "../api/tryApi";
import {ITestTask as AnotherApiITestTask} from "../api/testApi";

type CompatibleITestTask = TryApiITestTask | AnotherApiITestTask;

export function UiProgressBar({
                                  className,
                                  tasks,
                                  numOfCurrentTask,
                                  completionByTask,
                                  changeCurrentTaskAction,
                              }: {
    className?: string;
    tasks: CompatibleITestTask[];
    numOfCurrentTask: number;
    completionByTask?: { taskId: number; isComplete: boolean }[];
    changeCurrentTaskAction?: (index: number) => void;
}) {
    return (
        <div
            className="relative mx-auto overflow-x-auto overflow-y-hidden custom-scrollbar max-w-85 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className={clsx(className, "relative flex h-12 px-3 w-max py-2 gap-1")}>
                {tasks.map((task: CompatibleITestTask, index: number) => {
                    const completion = completionByTask?.find(
                        (t) => t.taskId === task.id
                    );
                    const isComplete = completion?.isComplete ?? false;
                    const isCurrent = index === numOfCurrentTask;

                    return (
                        <div
                            key={task.id}
                            className="relative flex justify-center items-center"
                        >
                            {/* Активный кружок (анимируется поверх кнопки) */}
                            <AnimatePresence>
                                {isCurrent && (
                                    <motion.div
                                        layoutId="activeTask"
                                        className="absolute w-10 h-10 bg-[#2E76AA] rounded-full shadow-md z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Кнопка номера шага */}
                            <button
                                onClick={() => changeCurrentTaskAction?.(index)}
                                className={clsx(
                                    "relative flex w-10 h-10 shrink-0 justify-center items-center cursor-pointer font-semibold text-sm transition-all duration-200 rounded-full",
                                    {
                                        "text-white z-20": isCurrent,
                                        "bg-blue-50 text-[#2E76AA] ring-2 ring-[#2E76AA]":
                                            isComplete && !isCurrent,
                                        "text-gray-500 hover:text-[#2E76AA] hover:bg-blue-50/50":
                                            !isComplete && !isCurrent,
                                    }
                                )}
                            >
                                {isComplete && !isCurrent ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}