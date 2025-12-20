"use client";

import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { useTutorial } from "../model/use-tutorial";
import { UiVideoPlayer } from "@/shared/ui/ui-video-player";
import {UiError} from "@/shared/ui/ui-error";

export function Tutorial({ className }: { className?: string }) {
  const { tutorialDetails, isLoading, isError } = useTutorial();

  return (
    <div
      className={clsx(
        className,
        "flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5"
      )}
    >
      {isError && (
          <UiError>
            Не удалось загрузить детали урока
          </UiError>
      )}
      {isLoading && (
              <>
                {/* Скелетон видеоплеера */}
                <div className="w-full h-[35svh] bg-gray-300 rounded-xl animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full"></div>
                </div>

                {/* Скелетон текстовой области */}
                <UiTextArea className="mt-5" isLoading={true} />
              </>
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
        </>
      )}
      <UiFooter activeStatus="atlas" />
    </div>
  );
}
