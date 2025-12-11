import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { useTutorial } from "../model/use-tutorial";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiVideoPlayer } from "@/shared/ui/ui-video-player";

export function Tutorial({ className }: { className?: string }) {
  const { tutorialDetails, isLoading, isError } = useTutorial();

  return (
    <div
      className={clsx(
        className,
        "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
      )}
    >
      {isLoading && <UiSpinner className="mx-auto" />}
      {isError && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке деталей патологии
        </div>
      )}
      {tutorialDetails && (
        <>
          {tutorialDetails.video && tutorialDetails.poster && (
            <UiVideoPlayer
              src={tutorialDetails.video}
              poster={tutorialDetails.poster}
              title={tutorialDetails.name}
              className="h-[35svh]"
            />
          )}
          <UiTextArea
            className="mt-5"
            height={tutorialDetails.video ? "" : "h-[75svh]"}
          >
            {tutorialDetails.description}
          </UiTextArea>
          <UiLink href={ROUTES.ATLAS} className="mr-auto">
            Назад
          </UiLink>
          <UiFooter activeStatus="atlas" />
        </>
      )}
    </div>
  );
}
