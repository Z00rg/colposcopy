import { useRouter } from 'next/router';
import { UiList } from "@/shared/ui/ui-list";
// import { useAtlasList } from "../model/use-atlas-list";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import clsx from "clsx";
import { UiListButtonClinic } from '@/shared/ui/ui-list-button-clinic';

export function ClinicalCasesList({ className }: { className?: string }) {
  // const { items, isLoading, isError, handleClick } = useAtlasList();
  

  const testItems = [
    {
      id: 1,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
      cases: [
        { id: 1},
        { id: 2},
        { id: 3},
      ]
    },
    {
      id: 2,
      name: " Зона трансформации 2 типа",
      cases: [
        { id: 4},
        { id: 5},
        { id: 6},
      ]
    },
    {
      id: 3,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
      cases: [
        { id: 7},
        { id: 8},
        { id: 9},
      ]
    },
    {
      id: 4,
      name: " Зона трансформации 2 типа",
      cases: [
        { id: 10},
        { id: 11},
        { id: 12},
      ]
    },
    {
      id: 5,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
      cases: [
        { id: 13},
        { id: 14},
        { id: 15},
      ]
    },
    {
      id: 6,
      name: " Зона трансформации 2 типа",
      cases: [
        { id: 16},
        { id: 17},
        { id: 18},
      ]
    },
    {
      id: 7,
      name: "Зона трансформации 1 типаЗона трансформации 1 типаЗона трансформации 1 типа",
      cases: [
        { id: 19},
        { id: 20},
        { id: 21},
      ]
    },
    {
      id: 8,
      name: " Зона трансформации 2 типа",
      cases: [
        { id: 22},
        { id: 23},
      ]
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
