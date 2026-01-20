"use client";

import {UiScrollImg} from "@/shared/ui/ui-scroll-img";
import {UiTextArea} from "@/shared/ui/ui-textarea";
import {UiFooter} from "@/shared/ui/ui-footer";
import clsx from "clsx";
import {usePathology} from "../model/use-pathology";
import {UiError} from "@/shared/ui/ui-error";
import {UiLink} from "@/shared/ui/ui-link";
import React, {useState} from "react";
import {EditPathologyForm} from "@/features/admin";

export interface PathologyProps {
    className?: string;
    isAdmin?: boolean;
}

export function Pathology({className, isAdmin}: PathologyProps) {
    const {
        pathologyDetails,
        isLoading,
        isError,
        handleImageChange,
        router
    } = usePathology();

    const [isEditText, setIsEditText] = useState(false);

    return (
        <div
            className={clsx(
                className,
                "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
            )}
        >

            {/* Ошибка загрузки патологии */}
            {isError && (
                <UiError>
                    Не удалось загрузить детали патологии
                </UiError>
            )}

            {/* Скелетон лоадер + отображение патологии */}
            {isLoading ? (
                <>
                    <UiScrollImg
                        img={[]}
                        onIndexChangeAction={handleImageChange}
                        isLoading={true}
                    />
                    <UiTextArea className="mt-5" isLoading={true}/>
                    <UiFooter activeStatus="atlas"/>
                </>
            ) : (
                pathologyDetails && (
                    <>
                        <UiScrollImg
                            img={pathologyDetails.imgContainer}
                            onIndexChangeAction={handleImageChange}
                        />

                        {!isEditText && <UiTextArea className="mt-5">
                            {pathologyDetails.description}
                        </UiTextArea>}

                        {isEditText && isAdmin && (<EditPathologyForm
                            className="mt-5"
                            pathologyId={pathologyDetails.id}
                            closeModal={() => setIsEditText(false)}
                        />)}

                        <div className="flex w-full">
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
                            {isAdmin && !isEditText &&  <button
                                className="flex w-max p-2.5 ml-auto gap-1 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                                aria-label="Редактировать текст"
                                onClick={() => setIsEditText(true)}
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
                                Редактировать текст
                            </button>}
                        </div>

                    </>
                )
            )}

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </div>
    );
}
