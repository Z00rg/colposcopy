"use client";

import {UiList} from "@/shared/ui/ui-list";
import {useAtlasList} from "../model/use-atlas-list";
import {UiListButtonAtlas} from "@/shared/ui/ui-list-button-atlas";
import clsx from "clsx";
import {useTutorialsList} from "../model/use-tutorials-list";
import {UiError} from "@/shared/ui/ui-error";

export function AtlasList({className}: { className?: string }) {
    const {items, isLoading, isError, handleClick} = useAtlasList();
    const {tutorials, isLoadingTutorials, isErrorTutorials, handleTutorialClick, handleDownloadNomenclature  } = useTutorialsList();

    const isEmptyText = !isLoading && !isError && items.length === 0;
    const isEmptyTutorialText =
        !isLoadingTutorials && !isErrorTutorials && tutorials.length === 0;

    return (
        <UiList className={clsx(className, "mt-4 items-start")}>
            <div className="font-bold text-[18px]">Обучение</div>

            {/* Ошибка загрузки списка уроков */}
            {isErrorTutorials && (
                <UiError>
                    Не удалось загрузить список уроков
                </UiError>
            )}

            {/* Пустой список уроков */}
            {isEmptyTutorialText && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных уроков
                </div>
            )}

            {/* Скелетон лоадер для уроков */}
            {isLoadingTutorials && (
                <>
                    {[...Array(2)].map((_, index) => (
                        <UiListButtonAtlas
                            key={`skeleton-tutorial-${index}`}
                            className="w-full"
                            index={index + 1}
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            onClick={() => {
                            }}
                            isLoading={true}
                        />
                    ))}
                </>
            )}

            {/* Отображение списка уроков */}
            {!isLoadingTutorials && tutorials &&
                <>
                    <div
                        className={clsx(
                            className,
                            "flex items-center text-[18px] font-medium gap-3 cursor-pointer select-none border-b border-gray-200 px-3 py-3 rounded-lg transition-all duration-200 ease-out",
                            "hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm"
                        )}
                        onClick={() => handleDownloadNomenclature }
                    >
                        <div className="text-gray-600 font-semibold">1.</div>

                        <div className="break-words whitespace-normal flex-1 text-gray-800">
                            Кольпоскопическая номенклатура
                        </div>
                    </div>
                    {tutorials.map((item, index) => (
                    <UiListButtonAtlas
                        className="w-full"
                        key={item.id}
                        index={index + 2}
                        informationOfPathology={item}
                        onClick={() => handleTutorialClick(item.id)}
                    />
                    ))}
                </>
            }

            {/* Список патологий */}
            <div className="font-bold text-[18px]">Атлас</div>

            {/* Ошибка загрузки списка патологий */}
            {isError && (
                <UiError>
                    Не удалось загрузить список патологий
                </UiError>
            )}

            {/* Пустой список патологий*/}
            {isEmptyText && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных патологий
                </div>
            )}

            {/* Скелетон лоадер для патологий */}
            {isLoading && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <UiListButtonAtlas
                            key={`skeleton-atlas-${index}`}
                            className="w-full"
                            index={index + 1}
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            onClick={() => {
                            }}
                            isLoading={true}
                        />
                    ))}
                </>
            )}

            {/* Отображение списка патологий */}
            {!isLoading && items &&
                items.map((item, index) => (
                    <UiListButtonAtlas
                        className="w-full"
                        key={item.id}
                        index={index + 1}
                        informationOfPathology={item}
                        onClick={() => handleClick(item.id)}
                    />
                ))}
        </UiList>
    );
}
