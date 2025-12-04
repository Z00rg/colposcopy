import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonTest } from "@/shared/ui/ui-list-button-test";
import { Instruction } from "./instruction";
import clsx from "clsx";
import { useTestList } from "../model/use-test-list";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function TestList() {
  const {
    items,
    isLoading,
    isError,
    selectedIds,
    handleTogglePathology,
    handleStartAttempt,
  } = useTestList();

  const isEmptyText = !isLoading && !isError && items.length === 0;

  return (
    <UiList className="mt-4 items-start max-h-[530px]">
      <div className="font-bold text-[18px] text-[#4B4242]">
        Выберите параметры
      </div>
      {isLoading && <UiSpinner />}
      {isError && (
        <div className="font-bold text-rose-500">
          Ошибка при загрузке списка патологий
        </div>
      )}
      {isEmptyText && (
          <div className="flex text-[18px] pb-4 font-medium">Нет доступных тем для тестирования</div>
        )}
      {items &&
        items.map((item, index) => (
          <UiListButtonTest
            className="w-full"
            key={item.id}
            index={index + 1}
            informationOfPathology={item}
            isChecked={selectedIds.includes(item.id)}
            onToggle={handleTogglePathology}
          />
        ))}
      <div className="flex w-full border border-b-1 border-[#BDBDBD]"></div>
      <Instruction />
      <button
        onClick={handleStartAttempt}
        disabled={selectedIds.length === 0}
        className={clsx(
          "ml-auto text-[20px] mb-3 font-normal transition-colors",
          selectedIds.length === 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-[#2E76AA] hover:text-[#26628A] cursor-pointer"
        )}
      >
        Начать попытку
      </button>
    </UiList>
  );
}
