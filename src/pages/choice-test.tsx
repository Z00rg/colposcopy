import { Instruction } from "@/features/test/ui/instruction";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonTest } from "@/shared/ui/ui-list-button-test";

export function ChoiceTestPage() {
  const informationOfPathology = [
    {
      id: 1,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 2,
      name: " Зона трансформации 2 типа",
    },
    {
      id: 1,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 2,
      name: " Зона трансформации 2 типа",
    },
    {
      id: 1,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 2,
      name: " Зона трансформации 2 типа",
    },
  ];

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
              />
            ))}
            <div className="flex w-full border border-b-1 border-[#BDBDBD]"></div>
            <Instruction />
          </UiList>
        </div>
        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}
