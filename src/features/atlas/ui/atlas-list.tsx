"use client";

import { UiList } from "@/shared/ui/ui-list";
import { useAtlasList } from "../model/use-atlas-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";
import { useTutorialsList } from "../model/use-tutorials-list";

export function AtlasList({ className }: { className?: string }) {
  const { items, isLoading, isError, handleClick } = useAtlasList();
  const { tutorials, isLoadingTutorials, isErrorTutorials, handleTutorialClick } = useTutorialsList();

  const isEmptyText = !isLoading && !isError && items.length === 0;
  const isEmptyTutorialText =
    !isLoadingTutorials && !isErrorTutorials && tutorials.length === 0;

  return (
    <UiList className={clsx(className, "mt-4 items-start")}>
      <div className="font-bold text-[18px]">Обучение</div>
      {isLoadingTutorials && <UiSpinner />}
      {isErrorTutorials && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка уроков
        </div>
      )}
      {isEmptyTutorialText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных уроков
        </div>
      )}
      {tutorials &&
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
      {isLoading && <UiSpinner />}
      {isError && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка патологий
        </div>
      )}
      {isEmptyText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных патологий
        </div>
      )}
      {items &&
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
