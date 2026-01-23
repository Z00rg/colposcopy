/* eslint-disable @next/next/no-img-element */
"use client";

import {UiScrollImg} from "@/shared/ui/ui-scroll-img";
import {UiTextArea} from "@/shared/ui/ui-textarea";
import {UiLink} from "@/shared/ui/ui-link";
import {UiFooter} from "@/shared/ui/ui-footer";
import clsx from "clsx";
import {useCase} from "../model/use-case";
import {useModal} from "@/shared/lib/use-modal";
import {UiImageModal} from "@/shared/ui/ui-image-modal";
import {UiError} from "@/shared/ui/ui-error";
import {UiModal} from "@/shared/ui/UiModal";
import {Button} from "@/shared/ui/Button";
import {EditCaseForm} from "@/features/admin";
import {transformCaseDataForEdit} from "@/shared/lib/transformCaseDataForEdit";

export type CaseProps = {
    className?: string;
    isAdmin?: boolean;
}

export function Case({className, isAdmin}: CaseProps) {
    const {
        caseDetails,
        isLoading,
        isError,
        currentImageIndex,
        handleImageChange,
        router,
    } = useCase();

    const {isOpen, open, close} = useModal();

    // Проверка на пустые данные
    const hasImages = caseDetails?.imgContainer && caseDetails.imgContainer.length > 0;
    const hasDescriptions = caseDetails?.descriptionContainer && caseDetails.descriptionContainer.length > 0;
    const hasSchema = caseDetails?.imgSchema;

    return (
        <>
            <div
                className={clsx(
                    className,
                    "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
                )}
            >
                {/* Кнопка редактирования для админа */}
                {isAdmin && caseDetails && (
                    <UiModal
                        button={
                            <Button className="mb-3">
                                Редактировать случай
                            </Button>
                        }
                    >
                        {({ close: closeEditModal }) => {
                            const { caseId, layers, scheme } = transformCaseDataForEdit(caseDetails);

                            return (
                                <EditCaseForm
                                    caseId={caseId}
                                    closeModal={closeEditModal}
                                    layers={layers}
                                    scheme={scheme}
                                />
                            );
                        }}
                    </UiModal>
                )}
                {/* Ошибка отображения клинического случая */}
                {isError && (
                    <UiError>
                        Не удалось загрузить детали клинического случая
                    </UiError>
                )}

                {/* Скелетон лоадер клинического случая + его отображение */}
                {isLoading ? (
                    <>
                        <UiScrollImg
                            img={[]}
                            onIndexChangeAction={handleImageChange}
                            isLoading={true}
                        />
                        <UiTextArea className="mt-5" isLoading={true}/>
                        <UiFooter activeStatus="clinic"/>
                    </>
                ) : (
                    caseDetails && (
                        <>
                            {/* Скролл картинок */}
                            {hasImages ? (
                                <UiScrollImg
                                    img={caseDetails.imgContainer}
                                    onIndexChangeAction={handleImageChange}
                                />
                            ) : isAdmin ? (
                                <div
                                    className="rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 h-[40svh] flex items-center justify-center">
                                    <p className="text-gray-500">Нет изображений слоев</p>
                                </div>
                            ) : null}

                            {/* Отображения текста описания + на последнем слое схема картинкой */}
                            {hasImages && currentImageIndex === 3 ? (
                                hasSchema ? (
                                    <img
                                        src={caseDetails.imgSchema.image}
                                        alt="Схематическое изображение"
                                        loading="lazy"
                                        fetchPriority="low"
                                        decoding="async"
                                        width={300}
                                        height={285}
                                        className="rounded-xl object-scale-down mt-3 w-full h-[40svh] cursor-zoom-in"
                                        onClick={open}
                                    />
                                ) : isAdmin ? (
                                    <div
                                        className="rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 h-[40svh] flex items-center justify-center mt-3">
                                        <p className="text-gray-500">Нет схемы</p>
                                    </div>
                                ) : null
                            ) : (
                                // Показываем описание слоя
                                hasDescriptions && caseDetails.descriptionContainer[currentImageIndex] ? (
                                    <UiTextArea className="mt-5" contentKey={currentImageIndex}>
                                        {caseDetails.descriptionContainer[currentImageIndex]}
                                    </UiTextArea>
                                ) : isAdmin ? (
                                    <UiTextArea className="mt-5" contentKey={currentImageIndex}>
                                        <p className="text-gray-500 italic">Описание для этого слоя отсутствует</p>
                                    </UiTextArea>
                                ) : null
                            )}

                            {/* Ссылка на выход назад */}
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
                    )
                )}
                <UiFooter activeStatus="clinic"/>
            </div>

            {/* Модалка для схемы */}
            <UiImageModal isOpen={isOpen} onClose={close}>
                {caseDetails && hasSchema && (
                    <img
                        src={caseDetails.imgSchema.image}
                        alt={"Модальное окно для картинки"}
                        className="max-w-full min-h-[65vh] max-h-[95svh] object-contain"
                        loading="eager"
                        draggable="false"
                    />
                )}
            </UiImageModal>
        </>
    );
}