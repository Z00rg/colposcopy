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
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/shared/lib/use-modal";
import { UiImageModal } from "@/shared/ui/ui-image-modal";

export function Case({ className }: { className?: string }) {
  const {
    caseDetails,
    isLoading,
    isError,
    currentImageIndex,
    handleImageChange,
  } = useCase();

  const { isOpen, open, close } = useModal();

  const textAreaRef = useRef<HTMLDivElement>(null);

  // Скролл при смене задания
  useEffect(() => {
    textAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentImageIndex]);

  return (
    <>
      <div
        className={clsx(
          className,
          "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
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
                className="rounded-xl object-scale-down mt-3 w-full h-[40svh] cursor-zoom-in"
                onClick={open}
              />
            ) : (
              <UiTextArea className="mt-5" textAreaRef={textAreaRef}>
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
      <UiImageModal isOpen={isOpen} onClose={close}>
        {caseDetails && (
          <img
            src={caseDetails.imgSchema}
            alt={caseDetails.imgSchema}
            className="max-w-screen max-h-screen object-contain"
            loading="eager"
            draggable="false"
          />
        )}
      </UiImageModal>
    </>
  );
}
