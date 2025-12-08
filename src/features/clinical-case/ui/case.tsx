/* eslint-disable @next/next/no-img-element */
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import Image from "next/image";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { useCase } from "../model/use-case";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { useState } from "react";

export function Case({ className }: { className?: string }) {
  const {
    caseDetails,
    isLoading,
    isError,
    currentImageIndex,
    handleImageChange,
  } = useCase();

  //Управление модалкой
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={clsx(
          className,
          "flex flex-col justify-center w-full gap-3 flex-1 mb-4 px-5 mt-5"
        )}
      >
        {isLoading && <UiSpinner />}
        {isError && (
          <div className="font-bold text-rose-500">
            Ошибка при загрузке деталей патологии
          </div>
        )}
        {caseDetails && (
          <>
            <UiScrollImg
              img={caseDetails.imgContainer}
              onIndexChange={handleImageChange}
            />
            {currentImageIndex === caseDetails.imgContainer.length - 1 ? (
              <Image
                src={caseDetails.imgSchema}
                alt="Схематическое изображение"
                width={300}
                height={285}
                className="rounded-xl object-scale-down mt-3 w-full h-[285px] cursor-zoom-in"
                onClick={() => openModal()}
              />
            ) : (
              <UiTextArea className="mt-5">
                {caseDetails.descriptionContainer[currentImageIndex]}
              </UiTextArea>
            )}
            <UiLink href={ROUTES.CLINIC} className="mr-auto">
              Назад
            </UiLink>
            <UiFooter activeStatus="clinic" />
          </>
        )}
      </div>

      {/* Модалка — универсальная для ЛЮБЫХ пропорций */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Крестик */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-light hover:text-gray-300 z-10"
              aria-label="Закрыть"
            >
              &times;
            </button>

            {/* Изображение — fill + object-contain */}
            <div className="relative w-full h-full">
              {/* Изображение — через <img> с object-contain (без next/image fill) */}
              <img
                src={img[modalImageIndex]}
                alt={`Fullscreen ${modalImageIndex + 1}`}
                className="max-w-screen max-h-screen object-contain"
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
