"use client";

import { UiList } from "@/shared/ui/ui-list";
import { useAtlasList } from "../model/use-atlas-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import clsx from "clsx";
import { useTutorialsList } from "../model/use-tutorials-list";
import {UiError} from "@/shared/ui/ui-error";

export function AtlasList({ className }: { className?: string }) {
  const { items, isLoading, isError, handleClick } = useAtlasList();
  const { tutorials, isLoadingTutorials, isErrorTutorials, handleTutorialClick } = useTutorialsList();

  const isEmptyText = !isLoading && !isError && items.length === 0;
  const isEmptyTutorialText =
    !isLoadingTutorials && !isErrorTutorials && tutorials.length === 0;

  return (
    <UiList className={clsx(className, "mt-4 items-start")}>
      <div className="font-bold text-[18px]">Обучение</div>
      {isErrorTutorials && (
          <UiError>
              Не удалось загрузить список уроков
          </UiError>
      )}
      {isEmptyTutorialText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных уроков
        </div>
      )}
        {isLoadingTutorials && (
            <>
                {[...Array(2)].map((_, index) => (
                    <UiListButtonAtlas
                        key={`skeleton-tutorial-${index}`}
                        className="w-full"
                        index={index + 1}
                        informationOfPathology={{
                            id: 0,
                            name: "",
                        }}
                        onClick={() => {}}
                        isLoading={true}
                    />
                ))}
            </>
        )}
      {!isLoadingTutorials && tutorials &&
        tutorials.map((item, index) => (
          <UiListButtonAtlas
            className="w-full"
            key={item.id}
            index={index + 1}
            informationOfPathology={item}
            onClick={() => handleTutorialClick(item.id)}
          />
        ))}
      <div className="font-bold text-[18px]">Атлас</div>
      {isError && (
          <UiError>
              Не удалось загрузить список паталогий
          </UiError>
      )}
      {isEmptyText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных патологий
        </div>
      )}
        {isLoading && (
            <>
                {[...Array(3)].map((_, index) => (
                    <UiListButtonAtlas
                        key={`skeleton-atlas-${index}`}
                        className="w-full"
                        index={index + 1}
                        informationOfPathology={{
                            id: 0,
                            name: "",
                        }}
                        onClick={() => {}}
                        isLoading={true}
                    />
                ))}
            </>
        )}
      {!isLoading && items &&
        items.map((item, index) => (
          <UiListButtonAtlas
            className="w-full"
            key={item.id}
            index={index + 1}
            informationOfPathology={item}
            onClick={() => handleClick(item.id)}
          />
        ))}
    </UiList>
  );
}
