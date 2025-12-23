"use client";

import {UiScrollImg} from "@/shared/ui/ui-scroll-img";
import {UiTextArea} from "@/shared/ui/ui-textarea";
import {UiLink} from "@/shared/ui/ui-link";
import {UiFooter} from "@/shared/ui/ui-footer";
import {ROUTES} from "@/shared/constants/routes";
import clsx from "clsx";
import {usePathology} from "../model/use-pathology";
import {UiError} from "@/shared/ui/ui-error";

export function Pathology({className}: { className?: string }) {
    const {
        pathologyDetails,
        isLoading,
        isError,
        handleImageChange,
    } = usePathology();

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
                        <UiTextArea className="mt-5">
                            {pathologyDetails.description}
                        </UiTextArea>
                        <UiLink href={ROUTES.ATLAS} className="mr-auto">
                            Назад
                        </UiLink>
                    </>
                )
            )}

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </div>
    );
}
