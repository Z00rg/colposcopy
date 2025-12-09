import { UiList } from "@/shared/ui/ui-list";
import { useAtlasList } from "../model/use-atlas-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";
import { useLessonsList } from "../model/use-lessons-list";

export function AtlasList({ className }: { className?: string }) {
  const { items, isLoading, isError, handleClick } = useAtlasList();
  const { lessons, isLoadingLessons, isErrorLessons, handleLessonClick } = useLessonsList();

  const isEmptyText = !isLoading && !isError && items.length === 0;

  return (
    <UiList className={clsx(className, "mt-4 items-start")}>
      <div className="font-bold text-[18px]">
        Обучение
      </div>
      {isLoadingLessons && <UiSpinner />}
      {isErrorLessons && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка уроков
        </div>
      )}
      {isEmptyText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных уроков
        </div>
      )}
      {lessons &&
        lessons.map((item, index) => (
          <UiListButtonAtlas
            className="w-full"
            key={item.id}
            index={index + 1}
            informationOfPathology={item}
            onClick={() => handleLessonClick(item.id)}
          />
        ))}
      <div className="font-bold text-[18px]">
        Атлас
      </div>
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
