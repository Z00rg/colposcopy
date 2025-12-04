import { UiList } from "@/shared/ui/ui-list";
import { useAtlasList } from "../model/use-atlas-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";

export function AtlasList({ className }: { className?: string }) {
  const { items, isLoading, isError, handleClick } = useAtlasList();

  const isEmptyText = !isLoading && !isError && items.length === 0;

  return (
    <UiList className={clsx(className, "mt-4 items-start max-h-[530px]")}>
      {isLoading && <UiSpinner />}
      {isError && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка патологий
        </div>
      )}
      {isEmptyText && (
          <div className="flex text-[18px] pb-4 font-medium">Нет доступных патологий</div>
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
