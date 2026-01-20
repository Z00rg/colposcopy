/* eslint-disable @next/next/no-img-element */
"use client"

import clsx from "clsx";
import {useRef, useState, useEffect} from "react";
import {GetPathologyImgInfoDto} from "@/shared/api/atlasApi";

type UiScrollImgProps = {
    img: string[] | GetPathologyImgInfoDto[];
    className?: string;
    onIndexChangeAction?: (index: number) => void;
    height?: string;
    isLoading?: boolean;
    isAdmin?: boolean;
    onAddImage?: () => void;
};

export function UiScrollImg({
                                img,
                                className,
                                onIndexChangeAction,
                                height,
                                isLoading,
                                isAdmin = false,
                                onAddImage,
                            }: UiScrollImgProps) {
    const heightProps = height ? height : "h-[35svh]";
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);

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
            <div
                ref={scrollContainerRef}
                className={clsx(
                    className,
                    "flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden",
                    "scrollbar-hide scroll-smooth",
                    "mx-auto w-full",
                    heightProps
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

                {/* Карточка добавления изображения для админа */}
                {isAdmin && onAddImage && (
                    <div
                        data-scroll-item
                        data-index={img.length}
                        className={clsx(
                            "shrink-0 flex items-center justify-center snap-center cursor-pointer w-full",
                            "bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl",
                            "hover:bg-gray-200 hover:border-gray-400 transition-colors",
                            heightProps
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddImage();
                        }}
                    >
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span className="text-sm font-medium">Добавить изображение</span>
                        </div>
                    </div>
                )}
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
                                className="max-w-full max-h-[95svh] object-contain"
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