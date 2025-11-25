import clsx from "clsx";
import router from "next/router";
import { useState } from "react";

type PathologyInformation = {
  id: number;
  name: string;
};

export type UiListButtonClinicProps = {
  className?: string;
  index: number;
  informationOfPathology: PathologyInformation;
  cases: { id: number }[];
};

export function UiListButtonClinic({
  className,
  index,
  informationOfPathology,
  cases,
}: UiListButtonClinicProps) {
  const [active, setActive] = useState(false);

  const handleCaseClick = (id: number) => {
    router.push(`/case/${id}`);
  };

  return (
    <div
      className={clsx(
        className,
        "flex w-full flex-col select-none border-b border-[#E0E0E0] rounded-xl px-3 py-3 transition-all duration-200 ease-out",
          "hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01] cursor-pointer"
       
      )}
    >
      {/* Верхняя строка */}
      <div
        className={clsx(
          "flex items-center text-[18px] font-medium gap-3",
          "px-3 py-3 rounded-xl"
        )}
        onClick={() => setActive(!active)}
      >
        <div className="text-gray-700 font-semibold">{index}.</div>

        <div className="break-words whitespace-normal flex-1 text-gray-800">
          {informationOfPathology.name}
        </div>
        <ArrowRight
                  className={clsx(
                    "transition-transform duration-300 ease-in-out w-[11px] h-[18px]",
                    active && "rotate-90"
                  )}
                />
      </div>

      {/* Раскрывающаяся часть */}
      <div
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden mt-2",
          active ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-2 pl-11 pr-2 pb-2">
          {cases.map((caseItem, idx) => (
            <div
              key={caseItem.id}
              className="text-gray-700 text-[15px] font-medium"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              Случай {idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="9"
    height="16"
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 8V9H8V8V7H6V8Z"
      fill="black"
    />
  </svg>
);
