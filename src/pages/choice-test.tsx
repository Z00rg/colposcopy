import { Instruction } from "@/features/test/ui/instruction";
import { ROUTES } from "@/shared/constants/routes";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonTest } from "@/shared/ui/ui-list-button-test";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";

export function ChoiceTestPage() {
  const router = useRouter();

  // Состояние для хранения ID
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const informationOfPathology = [
    { id: 1, name: "Зона трансформации 1 типа A" },
    { id: 2, name: "Зона трансформации 2 типа B" },
    { id: 3, name: "Зона трансформации 1 типа C" },
    { id: 4, name: "Зона трансформации 2 типа D" },
    { id: 5, name: "Зона трансформации 1 типа E" },
    { id: 6, name: "Зона трансформации 2 типа F" },
  ];

  // Функция для переключения выбора патологии
  const handleTogglePathology = (id: number) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        // Удалить ID
        return prevIds.filter((selectedId) => selectedId !== id);
      } else {
        // Добавить ID
        return [...prevIds, id];
      }
    });
  };

  // Обработчик начала попытки
  const handleStartAttempt = () => {
    if (selectedIds.length === 0) {
      alert("Пожалуйста, выберите хотя бы одну патологию для теста.");
      return;
    }

    // Преобразуем массив в строку
    const idsString = selectedIds.join(",");

    // Навигация с параметром запроса (Query Parameter)
    router.push({
      pathname: ROUTES.PASSING,
      query: { testIds: idsString },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-16" />
      <div className="flex flex-col justify-between items-center gap-5 flex-1 mb-4">
        <div className="px-5">
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Настройки тестирования
          </div>
          <UiList className="mt-4 items-start max-h-[530px]">
            <div className="font-bold text-[18px] text-[#4B4242]">
              Выберите параметры
            </div>
            {informationOfPathology.map((item, index) => (
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
        </div>
        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}
