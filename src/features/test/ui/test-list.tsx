"use client";

import {UiList} from "@/shared/ui/ui-list";
import {UiListButtonTest} from "@/shared/ui/ui-list-button-test";
import {Instruction} from "./instruction";
import clsx from "clsx";
import {useTestList} from "../model/use-test-list";
import {UiError} from "@/shared/ui/ui-error";

export function TestList() {
    const {
        items,
        isLoading,
        isError,
        selectedIds,
        handleTogglePathology,
        handleStartAttempt,
    } = useTestList();

    const isEmptyText = !isLoading && !isError && items.length === 0;

    return (
        <UiList className="mt-4 items-start relative">
            {/* Прокручиваемый контент */}
            <div className="overflow-y-auto pb-20 w-full">
                <div className="font-bold text-[18px]">
                    Выберите параметры
                </div>
                {isError && (
                    <UiError>
                        Не удалось загрузить список тестов
                    </UiError>
                )}
                {isEmptyText && (
                    <div className="flex text-[18px] pb-4 font-medium">
                        Нет доступных тем для тестирования
                    </div>
                )}
                {isLoading && (
                    <>
                        {[...Array(4)].map((_, index) => (
                            <UiListButtonTest
                                key={`skeleton-${index}`}
                                className="w-full"
                                index={index + 1}
                                informationOfPathology={{
                                    id: 0,
                                    name: "",
                                }}
                                isChecked={false}
                                onToggle={() => {
                                }}
                                isLoading={true}
                            />
                        ))}
                    </>
                )}
                {!isLoading && items &&
                    items.map((item, index) => (
                        <UiListButtonTest
                            className="w-full"
                            key={item.id}
                            index={index + 1}
                            informationOfPathology={item}
                            isChecked={selectedIds.includes(item.id)}
                            onToggle={handleTogglePathology}
                        />
                    ))}
                <div className="flex w-full border border-b-1 border-[#BDBDBD]"></div>
                <Instruction/>
            </div>
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 px-5 py-3">
                <div className="flex justify-end">
                    <button
                        onClick={handleStartAttempt}
                        disabled={selectedIds.length === 0}
                        className={clsx(
                            "ml-auto text-[20px] font-normal transition-colors",
                            selectedIds.length === 0
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-[#2E76AA] hover:text-[#26628A] cursor-pointer"
                        )}
                    >
                        Начать попытку
                    </button>
                </div>
            </div>
        </UiList>
    );
}
