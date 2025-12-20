"use client";

import { UiList } from "@/shared/ui/ui-list";
import { useTryList } from "../model/use-try-list";
import { UiListButtonTry } from "@/shared/ui/ui-list-button-try";
import clsx from "clsx";

export function TryList({ className }: { className?: string }) {
  const { isLoading, items, isError, handleTryClick } = useTryList();

  const isEmptyText = !isLoading && !isError && items.length === 0;

  return (
    <UiList height="h-[47svh]" className={clsx(className, "mt-4")}>
      {isEmptyText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Пока не было начато ни одной попытки
        </div>
      )}
      {isError && (
        <div className="flex text-[18px] text-center text-red-600 pb-4 font-medium">
          Ошибка загрузки попыток с сервера. Попробуйте перезагрузить страницу.
        </div>
      )}
      {isLoading && (
          <>
            {[...Array(4)].map((_, index) => (
                <UiListButtonTry
                    key={`skeleton-${index}`}
                    informationOfTry={{
                      id: 0,
                      date: "",
                      mark: "",
                      time: "",
                    }}
                    handleClickAction={() => {}}
                    isLoading={true}
                />
            ))}
          </>
      )}
      {items && items.length > 0 &&
        items.map((item) => (
          <UiListButtonTry
            key={item.id}
            informationOfTry={item}
            handleClickAction={handleTryClick}
          />
        ))}
    </UiList>
  );
}
