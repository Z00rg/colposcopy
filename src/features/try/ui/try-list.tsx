import { UiList } from "@/shared/ui/ui-list";
import { useTryList } from "../model/use-try-list";
import { UiListButtonTry } from "@/shared/ui/ui-list-button-try";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";

export function TryList({ className }: { className?: string }) {
  const { isLoading, items, isError, handleTryClick } = useTryList();

  const isLoader = isLoading;
  const isEmptyText = !isLoading && !isError && items.length === 0;
  const isErrorText = isError;
  const isItems = items.length > 0;

  return (
      <UiList className={clsx(className, "mt-4")}>
        {isLoader && <UiSpinner />}
        {isEmptyText && (
          <div className="flex text-[18px] pb-4 font-medium">Пока не было начато ни одной попытки</div>
        )}
        {isErrorText && (
          <div className="flex text-[18px] text-center text-red-600 pb-4 font-medium">
            Ошибка загрузки попыток с сервера. Попробуйте перезагрузить страницу.
          </div>
        )}
        {isItems &&
          items.map((item) => (
            <UiListButtonTry key={item.id} informationOfTry={item} handleClick={handleTryClick}/>
          ))}
      </UiList>
  );
}
