import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import Image from "next/image";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { useCase } from "../model/use-case";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function Case({ className }: { className?: string }) {
  const {
    caseDetails,
    isLoading,
    isError,
    currentImageIndex,
    handleImageChange,
  } = useCase();

  return (
    <div
      className={clsx(
        className,
        "flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5"
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
              width={385}
              height={285}
              className="rounded-xl object-contain mt-5"
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
  );
}
