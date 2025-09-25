import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";

export function AtlasPage() {
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
            Содержание атласа
          </div>
          <UiList className="mt-4 items-start max-h-[530px]">
            {informationOfPathology.map((item, index) => (
              <UiListButtonAtlas
                className="w-full"
                key={item.id}
                index={index + 1}
                informationOfPathology={item}
              />
            ))}
          </UiList>
        </div>
        <UiFooter activeStatus="atlas" />
      </div>
    </div>
  );
}
