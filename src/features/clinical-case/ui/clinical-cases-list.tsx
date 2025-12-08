import { UiList } from "@/shared/ui/ui-list";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";
import { UiListButtonClinic } from "@/shared/ui/ui-list-button-clinic";
import { useClinicalCases } from "../model/use-clinical-cases";

export function ClinicalCasesList({ className }: { className?: string }) {
  const { items, isLoading, isError } = useClinicalCases();
  const isEmptyText = !isLoading && !isError && items.length === 0;

  return (
    <UiList className={clsx(className, "mt-4 items-start")}>
      {isLoading && <UiSpinner />}
      {isError && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка патологий
        </div>
      )}
      {isEmptyText && (
        <div className="flex text-[18px] pb-4 font-medium">
          Нет доступных клинических случаев
        </div>
      )}
      {items &&
        items.map((item, index) => (
          <UiListButtonClinic
            className="w-full"
            key={item.id}
            index={index + 1}
            informationOfPathology={item}
            cases={item.cases}
          />
        ))}
    </UiList>
  );
}
