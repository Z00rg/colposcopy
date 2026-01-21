/* eslint-disable @next/next/no-img-element */
"use client"

import clsx from "clsx";
import {useRef, useState, useEffect} from "react";
import {GetPathologyImgInfoDto} from "@/shared/api/atlasApi";
import {UiModal} from "@/shared/ui/UiModal";
import {PathologyImageForm} from "@/features/admin";
import {Button} from "@/shared/ui/Button";
import {useDeletePathologyImageMutationQuery} from "@/entities/admin";

type UiScrollImgProps = {
    img: string[] | GetPathologyImgInfoDto[];
    className?: string;
    onIndexChangeAction?: (index: number) => void;
    height?: string;
    isLoading?: boolean;
    isAdmin?: boolean;
};

export function UiScrollImg({
                                img,
                                className,
                                onIndexChangeAction,
                                height,
                                isLoading,
                                isAdmin,
                            }: UiScrollImgProps) {
    const heightProps = height ? height : "h-[35svh]";
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

    const deletePathologyImageQuery = useDeletePathologyImageMutationQuery();

    const handleDeleteImage = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить эту картинку?")) {
            deletePathologyImageQuery.mutate(id);
        }
    }

    // Обработка скролла с использованием Intersection Observer
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const items = container.querySelectorAll('[data-scroll-item]');

        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                        setCurrentScrollIndex(index); // Обновляем текущий индекс
                        onIndexChangeAction?.(index);
                    }
                });
            },
            {
                root: container,
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '0px',
            }
        );

        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, [img.length, onIndexChangeAction]);

    const openModal = (index: number) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isModalOpen]);

    if (isLoading) {
        return (
            <div
                className={clsx(
                    className,
                    "flex items-center justify-center mx-auto w-full bg-gray-300 rounded-xl animate-pulse",
                    heightProps
                )}
            >
                <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            {/* Скролл-контейнер */}
            {/* Обёртка для скролла и кнопки */}
            <div className={clsx(className, "relative", heightProps)}>
                {isAdmin && typeof img[modalImageIndex] === "object" && (
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                        {/* Кнопка редактирования */}
                        <UiModal
                            button={
                                <Button
                                    variant="secondary"
                                    className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                                    aria-label="Редактировать изображение"
                                    isDisabled
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
                                <PathologyImageForm
                                    pathologyOrImageId={(img[currentScrollIndex] as GetPathologyImgInfoDto).id}
                                    closeModal={close}
                                    typeOfMethod="patch"
                                />
                            )}
                        </UiModal>

                        {/* Кнопка удаления */}
                        <Button
                            variant="secondary"
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                            aria-label="Удалить изображение"
                            onPress={() => {
                                handleDeleteImage((img[currentScrollIndex] as GetPathologyImgInfoDto).id)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </Button>
                    </div>
                )}

                {/* Скролл-контейнер */}
                <div
                    ref={scrollContainerRef}
                    className={clsx(
                        "flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden",
                        "scrollbar-hide scroll-smooth",
                        "mx-auto w-full h-full"
                    )}
                >
                    {img.map((src, index) => (
                        <div
                            key={"img-" + index}
                            data-scroll-item
                            data-index={index}
                            className={clsx(
                                "shrink-0 items-center snap-center cursor-zoom-in w-full",
                                heightProps
                            )}
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={typeof src === "string" ? src : src.image}
                                alt={`Image ${index + 1}`}
                                width={375}
                                height={200}
                                className={clsx("object-scale-down w-full h-full")}
                                loading="lazy"
                                fetchPriority="low"
                                decoding="async"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Модалка */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/90"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white text-3xl font-light hover:text-gray-300 z-10"
                            aria-label="Закрыть"
                        >
                            &times;
                        </button>

                        <div className="relative w-full h-full">
                            <img
                                src={typeof img[modalImageIndex] === "string" ? img[modalImageIndex] : img[modalImageIndex].image}
                                alt={`Fullscreen ${modalImageIndex + 1}`}
                                className="max-w-full min-h-[65vh] max-h-[95svh] object-contain"
                                loading="eager"
                                draggable="false"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}