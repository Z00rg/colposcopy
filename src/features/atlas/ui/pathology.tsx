"use client";

import {UiScrollImg} from "@/shared/ui/ui-scroll-img";
import {UiTextArea} from "@/shared/ui/ui-textarea";
import {UiFooter} from "@/shared/ui/ui-footer";
import clsx from "clsx";
import {usePathology} from "../model/use-pathology";
import {UiError} from "@/shared/ui/ui-error";
import {UiLink} from "@/shared/ui/ui-link";
import React, {useState} from "react";
import {PathologyImageForm, EditPathologyForm} from "@/features/admin";
import {Button} from "@/shared/ui/Button";
import {UiModal} from "@/shared/ui/UiModal";

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
                            isAdmin={isAdmin}
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
                            {isAdmin && !isEditText && <div className="flex gap-2 ml-auto max-w-[65vw]">

                                <UiModal className="mr-3" button={
                                    <Button variant="secondary" className="h-full">
                                        Добавить картинку
                                    </Button>}>

                                    {({close}) => (
                                        <PathologyImageForm
                                            pathologyOrImageId={pathologyDetails.id}
                                            closeModal={close}
                                            typeOfMethod="post"
                                        />
                                    )}

                                </UiModal>
                                <Button
                                    variant="secondary" className="h-full"
                                    onClick={() => setIsEditText(true)}
                                >
                                    Редактировать текст
                                </Button>
                            </div>}
                        </div>

                    </>
                )
            )}

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </div>
    );
}
