"use client";

import {UiList} from "@/shared/ui/ui-list";
import {useAtlasList} from "../model/use-atlas-list";
import {UiListButtonAtlas} from "@/shared/ui/ui-list-button-atlas";
import clsx from "clsx";
import {useTutorialsList} from "../model/use-tutorials-list";
import {UiError} from "@/shared/ui/ui-error";

export function AtlasList({className}: { className?: string }) {
    const {items, isLoading, isError, handleClick} = useAtlasList();
    const {tutorials, isLoadingTutorials, isErrorTutorials, tutorialFiles, isLoadingTutorialFiles, isErrorTutorialFiles, handleTutorialClick } = useTutorialsList();

    const isEmptyText = !isLoading && !isError && items.length === 0;
    const isEmptyTutorials = !isLoadingTutorials && !isLoadingTutorialFiles &&
        !isErrorTutorials && !isErrorTutorialFiles &&
        tutorialFiles.length === 0 && tutorials.length === 0;

    /**
     * Скачивает файл по URL
     */
    const handleFileDownload = (url: string, fileName: string) => {
        // Создаем невидимую ссылку и кликаем по ней
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName; // Задаем имя файла для скачивания
        link.target = '_blank'; // Открываем в новой вкладке (на случай если браузер не поддерживает download)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <UiList className={clsx(className, "mt-4 items-start")}>
            <div className="font-bold text-[18px]">Обучение</div>

            {/* Ошибка загрузки */}
            {(isErrorTutorials || isErrorTutorialFiles) && (
                <UiError>
                    Не удалось загрузить обучающие материалы
                </UiError>
            )}

            {/* Пустой список */}
            {isEmptyTutorials && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных материалов
                </div>
            )}


            {/* Скелетон лоадер */}
            {(isLoadingTutorials || isLoadingTutorialFiles) && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <UiListButtonAtlas
                            key={`skeleton-tutorial-${index}`}
                            className="w-full"
                            index={index + 1}
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            onClick={() => {}}
                            isLoading={true}
                        />
                    ))}
                </>
            )}

            {/* Объединенный список: сначала файлы, потом уроки */}
            {!isLoadingTutorials && !isLoadingTutorialFiles && (
                <>
                    {/* Файлы для скачивания */}
                    {tutorialFiles.map((file, index) => (
                        <div
                            key={`file-${index}`}
                            className={clsx(
                                "flex items-center text-[18px] font-medium gap-3 cursor-pointer select-none border-b border-gray-200 px-3 py-3 rounded-lg transition-all duration-200 ease-out",
                                "hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm w-full"
                            )}
                            onClick={() => handleFileDownload(file.tutorial_file, file.name)}
                        >
                            <div className="text-gray-600 font-semibold">{index + 1}.</div>

                            <div className="break-words whitespace-normal flex-1 text-gray-800">
                                {file.name}
                            </div>

                            {/* Иконка скачивания */}
                            <svg
                                className="w-5 h-5 text-gray-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </div>
                    ))}

                    {/* Уроки */}
                    {tutorials.map((item, index) => (
                        <UiListButtonAtlas
                            className="w-full"
                            key={item.id}
                            index={tutorialFiles.length + index + 1} // Продолжаем нумерацию после файлов
                            informationOfPathology={item}
                            onClick={() => handleTutorialClick(item.id)}
                        />
                    ))}
                </>
            )}

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
