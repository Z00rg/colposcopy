"use client";

import {UiTextArea} from "@/shared/ui/ui-textarea";
import {UiLink} from "@/shared/ui/ui-link";
import {UiFooter} from "@/shared/ui/ui-footer";
import clsx from "clsx";
import {useTutorial} from "../model/use-tutorial";
import {UiVideoPlayer} from "@/shared/ui/ui-video-player";
import {UiError} from "@/shared/ui/ui-error";
import {UiModal} from "@/shared/ui/UiModal";
import {Button} from "@/shared/ui/Button";
import {UpdateTutorialForm} from "@/features/admin";

export interface TutorialProps {
    className?: string;
    isAdmin?: boolean;
}

export function Tutorial({className, isAdmin}: TutorialProps) {
    const {tutorialDetails, isLoading, isError, handleFileDownload, getFileNameFromUrl, router} = useTutorial();

    return (
        <div
            className={clsx(
                className,
                "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
            )}
        >
            {/* Ошибка отображения туториала */}
            {isError && (
                <UiError>
                    Не удалось загрузить детали урока
                </UiError>
            )}

            {/* Скелетон лоадер */}
            {isLoading && (
                <>
                    {/* Скелетон видеоплеера */}
                    <div
                        className="w-full h-[35svh] bg-gray-300 rounded-xl animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full"></div>
                    </div>

                    {/* Скелетон текстовой области */}
                    <UiTextArea className="mt-5" isLoading={true}/>
                </>
            )}

            {isAdmin && tutorialDetails  && (
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                    {/* Кнопка редактирования */}
                    <UiModal
                        button={
                            <Button
                                variant="secondary"
                                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                                aria-label="Редактировать изображение"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </Button>
                        }
                    >
                        {({close}) => (
                            <UpdateTutorialForm
                                closeModal={close}
                                tutorialId={tutorialDetails.id}
                            />
                        )}
                    </UiModal>
                </div>
            )}

            {/* Отображение туториала */}
            {tutorialDetails && (
                <>
                    {/* Плеер */}
                    {tutorialDetails.video && tutorialDetails.poster && (
                        <UiVideoPlayer
                            src={tutorialDetails.video}
                            poster={tutorialDetails.poster}
                            title={tutorialDetails.name}
                            className="h-[35svh]"
                        />
                    )}

                    {/* Кнопка скачивания файла */}
                    {tutorialDetails.tutorial_file && (
                        <button
                            onClick={() => handleFileDownload(tutorialDetails.tutorial_file!)}
                            className={clsx(
                                "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                "bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 hover:shadow-md",
                                "active:scale-[0.98]"
                            )}
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {/* Иконка документа */}
                                <div className="flex-shrink-0">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>

                                {/* Название файла */}
                                <div className="flex flex-col items-start min-w-0">
                                    <span className="text-sm text-gray-500 font-medium">
                                        Материалы к уроку
                                    </span>
                                    <span className="text-[16px] font-semibold text-gray-800 truncate w-full">
                                        {getFileNameFromUrl(tutorialDetails.tutorial_file)}
                                    </span>
                                </div>
                            </div>

                            {/* Иконка скачивания */}
                            <div className="flex-shrink-0">
                                <svg
                                    className="w-6 h-6 text-blue-600"
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
                        </button>
                    )}

                    {/* Текст урока */}
                    <UiTextArea
                        className="mt-5"
                        height={tutorialDetails.video ? "" : "h-[75svh]"}
                    >
                        {tutorialDetails.description}
                    </UiTextArea>

                    {/* Ссылка на возврат */}
                    <UiLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.back();
                        }}
                        className="mr-auto"
                    >
                        Назад
                    </UiLink>
                </>
            )}

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </div>
    );
}