import { useRouter } from 'next/router';
import { UiList } from "@/shared/ui/ui-list";
import { useAtlasList } from "../model/use-atlas-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";

export function AtlasList({ className }: { className?: string }) {
  const { items, isLoading, isError, handleClick } = useAtlasList();

  const testItems = [
    {
      id: 1,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 2,
      name: " Зона трансформации 2 типа",
    },
    {
      id: 3,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 4,
      name: " Зона трансформации 2 типа",
    },
    {
      id: 5,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 6,
      name: " Зона трансформации 2 типа",
    },
    {
      id: 7,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
    },
    {
      id: 8,
      name: " Зона трансформации 2 типа",
    },
  ];

  return (
    // <UiList className={clsx(className, "mt-4 items-start max-h-[530px]")}>
    //   {isLoading && <UiSpinner />}
    //   {isError && (
    //     <div className="font-bold text-rose-500">
    //       Ошибка при загрузке списка патологий
    //     </div>
    //   )}
    //   {items &&
    //     items.map((item, index) => (
    //       <UiListButtonAtlas
    //         className="w-full"
    //         key={item.id}
    //         index={index + 1}
    //         informationOfPathology={item}
    //         onClick={() => handleClick(item.id)}
    //       />
    //     ))}
    // </UiList>
    <UiList className="mt-4 items-start max-h-[530px]">
      {testItems.map((item, index) => (
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
